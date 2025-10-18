"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Brain, Calendar, Heart, MapPin, Star, Video, AlertCircle, Loader2, Search, Filter, Settings, CheckCircle2, Check, X, Sparkles, BadgeCheck, Clock, ChevronDown, ChevronUp, FileText } from "lucide-react"
import { caregiverData, clientData } from "@/lib/mock-data"
import { MegaDialog } from "@/components/ui/mega-dialog"
import { useToast } from "@/hooks/use-toast"

interface ClientsSectionProps {
  onViewProfile?: (candidateId: number) => void
  onScheduleInterview?: (candidateId: number) => void
  onSendOffer?: (candidateId: number) => void
}

export function ClientsSection({ onViewProfile, onScheduleInterview, onSendOffer }: ClientsSectionProps) {
  const clients = caregiverData.matchedClients
  const matchedCaregivers = clientData.matchedCaregivers
  const matchingAnalysis = clientData.matchingAnalysis

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
  const [analysisId, setAnalysisId] = useState<number | null>(null)
  const [isMatching, setIsMatching] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [workflowCollapsed, setWorkflowCollapsed] = useState(false)

  const selectedMatching = matchingAnalysis.find((m) => m.id === analysisId) || null

  const steps = useMemo(
    () => [
      { id: 1, title: "Collect Inputs", desc: "Read case details, preferences, risk flags", Icon: Search, duration: 600 },
      { id: 2, title: "Apply Guardrails", desc: "License, availability, background, allergy-safe", Icon: Filter, duration: 800 },
      { id: 3, title: "Score Candidates", desc: "Skills, experience, proximity, comms, philosophy", Icon: Settings, duration: 1000 },
      { id: 4, title: "Aggregate & Rank", desc: "Weight factors → compute ranking", Icon: Brain, duration: 700 },
      { id: 5, title: "Validate & Finalize", desc: "Sanity checks, generate insights", Icon: CheckCircle2, duration: 500 },
    ],
    [],
  )

  useEffect(() => {
    if (selectedClientId !== null) {
      setIsMatching(true)
      setCurrentStep(0)
      setLogs([])
      // Sequentially advance steps with a minimum total duration
      let cancelled = false
      let timeout: ReturnType<typeof setTimeout>
      const startedAt = Date.now()
      const run = (index: number) => {
        if (cancelled) return
        if (index >= steps.length) {
          const elapsed = Date.now() - startedAt
          const minDuration = 1800
          const waitMore = Math.max(0, minDuration - elapsed)
          timeout = setTimeout(() => setIsMatching(false), waitMore)
          return
        }
        setCurrentStep(index)
        // append a log line for this step
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${steps[index].title}: ${steps[index].desc}`,
        ])
        timeout = setTimeout(() => run(index + 1), steps[index].duration)
      }
      run(0)
      return () => {
        cancelled = true
        if (timeout) clearTimeout(timeout)
      }
    }
  }, [selectedClientId, steps])

  const overallProgress = useMemo(() => Math.round((Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100), [currentStep, steps.length])

  return (
    <div className="space-y-8">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-muted-foreground">Clients currently seeking caregivers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarImage src={client.image || "/placeholder.svg"} alt={client.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {client.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Badge className={client.status === "matched" ? "bg-primary text-primary-foreground" : "bg-secondary text-white"}>
                  {client.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{client.name}</CardTitle>
              <CardDescription>
                {client.type} 
                {" • "}
                {client.specialization}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Match Score</span>
                  <span className="font-semibold">{client.matchScore}%</span>
                </div>
                <Progress value={client.matchScore} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Trust Score</span>
                  <span className="font-semibold">{client.trustScore}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(client.trustScore / 20) ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {client.location}
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => setSelectedClientId(client.id)}>
                  <Brain className="w-4 h-4 mr-2" />
                  AI Matching
                </Button>
                <Button variant="outline" className="flex-1 border-primary/30 hover:bg-primary/10 bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MegaDialog
        open={selectedClientId !== null}
        onOpenChange={() => setSelectedClientId(null)}
        size={analysisId ? "fullscreen" : "ultra"}
        title={<span className="flex items-center gap-2"><Brain className="w-5 h-5 text-primary" /> AI Matching</span>}
        description={"Agentic workflow running, then top caregiver matches"}
        headerExtra={isMatching ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <BadgeCheck className="w-5 h-5 text-primary" />}
      >
          <div className="space-y-6">
            {/* Two-panel layout container */}
            <div className={`flex gap-4 transition-all duration-300 flex-col lg:flex-row`}> 
              {/* Left: workflow + top matches */}
              <div className={`transition-all duration-300 ${analysisId ? 'w-0 lg:w-[58%]' : 'w-full'}`}>
                {/* Agentic workflow timeline */}
                <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {isMatching ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Sparkles className="w-4 h-4 text-primary" />}
                      Workflow
                    </CardTitle>
                    <CardDescription>Real-time progress across AI matching stages</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    onClick={() => !isMatching && setWorkflowCollapsed((v) => !v)}
                    disabled={isMatching}
                    aria-expanded={!workflowCollapsed}
                    aria-controls="workflow-content"
                  >
                    {workflowCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent id="workflow-content" className={`space-y-4 transition-all duration-300 ${workflowCollapsed && !isMatching ? 'max-h-0 opacity-0 overflow-hidden py-0' : 'max-h-[1200px] opacity-100'}`}>
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
                  <div className="space-y-3">
                    {steps.map((s, i) => (
                      <div key={s.id} className="relative pl-8">
                        <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center border ${i < currentStep ? 'bg-primary text-primary-foreground border-primary' : i === currentStep && isMatching ? 'bg-primary/10 text-primary border-primary/30' : 'bg-muted text-muted-foreground border-border'}`}>
                          {i < currentStep ? <Check className="w-3 h-3" /> : i === currentStep && isMatching ? <Loader2 className="w-3 h-3 animate-spin" /> : <Clock className="w-3 h-3" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <s.Icon className={`w-4 h-4 ${i <= currentStep ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className={i <= currentStep ? 'text-foreground' : 'text-muted-foreground'}>{s.title}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground pl-6">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                <div className="bg-muted/40 rounded-md p-3 text-xs font-mono text-muted-foreground max-h-32 overflow-y-auto">
                  {logs.length === 0 ? <div className="opacity-60">Awaiting logs…</div> : logs.map((l, idx) => (
                    <div key={idx} className="truncate">{l}</div>
                  ))}
                </div>
              </CardContent>
                </Card>

            {/* Compact caregiver cards - vertical layout */}
            {!isMatching && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">Top Matches</h3>
                  <Badge className="bg-primary/10 text-primary">{matchedCaregivers.slice(0,3).length}</Badge>
                </div>
                <div className="flex flex-col gap-3">
                  {matchedCaregivers.slice(0,3).map((cg) => (
                    <CompactCaregiverCard
                      key={cg.id}
                      caregiver={cg}
                      onView={() => setAnalysisId(cg.id)}
                      onSchedule={() => onScheduleInterview ? onScheduleInterview(cg.id) : undefined}
                      onOffer={() => onSendOffer ? onSendOffer(cg.id) : undefined}
                    />
                  ))}
                </div>
              </div>
            )}
              </div>

              {/* Right: Analysis panel, appears when a caregiver is selected */}
              <div className={`transition-all duration-300 overflow-hidden ${analysisId ? 'w-full lg:w-[42%] opacity-100' : 'w-0 lg:w-0 opacity-0'} `}>
                {selectedMatching && (
                  <Card className="h-full border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Brain className="w-4 h-4 text-primary" />
                          Matching Analysis: {selectedMatching.caregiver}
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setAnalysisId(null)} className="shrink-0">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardDescription>Detailed AI-powered compatibility assessment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 max-h-[75vh] overflow-y-auto">
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
                        <div className="flex-1">
                          <div className="text-sm font-semibold">{selectedMatching.caregiver}</div>
                          <div className="text-xs text-muted-foreground">Overall Match</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase text-muted-foreground tracking-wide">Score</div>
                          <div className="text-2xl font-bold text-primary">{selectedMatching.matchScore}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedMatching.compatibilityFactors.map((f, idx) => (
                          <Card key={idx} className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">{f.factor}</CardTitle>
                              <CardDescription className="text-xs">Weight: {f.weight}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-primary">{f.score}%</span>
                                <Progress value={f.score} className="h-2 w-24" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Card className="border bg-gradient-to-br from-primary/5 to-secondary/5">
                        <CardHeader>
                          <CardTitle className="text-sm">AI Insights</CardTitle>
                          <CardDescription>Summary of matching rationale</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{selectedMatching.aiInsights}</p>
                        </CardContent>
                      </Card>

                      {selectedMatching.riskFactors.length > 0 && (
                        <Card className="border">
                          <CardHeader>
                            <CardTitle className="text-sm">Risks & Considerations</CardTitle>
                            <CardDescription>Potential issues to review</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground">
                              {selectedMatching.riskFactors.map((r, idx) => (
                                <li key={idx}>{r}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      <div className="flex gap-3 pt-2">
                        <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => analysisId && onViewProfile ? onViewProfile(analysisId) : undefined}>
                          <FileText className="w-4 h-4 mr-2" />
                          View Full Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
      </MegaDialog>
    </div>
  )
}

function CompactCaregiverCard({ caregiver, onView, onSchedule, onOffer }: { caregiver: (typeof clientData.matchedCaregivers)[number]; onView: () => void; onSchedule?: () => void; onOffer?: () => void }) {
  const { toast } = useToast()
  return (
    <Card className="border hover:shadow-md transition-all duration-300">
      <CardHeader className="py-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border shrink-0">
            <AvatarImage src={caregiver.avatar || "/placeholder.svg"} alt={caregiver.name} />
            <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-sm leading-snug break-words">{caregiver.name}</CardTitle>
              <Badge className="bg-primary/10 text-primary text-[11px] px-2 py-0.5 shrink-0">{caregiver.matchScore}%</Badge>
            </div>
            <CardDescription className="text-xs leading-snug break-words">{caregiver.role} • {caregiver.location}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex flex-wrap gap-2">
          {caregiver.skills.slice(0, 2).map((s) => (
            <Badge key={s} variant="outline" className="text-[11px] border-primary/30 whitespace-normal break-words">{s}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="h-8 text-[12px] bg-primary flex-1 min-w-[90px]" onClick={onView}>
            <Sparkles className="w-3 h-3 mr-1" /> View
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-[12px] flex-1 min-w-[90px]"
            onClick={() => (onSchedule ? onSchedule() : toast({ title: "Interview scheduled", description: `We will contact ${caregiver.name}` }))}
          >
            <Calendar className="w-3 h-3 mr-1" /> Interview
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-[12px] flex-1 min-w-[90px]"
            onClick={() => (onOffer ? onOffer() : toast({ title: "Offer sent", description: `${caregiver.name} has been notified` }))}
          >
            <Heart className="w-3 h-3 mr-1" /> Offer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
