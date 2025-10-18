"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Users,
  Star,
  MapPin,
  Award,
  Zap,
  MessageSquare,
  Video,
  Brain,
  AlertCircle,
  CheckCircle,
  FileText,
  Heart,
  Activity,
} from "lucide-react"

const matchedCaregivers = [
  {
    id: 1,
    name: "Amara Okafor",
    role: "Registered Nurse",
    location: "Lagos, Nigeria",
    trustScore: 98,
    matchScore: 95,
    skills: ["Pediatric Care", "Emergency Response", "Patient Education"],
    avatar: "/african-woman-nurse.jpg",
    experience: "8 years",
    availability: "Immediate",
    status: "matched",
  },
  {
    id: 2,
    name: "Kwame Mensah",
    role: "Physical Therapist",
    location: "Accra, Ghana",
    trustScore: 96,
    matchScore: 92,
    skills: ["Rehabilitation", "Sports Therapy", "Geriatric Care"],
    avatar: "/african-man-therapist.jpg",
    experience: "6 years",
    availability: "2 weeks notice",
    status: "matched",
  },
  {
    id: 3,
    name: "Zainab Hassan",
    role: "Home Health Aide",
    location: "Nairobi, Kenya",
    trustScore: 94,
    matchScore: 89,
    skills: ["Personal Care", "Medication Management", "Companionship"],
    avatar: "/african-woman-caregiver.jpg",
    experience: "5 years",
    availability: "Immediate",
    status: "matched",
  },
]

const schedules = [
  {
    id: 1,
    caregiver: "Amara Okafor",
    date: "Monday, Jan 20",
    time: "6:00 AM - 2:00 PM",
    type: "Morning Shift",
    status: "confirmed",
  },
  {
    id: 2,
    caregiver: "Kwame Mensah",
    date: "Tuesday, Jan 21",
    time: "2:00 PM - 10:00 PM",
    type: "Afternoon Shift",
    status: "confirmed",
  },
  {
    id: 3,
    caregiver: "Zainab Hassan",
    date: "Wednesday, Jan 22",
    time: "10:00 PM - 6:00 AM",
    type: "Night Shift",
    status: "pending",
  },
]

const matchingAnalysis = [
  {
    id: 1,
    caregiver: "Amara Okafor",
    matchScore: 95,
    trustScore: 98,
    compatibilityFactors: [
      { factor: "Skills Match", score: 98, weight: "High" },
      { factor: "Experience Level", score: 96, weight: "High" },
      { factor: "Location Proximity", score: 92, weight: "Medium" },
      { factor: "Availability", score: 100, weight: "High" },
      { factor: "Communication Style", score: 94, weight: "Medium" },
      { factor: "Care Philosophy", score: 93, weight: "High" },
    ],
    aiInsights:
      "Excellent match based on your care requirements. Amara has extensive pediatric care experience and immediate availability. Her communication style aligns well with your preferences.",
    riskFactors: [],
    recommendedAction: "Highly Recommended",
  },
  {
    id: 2,
    caregiver: "Kwame Mensah",
    matchScore: 92,
    trustScore: 96,
    compatibilityFactors: [
      { factor: "Skills Match", score: 94, weight: "High" },
      { factor: "Experience Level", score: 92, weight: "High" },
      { factor: "Location Proximity", score: 85, weight: "Medium" },
      { factor: "Availability", score: 88, weight: "High" },
      { factor: "Communication Style", score: 91, weight: "Medium" },
      { factor: "Care Philosophy", score: 90, weight: "High" },
    ],
    aiInsights:
      "Strong match for rehabilitation and geriatric care needs. Kwame requires 2 weeks notice but has proven expertise in your care type.",
    riskFactors: ["Availability requires advance notice"],
    recommendedAction: "Recommended",
  },
  {
    id: 3,
    caregiver: "Zainab Hassan",
    matchScore: 89,
    trustScore: 94,
    compatibilityFactors: [
      { factor: "Skills Match", score: 88, weight: "High" },
      { factor: "Experience Level", score: 90, weight: "High" },
      { factor: "Location Proximity", score: 87, weight: "Medium" },
      { factor: "Availability", score: 100, weight: "High" },
      { factor: "Communication Style", score: 89, weight: "Medium" },
      { factor: "Care Philosophy", score: 85, weight: "High" },
    ],
    aiInsights:
      "Good match for personal care and companionship. Zainab has immediate availability and strong patient feedback.",
    riskFactors: [],
    recommendedAction: "Recommended",
  },
]

