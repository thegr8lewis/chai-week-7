"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Calendar, Clock, UserPlus, CheckCircle2, Users, X } from "lucide-react"

const initialFullScheduleData = [
  {
    day: "Monday",
    date: "Jan 20",
    shifts: [
      { time: "Morning (6AM-2PM)", caregiver: "Amara Okafor", role: "Registered Nurse", trustScore: 98 },
      { time: "Afternoon (2PM-10PM)", caregiver: "Kwame Mensah", role: "Care Assistant", trustScore: 95 },
      { time: "Evening (10PM-6AM)", caregiver: "Zainab Ibrahim", role: "Night Nurse", trustScore: 97 },
    ],
  },
  {
    day: "Tuesday",
    date: "Jan 21",
    shifts: [
      { time: "Morning (6AM-2PM)", caregiver: "Amara Okafor", role: "Registered Nurse", trustScore: 98 },
      { time: "Afternoon (2PM-10PM)", caregiver: null, role: null, trustScore: null },
      { time: "Evening (10PM-6AM)", caregiver: "Zainab Ibrahim", role: "Night Nurse", trustScore: 97 },
    ],
  },
  {
    day: "Wednesday",
    date: "Jan 22",
    shifts: [
      { time: "Morning (6AM-2PM)", caregiver: "Kwame Mensah", role: "Care Assistant", trustScore: 95 },
      { time: "Afternoon (2PM-10PM)", caregiver: "Amara Okafor", role: "Registered Nurse", trustScore: 98 },
      { time: "Evening (10PM-6AM)", caregiver: "Zainab Ibrahim", role: "Night Nurse", trustScore: 97 },
    ],
  },
  {
    day: "Thursday",
    date: "Jan 23",
    shifts: [
      { time: "Morning (6AM-2PM)", caregiver: null, role: null, trustScore: null },
      { time: "Afternoon (2PM-10PM)", caregiver: "Kwame Mensah", role: "Care Assistant", trustScore: 95 },
      { time: "Evening (10PM-6AM)", caregiver: "Zainab Ibrahim", role: "Night Nurse", trustScore: 97 },
    ],
  },
  {
    day: "Friday",
    date: "Jan 24",
    shifts: [
      { time: "Morning (6AM-2PM)", caregiver: "Amara Okafor", role: "Registered Nurse", trustScore: 98 },
      { time: "Afternoon (2PM-10PM)", caregiver: "Kwame Mensah", role: "Care Assistant", trustScore: 95 },
      { time: "Evening (10PM-6AM)", caregiver: null, role: null, trustScore: null },
    ],
  },
  {
    day: "Saturday",
    date: "Jan 25",
    shifts: [
      { time: "Morning (6AM-2PM)", caregiver: "Zainab Ibrahim", role: "Night Nurse", trustScore: 97 },
      { time: "Afternoon (2PM-10PM)", caregiver: null, role: null, trustScore: null },
      { time: "Evening (10PM-6AM)", caregiver: null, role: null, trustScore: null },
    ],
  },
  {
    day: "Sunday",
    date: "Jan 26",
    shifts: [
      { time: "Morning (6AM-2PM)", caregiver: null, role: null, trustScore: null },
      { time: "Afternoon (2PM-10PM)", caregiver: null, role: null, trustScore: null },
      { time: "Evening (10PM-6AM)", caregiver: null, role: null, trustScore: null },
    ],
  },
]

const initialConflicts = [
  {
    id: 1,
    type: "Schedule Overlap",
    message: "Amara Okafor has a conflicting appointment on Tuesday afternoon",
    severity: "warning",
  },
  {
    id: 2,
    type: "Shift Gap",
    message: "No coverage scheduled for Sunday - consider backup caregiver",
    severity: "alert",
  },
]

