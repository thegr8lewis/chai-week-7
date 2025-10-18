"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Award,
  Calendar,
  FileText,
  Heart,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react"
import type { Candidate } from "../types"

interface CandidateProfileDialogProps {
  candidate: Candidate | null
  onClose: () => void
  onScheduleInterview: (candidateId: Candidate["id"]) => void
  onSendOffer: (candidateId: Candidate["id"]) => void
}

export function CandidateProfileDialog({
  candidate,
  onClose,
  onScheduleInterview,
  onSendOffer,
}: CandidateProfileDialogProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={!!candidate} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Candidate Profile</DialogTitle>
          <DialogDescription>Complete information and credentials</DialogDescription>
        </DialogHeader>
        {candidate && (
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {candidate.name
                    .split(" ")
                    .map((namePart) => namePart[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground">{candidate.name}</h3>
                <p className="text-lg text-muted-foreground">{candidate.role}</p>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <Badge className="bg-primary text-primary-foreground">{candidate.matchScore}% Match</Badge>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    {candidate.trustScore}
                  </div>
                  <Badge className="bg-muted text-muted-foreground">{candidate.source}</Badge>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{candidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{candidate.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold">Experience:</span> {candidate.experience}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Availability:</span> {candidate.availability}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Languages:</span> {candidate.languages.join(", ")}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-3">
                {candidate.documents.map((document, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="font-medium">{document.name}</span>
                    </div>
                    <Badge
                      className={
                        document.status === "verified"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {document.status}
                    </Badge>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.certifications.map((certification) => (
                      <Badge key={certification} variant="outline" className="border-primary/30">
                        {certification}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
                onClick={() => onScheduleInterview(candidate.id)}
                disabled={candidate.status !== "available"}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {candidate.status === "interview-scheduled" ? "Interview Scheduled" : "Schedule Interview"}
              </Button>
              <Button
                className="flex-1 bg-secondary hover:bg-secondary/90 disabled:opacity-50"
                onClick={() => onSendOffer(candidate.id)}
                disabled={candidate.status === "offer-sent"}
              >
                <Heart className="w-4 h-4 mr-2" />
                {candidate.status === "offer-sent" ? "Offer Sent" : "Send Offer"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
