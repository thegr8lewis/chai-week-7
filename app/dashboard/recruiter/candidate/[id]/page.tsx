"use client"

import { useMemo } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Heart, Mail, MapPin, Phone, Star, Award, FileText } from "lucide-react"
import { applicants as initialApplicants } from "../../data"

export default function CandidateProfilePage() {
  const params = useParams()
  const search = useSearchParams()
  const router = useRouter()
  const from = search.get("from") || "applicants"
  const id = Number(params?.id)

  const candidate = useMemo(() => initialApplicants.find((c) => c.id === id) || null, [id])

  const backHref = `/dashboard/recruiter?section=${from}`

  if (!candidate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Candidate Not Found</h1>
          <Button onClick={() => router.push(backHref)}>Back</Button>
        </div>
        <p className="text-muted-foreground">We couldn't find the candidate you were looking for.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Candidate Profile</h1>
            <p className="text-muted-foreground">Complete information and credentials</p>
          </div>
          <Button variant="outline" onClick={() => router.push(backHref)}>Back to {from}</Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {candidate.name.split(" ").map((n)=>n[0]).join("")}
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
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Location</CardTitle>
                      <CardDescription className="text-xs">Current base</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {candidate.location}
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Experience</CardTitle>
                      <CardDescription className="text-xs">Total years</CardDescription>
                    </CardHeader>
                    <CardContent>{candidate.experience}</CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((s) => (
                      <Badge key={s} variant="outline" className="border-primary/30">{s}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="credentials" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Certifications</CardTitle>
                      <CardDescription className="text-xs">Highlights</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {candidate.certifications?.map((c) => (
                        <div key={c} className="flex items-center gap-2 text-sm"><Award className="w-4 h-4" /> {c}</div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Documents</CardTitle>
                      <CardDescription className="text-xs">Provided</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {candidate.documents?.map((d) => (
                        <div key={d.name} className="flex items-center gap-2 text-sm"><FileText className="w-4 h-4" /> {d.name}</div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" /> {candidate.phone || "N/A"}</div>
                <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /> {candidate.email || "N/A"}</div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 pt-6">
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Calendar className="w-4 h-4 mr-2" /> Schedule Interview
              </Button>
              <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                <Heart className="w-4 h-4 mr-2" /> Send Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