export function ClientView() {
  const [scheduleData, setScheduleData] = useState(initialFullScheduleData)
  const [conflicts, setConflicts] = useState(initialConflicts)
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; slot: string; available: boolean } | null>(null)
  const [showFullSchedule, setShowFullSchedule] = useState(false)
  const [assigningShift, setAssigningShift] = useState<{ day: string; shiftIndex: number } | null>(null)

  const availability = scheduleData.map((day) => ({
    day: day.day,
    slots: day.shifts
      .filter((shift) => shift.caregiver !== null)
      .map((shift) => {
        if (shift.time.includes("Morning")) return "Morning"
        if (shift.time.includes("Afternoon")) return "Afternoon"
        return "Evening"
      }),
  }))

  const handleResolveConflict = (conflictId: number) => {
    setConflicts((prev) => prev.filter((c) => c.id !== conflictId))
  }

  const handleAssignCaregiver = (day: string, shiftIndex: number) => {
    setScheduleData((prev) =>
      prev.map((d) =>
        d.day === day
          ? {
              ...d,
              shifts: d.shifts.map((shift, idx) =>
                idx === shiftIndex
                  ? {
                      ...shift,
                      caregiver: "Sarah Adeyemi",
                      role: "Care Assistant",
                      trustScore: 93,
                    }
                  : shift,
              ),
            }
          : d,
      ),
    )
    setAssigningShift(null)
  }

  const handleSlotClick = (day: string, slot: string, available: boolean) => {
    setSelectedSlot({ day, slot, available })
  }

  const totalSlots = scheduleData.reduce((acc, day) => acc + day.shifts.length, 0)
  const coveredSlots = scheduleData.reduce(
    (acc, day) => acc + day.shifts.filter((shift) => shift.caregiver !== null).length,
    0,
  )
  const uniqueCaregivers = new Set(
    scheduleData.flatMap((day) => day.shifts.filter((shift) => shift.caregiver).map((shift) => shift.caregiver)),
  ).size

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Real-Time Availability</h3>
          <p className="text-muted-foreground">Monitor caregiver schedules and conflicts</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
          <Clock className="w-4 h-4 mr-2" />
          Live Updates
        </Badge>
      </div>

      {conflicts.length > 0 && (
        <div className="space-y-3">
          {conflicts.map((conflict, index) => (
            <Alert
              key={conflict.id}
              className={`border-2 animate-in fade-in slide-in-from-top ${
                conflict.severity === "alert" ? "border-secondary/50 bg-secondary/5" : "border-primary/30 bg-primary/5"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AlertTriangle className={conflict.severity === "alert" ? "text-secondary" : "text-primary"} />
              <AlertDescription className="flex items-center justify-between">
                <span>
                  <span className="font-semibold">{conflict.type}:</span> {conflict.message}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-4 border-primary/30 hover:bg-primary/10 bg-transparent"
                  onClick={() => handleResolveConflict(conflict.id)}
                >
                  Resolve
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {conflicts.length === 0 && (
        <Alert className="border-2 border-primary/50 bg-primary/5 animate-in fade-in">
          <CheckCircle2 className="text-primary" />
          <AlertDescription>
            <span className="font-semibold text-primary">All Clear!</span> No scheduling conflicts detected.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Weekly Availability Grid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availability.map((day, index) => (
              <div
                key={day.day}
                className="animate-in fade-in slide-in-from-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-28 font-semibold text-foreground">{day.day}</div>
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    {(["Morning", "Afternoon", "Evening"] as const).map((slot) => {
                      const isAvailable = day.slots.includes(slot)
                      return (
                        <button
                          key={slot}
                          onClick={() => handleSlotClick(day.day, slot, isAvailable)}
                          className={`p-3 rounded-lg text-center text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
                            isAvailable
                              ? "bg-primary text-primary-foreground shadow-sm hover:shadow-md"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          className="h-auto py-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
          onClick={() => {
            alert("Staff request sent to AI matching system. New candidates will appear shortly.")
          }}
        >
          <UserPlus className="w-5 h-5" />
          <span>Request Additional Staff</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex items-center justify-center gap-2 border-primary/30 hover:bg-primary/10 bg-transparent"
          onClick={() => setShowFullSchedule(true)}
        >
          <Calendar className="w-5 h-5" />
          <span>View Full Schedule</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {coveredSlots}/{totalSlots}
              </div>
              <div className="text-sm text-muted-foreground">Slots Covered</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{conflicts.length}</div>
              <div className="text-sm text-muted-foreground">Active Conflicts</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{uniqueCaregivers}</div>
              <div className="text-sm text-muted-foreground">Caregivers Assigned</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showFullSchedule} onOpenChange={setShowFullSchedule}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="w-6 h-6 text-primary" />
                Full Weekly Schedule
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFullSchedule(false)}
                className="hover:bg-primary/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <DialogDescription>Complete caregiver assignments with shift details and coverage status</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {scheduleData.map((daySchedule, index) => (
              <Card
                key={daySchedule.day}
                className="border-2 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {daySchedule.day}
                      <span className="text-sm font-normal text-muted-foreground ml-2">{daySchedule.date}</span>
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        daySchedule.shifts.filter((s) => s.caregiver).length === 3
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-secondary/10 text-secondary border-secondary/20"
                      }
                    >
                      {daySchedule.shifts.filter((s) => s.caregiver).length}/3 Covered
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {daySchedule.shifts.map((shift, shiftIndex) => (
                      <div
                        key={shiftIndex}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          shift.caregiver
                            ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                            : "bg-secondary/5 border-secondary/20 hover:bg-secondary/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="font-semibold text-sm">{shift.time}</span>
                            </div>
                            {shift.caregiver ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-primary" />
                                  <span className="text-foreground font-medium">{shift.caregiver}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground ml-6">
                                  <span>{shift.role}</span>
                                  <span>•</span>
                                  <span className="text-primary font-semibold">Trust Score: {shift.trustScore}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 ml-6">
                                <AlertTriangle className="w-4 h-4 text-secondary" />
                                <span className="text-secondary font-medium text-sm">No Coverage Assigned</span>
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant={shift.caregiver ? "outline" : "default"}
                            className={
                              shift.caregiver
                                ? "border-primary/30 hover:bg-primary/10 bg-transparent"
                                : "bg-primary hover:bg-primary/90"
                            }
                            onClick={() => {
                              if (!shift.caregiver) {
                                handleAssignCaregiver(daySchedule.day, shiftIndex)
                              }
                            }}
                          >
                            {shift.caregiver ? "Assigned" : "Assign"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">AI-Powered Scheduling</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Our intelligent system automatically matches caregivers based on skills, location, availability, and
                  client preferences to ensure optimal care coverage.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              {selectedSlot?.day} {selectedSlot?.slot}
            </DialogTitle>
            <DialogDescription>
              {selectedSlot?.available ? "This slot has coverage assigned" : "This slot needs coverage"}
            </DialogDescription>
          </DialogHeader>
          {selectedSlot && (
            <div className="space-y-4">
              {selectedSlot.available ? (
                <>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Assigned Caregiver</span>
                    </div>
                    <p className="text-sm text-foreground">Amara Okafor - Registered Nurse</p>
                    <p className="text-xs text-muted-foreground mt-1">Trust Score: 98 | 8 years experience</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 hover:bg-primary/10 bg-transparent"
                    onClick={() => setSelectedSlot(null)}
                  >
                    Close
                  </Button>
                </>
              ) : (
                <>
                  <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                    <p className="text-sm text-foreground">No caregiver assigned to this slot</p>
                    <p className="text-xs text-muted-foreground mt-1">Open the full schedule to assign caregivers</p>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      setSelectedSlot(null)
                      setShowFullSchedule(true)
                    }}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Open Full Schedule
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