export default function ClientDashboard() {
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof matchedCaregivers)[0] | null>(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<(typeof schedules)[0] | null>(null)
  const [selectedMatching, setSelectedMatching] = useState<(typeof matchingAnalysis)[0] | null>(null)
  const [acceptedCaregivers, setAcceptedCaregivers] = useState<number[]>([])
  const [requestFormData, setRequestFormData] = useState({
    careType: "",
    duration: "",
    startDate: "",
    shiftPreference: "",
    location: "",
    specialRequirements: "",
    budget: "",
    languagePreference: "",
  })

  const handleAcceptCaregiver = (caregiverId: number) => {
    if (!acceptedCaregivers.includes(caregiverId)) {
      setAcceptedCaregivers([...acceptedCaregivers, caregiverId])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your caregivers, schedule, and preferences</p>
        </div>

        {/* Key Metrics */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{matchedCaregivers.length}</div>
                <div className="text-sm text-muted-foreground">Matched Caregivers</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{schedules.length}</div>
                <div className="text-sm text-muted-foreground">Scheduled Shifts</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Avg Match Score</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">96</div>
                <div className="text-sm text-muted-foreground">Avg Trust Score</div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Tabs */}
        <Tabs defaultValue="caregivers" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger 
              value="caregivers" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Caregivers
            </TabsTrigger>
            <TabsTrigger 
              value="matching" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              AI Matching
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Preferences
            </TabsTrigger>
            
          </TabsList>

          {/* Caregivers Tab */}
          <TabsContent value="caregivers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedCaregivers.map((caregiver, index) => (
                <Card
                  key={caregiver.id}
                  className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={caregiver.avatar || "/placeholder.svg"} alt={caregiver.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {caregiver.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="bg-primary text-primary-foreground">Matched</Badge>
                    </div>
                    <CardTitle className="text-lg">{caregiver.name}</CardTitle>
                    <CardDescription>{caregiver.role}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Match Score</span>
                        <span className="font-semibold">{caregiver.matchScore}%</span>
                      </div>
                      <Progress value={caregiver.matchScore} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Trust Score</span>
                        <span className="font-semibold">{caregiver.trustScore}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(caregiver.trustScore / 20) ? "fill-primary text-primary" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {caregiver.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {caregiver.experience}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => setSelectedCaregiver(caregiver)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-primary/30 hover:bg-primary/10 bg-transparent"
                        onClick={() => setShowScheduleDialog(true)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Matching Tab */}
          <TabsContent value="matching" className="space-y-6">
            {/* Matching Overview */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI-Powered Matching Analysis
                </CardTitle>
                <CardDescription>Advanced algorithm analyzing compatibility across multiple factors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Matches Found</span>
                      <Badge className="bg-primary text-primary-foreground">{matchedCaregivers.length}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Based on your care requirements and preferences</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Avg Compatibility</span>
                      <span className="text-lg font-bold text-primary">92%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Across all matched caregivers</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Top Match</span>
                      <Badge className="bg-secondary text-white">Amara - 95%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Highest compatibility score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matching Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Detailed Matching Analysis</h3>
              <div className="grid grid-cols-1 gap-4">
                {matchingAnalysis.map((analysis, index) => (
                  <Card
                    key={analysis.id}
                    className="border hover:shadow-md transition-all duration-300 cursor-pointer hover:border-primary/40 animate-in fade-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedMatching(analysis)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 flex items-start gap-3">
                          <Avatar className="w-10 h-10 border-2 border-primary/20">
                            <AvatarImage
                              src={(matchedCaregivers.find((c) => c.name === analysis.caregiver)?.avatar) || "/placeholder.svg"}
                              alt={analysis.caregiver}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {analysis.caregiver.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{analysis.caregiver}</CardTitle>
                            <CardDescription className="text-xs">
                              {(matchedCaregivers.find((c) => c.name === analysis.caregiver)?.role) || "Caregiver"}
                              {" • "}
                              {(matchedCaregivers.find((c) => c.name === analysis.caregiver)?.location) || "Location N/A"}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase text-muted-foreground tracking-wide">Match</div>
                          <div className="text-2xl font-bold text-primary">{analysis.matchScore}%</div>
                          <Badge className="bg-primary/10 text-primary text-xs mt-1">{analysis.recommendedAction}</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground">Top Factors</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.compatibilityFactors.slice(0, 3).map((factor) => (
                            <span
                              key={factor.factor}
                              className="px-2 py-1 rounded-full border bg-muted text-foreground text-[11px]"
                              title={`${factor.factor}: ${factor.score}%`}
                            >
                              {factor.factor}: {factor.score}%
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        <span className="font-medium text-foreground">Insight: </span>
                        {analysis.aiInsights}
                      </p>

                      {analysis.riskFactors.length > 0 && (
                        <div className="flex items-start gap-2 p-2 bg-secondary/10 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                          <p className="text-xs text-secondary">{analysis.riskFactors[0]}</p>
                        </div>
                      )}

                      <p className="text-[11px] text-muted-foreground">Tap to view details</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Schedule</CardTitle>
                <CardDescription>Upcoming shifts and caregiver assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedules.map((schedule, index) => (
                  <div
                    key={schedule.id}
                    className="p-4 border-2 rounded-lg hover:shadow-lg transition-all animate-in fade-in slide-in-from-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{schedule.caregiver}</h4>
                        <p className="text-sm text-muted-foreground">{schedule.type}</p>
                      </div>
                      <Badge
                        className={
                          schedule.status === "confirmed"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-white"
                        }
                      >
                        {schedule.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {schedule.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {schedule.time}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Join Meeting
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Preferences</CardTitle>
                <CardDescription>Help AI match you with the right caregivers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Care Type Needed</label>
                  <div className="space-y-2">
                    {["Geriatric Care", "Post-Surgery Care", "Rehabilitation", "Companionship"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <input type="radio" id={type} name="careType" className="w-4 h-4" />
                        <label htmlFor={type} className="flex-1 cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Preferred Shift Times</label>
                  <div className="space-y-2">
                    {["Morning (6AM-2PM)", "Afternoon (2PM-10PM)", "Night (10PM-6AM)", "24/7 Care"].map((shift) => (
                      <div
                        key={shift}
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <input type="checkbox" id={shift} className="w-4 h-4" />
                        <label htmlFor={shift} className="flex-1 cursor-pointer">
                          {shift}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Special Requirements</label>
                  <textarea
                    placeholder="Any specific requirements or preferences..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          
        </Tabs>
      </div>

      {/* Caregiver Profile Dialog */}
      <Dialog open={!!selectedCaregiver} onOpenChange={() => setSelectedCaregiver(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Caregiver Profile</DialogTitle>
            <DialogDescription>Complete information about your matched caregiver</DialogDescription>
          </DialogHeader>
          {selectedCaregiver && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={selectedCaregiver.avatar || "/placeholder.svg"} alt={selectedCaregiver.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {selectedCaregiver.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground">{selectedCaregiver.name}</h3>
                  <p className="text-lg text-muted-foreground">{selectedCaregiver.role}</p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <Badge className="bg-primary text-primary-foreground">{selectedCaregiver.matchScore}% Match</Badge>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Zap className="w-4 h-4 fill-primary text-primary" />
                      {selectedCaregiver.trustScore}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{selectedCaregiver.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{selectedCaregiver.experience}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Availability:</span> {selectedCaregiver.availability}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaregiver.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Video className="w-4 h-4 mr-2" />
                  Join Meeting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Matching Analysis Dialog */}
      <Dialog open={!!selectedMatching} onOpenChange={() => setSelectedMatching(null)}>
        <DialogContent className="max-w-[90rem] w-[150vw] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Matching Analysis: {selectedMatching?.caregiver}
            </DialogTitle>
            <DialogDescription>Detailed AI-powered compatibility assessment</DialogDescription>
          </DialogHeader>
          {selectedMatching && (
            <div className="space-y-6">
              {/* Caregiver Summary */}
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage
                    src={(matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.avatar) || "/placeholder.svg"}
                    alt={selectedMatching.caregiver}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedMatching.caregiver.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{selectedMatching.caregiver}</div>
                  <div className="text-xs text-muted-foreground">
                    {(matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.role) || "Caregiver"}
                    {" • "}
                    {(matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.location) || "Location N/A"}
                  </div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">Match Score (%)</p>
                  <div className="text-3xl font-bold text-primary">{selectedMatching.matchScore}%</div>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <p className="text-xs text-muted-foreground mb-1">Trust Score (0–100)</p>
                  <div className="text-3xl font-bold text-secondary">{selectedMatching.trustScore}</div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-muted">
                  <p className="text-xs text-muted-foreground mb-1">Recommendation</p>
                  <Badge className="bg-primary/10 text-primary text-sm py-1 px-2">{selectedMatching.recommendedAction}</Badge>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Role</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.role || "—"}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.location || "—"}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Experience</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.experience || "—"}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Availability</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.availability || "—"}
                  </p>
                </div>
              </div>

              {/* Compatibility Factors */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Compatibility Factors</h4>
                <div className="space-y-2">
                  {selectedMatching.compatibilityFactors.map((factor) => (
                    <div key={factor.factor} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{factor.factor}</span>
                          <Badge className="text-xs bg-muted text-muted-foreground">{factor.weight}</Badge>
                        </div>
                        <span className="text-sm font-bold text-primary">{factor.score}%</span>
                      </div>
                      <Progress value={factor.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Considerations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Top Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMatching.compatibilityFactors
                      .slice()
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 3)
                      .map((factor) => (
                        <Badge key={factor.factor} className="bg-primary/10 text-primary">
                          {factor.factor} • {factor.score}%
                        </Badge>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Considerations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMatching.compatibilityFactors
                      .slice()
                      .sort((a, b) => a.score - b.score)
                      .slice(0, 2)
                      .map((factor) => (
                        <Badge key={factor.factor} className="bg-secondary/10 text-secondary">
                          {factor.factor} • {factor.score}%
                        </Badge>
                      ))}
                    {selectedMatching.riskFactors.length > 0 && (
                      <Badge className="bg-secondary/10 text-secondary">
                        {selectedMatching.riskFactors[0]}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">AI Insights</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedMatching.aiInsights}</p>
              </div>

              {/* Risk Factors */}
              {selectedMatching.riskFactors.length > 0 && (
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-secondary" />
                    Risk Factors
                  </h4>
                  <div className="space-y-2">
                    {selectedMatching.riskFactors.map((risk, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-secondary/10 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <p className="text-sm text-secondary">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule Interview</DialogTitle>
            <DialogDescription>Set up an interview with your matched caregiver</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Select Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Select Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Interview Type</label>
              <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Video Call</option>
                <option>Phone Call</option>
                <option>In-Person</option>
              </select>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">Confirm Interview</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
