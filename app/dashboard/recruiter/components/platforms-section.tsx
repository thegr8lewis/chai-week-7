"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Check,
  CheckCircle2,
  Clock,
  Filter,
  Link2,
  Plus,
  RefreshCcw,
  Users,
} from "lucide-react"
import type {
  CandidatePipelineStatus,
  IntegrationWorkflowStep,
  JobSource,
  PlatformFilterType,
  PlatformIntegration,
} from "../types"

interface PlatformsSectionProps {
  jobSources: JobSource[]
  integrations: PlatformIntegration[]
  workflowSteps: IntegrationWorkflowStep[]
  onConnectClick: () => void
}

type IntegrationRuntime = PlatformIntegration & {
  isSyncing: boolean
  syncProgress: number
}

const candidateStatusStyles: Record<CandidatePipelineStatus, string> = {
  New: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Filtered: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Ready: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Imported: "bg-purple-500/10 text-purple-600 border-purple-500/20",
}

const filterTypeStyles: Record<PlatformFilterType, string> = {
  include: "bg-green-500/10 text-green-600 border-green-500/20",
  exclude: "bg-red-500/10 text-red-600 border-red-500/20",
  limit: "bg-blue-500/10 text-blue-600 border-blue-500/20",
}

export function PlatformsSection({
  jobSources,
  integrations,
  workflowSteps,
  onConnectClick,
}: PlatformsSectionProps) {
  const [selectedPlatformId, setSelectedPlatformId] = useState<number | null>(jobSources[0]?.id ?? null)
  const [integrationState, setIntegrationState] = useState<Record<number, IntegrationRuntime>>(() => {
    const map: Record<number, IntegrationRuntime> = {}
    const denominator = Math.max(workflowSteps.length, 1)
    integrations.forEach((integration) => {
      map[integration.platformId] = {
        ...integration,
        isSyncing: false,
        syncProgress: Math.round((integration.completionStep / denominator) * 100),
      }
    })
    return map
  })
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  const selectedSource = useMemo(
    () => jobSources.find((source) => source.id === selectedPlatformId),
    [jobSources, selectedPlatformId],
  )

  const selectedIntegration = selectedPlatformId ? integrationState[selectedPlatformId] : null
  const stepCount = workflowSteps.length || 1
  const completedSteps = selectedIntegration ? Math.min(selectedIntegration.completionStep, stepCount) : 0
  const displayProgress = selectedIntegration ? selectedIntegration.syncProgress : 0

  const candidateStats = useMemo(() => {
    if (!selectedIntegration) {
      return { total: 0, ready: 0, imported: 0, filtered: 0 }
    }
    return {
      total: selectedIntegration.candidates.length,
      ready: selectedIntegration.candidates.filter((candidate) => candidate.status === "Ready").length,
      imported: selectedIntegration.candidates.filter((candidate) => candidate.status === "Imported").length,
      filtered: selectedIntegration.candidates.filter((candidate) => candidate.status === "Filtered").length,
    }
  }, [selectedIntegration])

  const handleSelectPlatform = (platformId: number) => {
    setSelectedPlatformId(platformId)
  }

  const handleCandidateImport = (candidateId: number) => {
    if (!selectedPlatformId) return
    setIntegrationState((prev) => {
      const current = prev[selectedPlatformId]
      if (!current) return prev
      const updatedCandidates = current.candidates.map((candidate) =>
        candidate.id === candidateId ? { ...candidate, status: "Imported" } : candidate,
      )
      return {
        ...prev,
        [selectedPlatformId]: {
          ...current,
          candidates: updatedCandidates,
        },
      }
    })
  }

  const handleSync = () => {
    if (!selectedPlatformId) return
    const platformId = selectedPlatformId

    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    setIntegrationState((prev) => {
      const current = prev[platformId]
      if (!current) return prev
      return {
        ...prev,
        [platformId]: {
          ...current,
          isSyncing: true,
          syncProgress: Math.max(current.syncProgress, 10),
        },
      }
    })

    const checkpoints = [35, 60, 85, 100]
    checkpoints.forEach((progress, index) => {
      const timeout = setTimeout(() => {
        setIntegrationState((prev) => {
          const current = prev[platformId]
          if (!current) return prev
          const isFinal = progress === 100
          const inferredStep = Math.max(
            current.completionStep,
            Math.min(stepCount, Math.ceil((progress / 100) * stepCount)),
          )
          return {
            ...prev,
            [platformId]: {
              ...current,
              isSyncing: !isFinal,
              syncProgress: progress,
              completionStep: isFinal ? stepCount : inferredStep,
              lastSync: isFinal ? "Moments ago" : current.lastSync,
              nextSync: isFinal ? "Auto-sync tonight at 11:00 PM" : current.nextSync,
              candidates: isFinal
                ? current.candidates.map((candidate) =>
                    candidate.status === "Imported"
                      ? candidate
                      : { ...candidate, status: candidate.status === "Ready" ? "Imported" : candidate.status },
                  )
                : current.candidates,
            },
          }
        })
      }, (index + 1) * 600)
      timeoutsRef.current.push(timeout)
    })
  }

  return (
    <div className="animate-in fade-in duration-300 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Link2 className="w-10 h-10 text-primary" />
          Job Platforms
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Curate caregiver talent from connected platforms, apply tailored filters, and import the best matches into your
          CareLink network.
        </p>
      </div>

      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Link2 className="w-5 h-5 text-primary" />
                Connected Job Platforms
              </CardTitle>
              <CardDescription>Choose a source to explore incoming caregiver pipelines.</CardDescription>
            </div>
            <Button onClick={onConnectClick} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Connect New Platform
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobSources.map((source) => {
              const IconComponent = source.icon
              const isActive = source.id === selectedPlatformId
              return (
                <Card
                  key={source.id}
                  className={`border-2 transition-all ${
                    isActive
                      ? "border-primary shadow-lg ring-2 ring-primary/30"
                      : "hover:border-primary/40 hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectPlatform(source.id)}
                    className="w-full text-left group"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 ${source.color} rounded-lg flex items-center justify-center transition-transform ${
                              isActive ? "scale-110" : "group-hover:scale-105"
                            }`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{source.name}</h3>
                            {source.connected && (
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mt-1 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Connected
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Applicants • {source.applicants}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Sync cadence</span>
                        <span>{integrationState[source.id]?.nextSync ?? "Manual"}</span>
                      </div>
                    </CardContent>
                  </button>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedSource && selectedIntegration && (
        <div className="grid gap-6 lg:grid-cols-[1.5fr,2fr]">
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="w-5 h-5 text-primary" />
                  Sync Overview — {selectedSource.name}
                </CardTitle>
                <CardDescription>
                  Review connection health, progress through the workflow, and manage simulated imports.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Last sync: {selectedIntegration.lastSync}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4 text-primary" />
                    Next sync: {selectedIntegration.nextSync}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {completedSteps} / {stepCount} steps complete
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Integration completion</span>
                    <span>{displayProgress}%</span>
                  </div>
                  <Progress value={displayProgress} className="h-2" />
                </div>

                <Button
                  onClick={handleSync}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={selectedIntegration.isSyncing}
                >
                  <RefreshCcw className={`w-4 h-4 mr-2 ${selectedIntegration.isSyncing ? "animate-spin" : ""}`} />
                  {selectedIntegration.isSyncing ? "Syncing caregivers..." : "Simulate Import & Sync"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filter Strategy
                </CardTitle>
                <CardDescription>Guardrails applied before caregivers enter your review queue.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedIntegration.filters.map((filterRule) => (
                  <div key={filterRule.id} className="rounded-xl border border-border/80 p-4 bg-muted/40">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-semibold text-foreground">{filterRule.label}</h4>
                      <Badge className={filterTypeStyles[filterRule.type]}>
                        {filterRule.type === "include"
                          ? "Include"
                          : filterRule.type === "exclude"
                          ? "Exclude"
                          : "Limit"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{filterRule.description}</p>
                    <p className="text-sm font-medium text-foreground mt-3">Value: {filterRule.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Workflow Tracker</CardTitle>
                <CardDescription>Follow each step to bring caregivers into CareLink.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {workflowSteps.map((step, index) => {
                  const position = index + 1
                  const isComplete = position <= completedSteps
                  const isActive =
                    position === completedSteps + 1 || (completedSteps === stepCount && position === stepCount)
                  return (
                    <div key={step.id} className="flex gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          isComplete
                            ? "bg-primary text-primary-foreground border-primary"
                            : isActive
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {isComplete ? <Check className="w-5 h-5" /> : position}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span>Caregiver Feed — {selectedSource.name}</span>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Badge variant="outline">Total {candidateStats.total}</Badge>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                    Ready {candidateStats.ready}
                  </Badge>
                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                    Filtered {candidateStats.filtered}
                  </Badge>
                  <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                    Imported {candidateStats.imported}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Preview qualified caregivers from this platform, adjust statuses, and import them into CareLink.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="feed">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="feed">Candidate Feed</TabsTrigger>
                  <TabsTrigger value="notes">Platform Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="feed">
                  <ScrollArea className="h-[360px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Caregiver</TableHead>
                          <TableHead>Role & Specialty</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Match</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedIntegration.candidates.map((candidate) => (
                          <TableRow key={candidate.id}>
                            <TableCell className="font-semibold text-foreground">{candidate.name}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground">{candidate.role}</span>
                                <span className="text-xs text-muted-foreground">{candidate.specialty}</span>
                                <span className="text-xs text-muted-foreground">{candidate.location}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{candidate.experience}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-semibold">
                                {candidate.matchScore}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={candidateStatusStyles[candidate.status]}>{candidate.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-primary/40 hover:bg-primary/10"
                                onClick={() => handleCandidateImport(candidate.id)}
                                disabled={candidate.status === "Imported" || selectedIntegration.isSyncing}
                              >
                                {candidate.status === "Imported" ? "Imported" : "Add to CareLink"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="notes" className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Use this panel to document sourcing assumptions, outreach scripts, or region-specific insights for{" "}
                    <span className="font-semibold text-foreground">{selectedSource.name}</span>. Because this is a static
                    sandbox, jot down anything your team should remember for future automation.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Confirm webhook delivery format before moving to production.</li>
                    <li>Align on SLA for manual reviews when volume spikes.</li>
                    <li>Capture feedback from recruiters to refine filters quickly.</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
