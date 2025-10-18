"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, CheckCircle2, Filter, Heart, MapPin, Star, Users } from "lucide-react"
import type { Candidate } from "../types"

interface ApplicantsSectionProps {
  candidates: Candidate[]
  searchTerm: string
  filterSource: string
  onSearchChange: (value: string) => void
  onFilterChange: (value: string) => void
  onViewProfile: (candidate: Candidate) => void
  onScheduleInterview: (candidateId: Candidate["id"]) => void
  onSendOffer: (candidateId: Candidate["id"]) => void
}

export function ApplicantsSection({
  candidates,
  searchTerm,
  filterSource,
  onSearchChange,
  onFilterChange,
  onViewProfile,
  onScheduleInterview,
  onSendOffer,
}: ApplicantsSectionProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Users className="w-10 h-10 text-primary" />
          Applicants
        </h1>
        <p className="text-muted-foreground">Manage candidates and applications</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name or role..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          className="flex-1"
        />
        <Select value={filterSource} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Indeed">Indeed</SelectItem>
            <SelectItem value="Scan123">Scan123</SelectItem>
            <SelectItem value="Wellsky">Wellsky</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-primary/30 hover:bg-primary/10 bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-xl font-semibold text-foreground">All Candidates</h3>
          <Badge className="bg-primary/10 text-primary">{candidates.length}</Badge>
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
                        .map((namePart) => namePart[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-primary text-primary-foreground font-semibold">
                      {candidate.matchScore}% Match
                    </Badge>
                    <Badge className="bg-muted text-muted-foreground text-xs">{candidate.source}</Badge>
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
                  {candidate.skills.slice(0, 2).map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-xs border-primary/30 text-foreground hover:bg-primary/10 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-lg transition-all"
                    onClick={() => onViewProfile(candidate)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    View Full Profile
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10 bg-transparent disabled:opacity-50"
                      onClick={() => onScheduleInterview(candidate.id)}
                      disabled={candidate.status !== "available"}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Interview
                    </Button>
                    <Button
                      variant="outline"
                      className="border-secondary/30 hover:bg-secondary/10 bg-transparent disabled:opacity-50"
                      onClick={() => onSendOffer(candidate.id)}
                      disabled={candidate.status === "offer-sent"}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Offer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
