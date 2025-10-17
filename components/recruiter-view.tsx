"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Star, Shield, Sparkles, CheckCircle2, Phone, Mail, Calendar, Award, Heart, Clock } from "lucide-react"

const initialCandidates = [
  {
    id: 1,
    name: "Amara Okafor",
    role: "Registered Nurse",
    location: "Lagos, Nigeria",
    trustScore: 98,
    skills: ["Pediatric Care", "Emergency Response", "Patient Education"],
    allergySafe: true,
    matchScore: 95,
    avatar: "/african-woman-nurse.jpg",
    phone: "+234 801 234 5678",
    email: "amara.okafor@carelink.ai",
    experience: "8 years",
    certifications: ["RN License", "BLS", "ACLS", "Pediatric Advanced Life Support"],
    languages: ["English", "Igbo", "Yoruba"],
    availability: "Immediate",
    status: "available" as "available" | "interview-scheduled" | "offer-sent",
    interviewDate: null as string | null,
  },
  {
    id: 2,
    name: "Kwame Mensah",
    role: "Physical Therapist",
    location: "Accra, Ghana",
    trustScore: 96,
    skills: ["Rehabilitation", "Sports Therapy", "Geriatric Care"],
    allergySafe: true,
    matchScore: 92,
    avatar: "/african-man-therapist.jpg",
    phone: "+233 24 567 8901",
    email: "kwame.mensah@carelink.ai",
    experience: "6 years",
    certifications: ["PT License", "Sports Therapy Cert", "Manual Therapy"],
    languages: ["English", "Twi", "French"],
    availability: "2 weeks notice",
    status: "available" as "available" | "interview-scheduled" | "offer-sent",
    interviewDate: null as string | null,
  },
  {
    id: 3,
    name: "Zainab Hassan",
    role: "Home Health Aide",
    location: "Nairobi, Kenya",
    trustScore: 94,
    skills: ["Personal Care", "Medication Management", "Companionship"],
    allergySafe: false,
    matchScore: 89,
    avatar: "/african-woman-caregiver.jpg",
    phone: "+254 712 345 678",
    email: "zainab.hassan@carelink.ai",
    experience: "5 years",
    certifications: ["HHA Certificate", "First Aid", "CPR"],
    languages: ["English", "Swahili", "Arabic"],
    availability: "Immediate",
    status: "available" as "available" | "interview-scheduled" | "offer-sent",
    interviewDate: null as string | null,
  },
]

export function RecruiterView() {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof candidates)[0] | null>(null)

  const handleScheduleInterview = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              status: "interview-scheduled",
              interviewDate: "Tuesday, Jan 28 at 10:00 AM",
            }
          : c,
      ),
    )
    setSelectedCandidate(null)
  }

  const handleSendOffer = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              status: "offer-sent",
            }
          : c,
      ),
    )
    setSelectedCandidate(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">AI Match Recommendations</h3>
          <p className="text-muted-foreground">Top candidates for your open positions</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate, index) => (
          <Card
            key={candidate.id}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 animate-in fade-in slide-in-from-bottom relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {candidate.status === "interview-scheduled" && (
              <div className="absolute top-0 left-0 right-0 bg-primary/90 text-primary-foreground text-xs font-semibold py-1.5 px-3 flex items-center gap-2 z-10">
                <Calendar className="w-3 h-3" />
                Interview Scheduled
              </div>
            )}
            {candidate.status === "offer-sent" && (
              <div className="absolute top-0 left-0 right-0 bg-secondary/90 text-white text-xs font-semibold py-1.5 px-3 flex items-center gap-2 z-10">
                <Heart className="w-3 h-3" />
                Offer Sent
              </div>
            )}

            <CardHeader className={`space-y-4 ${candidate.status !== "available" ? "pt-12" : ""}`}>
              <div className="flex items-start justify-between">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-end gap-2">
                  <Badge className="bg-primary text-primary-foreground font-semibold">
                    {candidate.matchScore}% Match
                  </Badge>
                  {candidate.allergySafe && (
                    <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                      <Shield className="w-3 h-3 mr-1" />
                      Allergy Safe
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <CardTitle className="text-xl text-foreground">{candidate.name}</CardTitle>
                <CardDescription className="text-base">{candidate.role}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {candidate.location}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  Trust Score: {candidate.trustScore}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs border-primary/30 text-foreground hover:bg-primary/10 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {candidate.status === "interview-scheduled" && candidate.interviewDate && (
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Clock className="w-4 h-4" />
                    {candidate.interviewDate}
                  </div>
                </div>
              )}

              {candidate.status === "offer-sent" && (
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Awaiting candidate response
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-lg transition-all"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  View Full Profile
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 bg-transparent disabled:opacity-50"
                    onClick={() => handleScheduleInterview(candidate.id)}
                    disabled={candidate.status !== "available"}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    {candidate.status === "interview-scheduled" ? "Scheduled" : "Interview"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-secondary/30 hover:bg-secondary/10 bg-transparent disabled:opacity-50"
                    onClick={() => handleSendOffer(candidate.id)}
                    disabled={candidate.status === "offer-sent"}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {candidate.status === "offer-sent" ? "Sent" : "Send Offer"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Candidate Profile</DialogTitle>
            <DialogDescription>Complete information and credentials</DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} alt={selectedCandidate.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {selectedCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground">{selectedCandidate.name}</h3>
                  <p className="text-lg text-muted-foreground">{selectedCandidate.role}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-primary text-primary-foreground">{selectedCandidate.matchScore}% Match</Badge>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      {selectedCandidate.trustScore}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{selectedCandidate.location}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Experience:</span> {selectedCandidate.experience}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Availability:</span> {selectedCandidate.availability}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Languages:</span> {selectedCandidate.languages.join(", ")}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="border-primary/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
                  onClick={() => handleScheduleInterview(selectedCandidate.id)}
                  disabled={selectedCandidate.status !== "available"}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {selectedCandidate.status === "interview-scheduled" ? "Interview Scheduled" : "Schedule Interview"}
                </Button>
                <Button
                  className="flex-1 bg-secondary hover:bg-secondary/90 disabled:opacity-50"
                  onClick={() => handleSendOffer(selectedCandidate.id)}
                  disabled={selectedCandidate.status === "offer-sent"}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {selectedCandidate.status === "offer-sent" ? "Offer Sent" : "Send Offer"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
