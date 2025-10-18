"use client"

import { useMemo, useState } from "react"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Link2,
  ListChecks,
  Play,
  Sparkles,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { AvailablePlatform, IntegrationWorkflowStep, JobSource, PlatformCandidate, PlatformIntegration } from "../types"

interface PlatformsSectionProps {
  jobSources: JobSource[]
  integrations: PlatformIntegration[]
  workflowSteps: IntegrationWorkflowStep[]
  onConnectClick: () => void
  availablePlatforms?: AvailablePlatform[]
}

export function PlatformsSection({ jobSources, integrations, workflowSteps, onConnectClick, availablePlatforms = [] }: PlatformsSectionProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [selectedPlatformId, setSelectedPlatformId] = useState<JobSource["id"] | null>(jobSources[0]?.id ?? null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [selectedPlatformCandidate, setSelectedPlatformCandidate] = useState<PlatformCandidate | null>(null)

  const currentIntegration = useMemo(() => {
    if (selectedPlatformId == null) return null
    return integrations.find((i) => i.platformId === selectedPlatformId) ?? null
  }, [integrations, selectedPlatformId])

  const connectedPlatforms = jobSources.filter((s) => s.connected)
  const availableToConnect = availablePlatforms

  const stepIcons = [Link2, Filter, Users, ListChecks]

  const goNext = () => setActiveStepIndex((i) => Math.min(i + 1, workflowSteps.length - 1))
  const goPrev = () => setActiveStepIndex((i) => Math.max(i - 1, 0))

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          Job Platforms
        </h1>
        <p className="text-muted-foreground">Connect, configure, preview, and import candidates in a guided flow.</p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Workflow</CardTitle>
          <CardDescription>Follow the steps to integrate platforms without clutter.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, idx) => {
              const Icon = stepIcons[idx] ?? CheckCircle2
              const isActive = idx === activeStepIndex
              const isCompleted = idx < activeStepIndex
              return (
                <button
                  key={step.id}
                  className={`text-left rounded-lg border p-4 transition-all hover:shadow-sm ${
                    isActive ? "border-primary/60 bg-primary/5" : "border-border"
                  } ${isCompleted ? "opacity-80" : ""}`}
                  onClick={() => setActiveStepIndex(idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-green-500/10 text-green-600" : isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button variant="outline" onClick={goPrev} disabled={activeStepIndex === 0}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <Button onClick={goNext} disabled={activeStepIndex === workflowSteps.length - 1}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeStepIndex === 0 && (
        <ConnectStep
          connected={connectedPlatforms}
          disconnected={availableToConnect}
          onConnectClick={onConnectClick}
          selectedPlatformId={selectedPlatformId}
          onSelectPlatform={setSelectedPlatformId}
          currentIntegration={currentIntegration}
        />
      )}

      {activeStepIndex === 1 && (
        <FiltersStep
          platforms={connectedPlatforms}
          selectedPlatformId={selectedPlatformId}
          onSelectPlatform={setSelectedPlatformId}
          integration={currentIntegration}
        />
      )}

      {activeStepIndex === 2 && (
        <PreviewStep
          platforms={connectedPlatforms}
          selectedPlatformId={selectedPlatformId}
          onSelectPlatform={setSelectedPlatformId}
          integration={currentIntegration}
          onPreview={(c) => {
            setSelectedPlatformCandidate(c)
            setPreviewOpen(true)
          }}
          onImport={(c) => {
            setSelectedPlatformCandidate(c)
            setImportOpen(true)
          }}
        />
      )}

      {activeStepIndex === 3 && (
        <ImportStep
          platforms={connectedPlatforms}
          selectedPlatformId={selectedPlatformId}
          onSelectPlatform={setSelectedPlatformId}
          integration={currentIntegration}
        />
      )}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Candidate Preview</DialogTitle>
            <DialogDescription>Review details before taking action.</DialogDescription>
          </DialogHeader>
          {selectedPlatformCandidate ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedPlatformCandidate.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Role</p>
                  <p className="font-medium">{selectedPlatformCandidate.role}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">{selectedPlatformCandidate.experience}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedPlatformCandidate.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Availability</p>
                  <p className="font-medium">{selectedPlatformCandidate.availability}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Match</p>
                  <p className="font-medium">{selectedPlatformCandidate.matchScore}%</p>
                </div>
              </div>
              <div>
                <Badge className="bg-muted text-foreground">{selectedPlatformCandidate.status}</Badge>
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import Candidate</DialogTitle>
            <DialogDescription>Confirm importing this candidate into your network.</DialogDescription>
          </DialogHeader>
          {selectedPlatformCandidate ? (
            <div className="space-y-3 text-sm">
              <p className="font-medium">{selectedPlatformCandidate.name}</p>
              <p className="text-muted-foreground">{selectedPlatformCandidate.role} • {selectedPlatformCandidate.experience}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="import-tags">Tags</Label>
                  <Input id="import-tags" placeholder="e.g., critical-care, bilingual" />
                </div>
                <div>
                  <Label htmlFor="import-notes">Notes</Label>
                  <Input id="import-notes" placeholder="Optional notes" />
                </div>
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportOpen(false)}>Cancel</Button>
            <Button onClick={() => setImportOpen(false)}>Confirm Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PlatformPills({
  platforms,
  selectedPlatformId,
  onSelectPlatform,
}: {
  platforms: JobSource[]
  selectedPlatformId: number | null
  onSelectPlatform: (id: number) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((p) => (
        <button
          key={p.id}
          className={`px-3 py-1 rounded-full border text-sm transition-all ${
            selectedPlatformId === p.id ? "bg-primary/10 border-primary/50 text-primary" : "hover:bg-muted"
          }`}
          onClick={() => onSelectPlatform(p.id)}
        >
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${p.color}`} />
          <span className="inline-flex items-center gap-1">
            {p.icon ? <p.icon className="w-4 h-4" /> : null}
            <span>{p.name}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

function ConnectStep({
  connected,
  disconnected,
  onConnectClick,
  selectedPlatformId,
  onSelectPlatform,
  currentIntegration,
}: {
  connected: JobSource[]
  disconnected: AvailablePlatform[]
  onConnectClick: () => void
  selectedPlatformId: number | null
  onSelectPlatform: (id: number) => void
  currentIntegration: PlatformIntegration | null
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="border-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" /> Connected Platforms
          </CardTitle>
          <CardDescription>Select a platform to view integration status.</CardDescription>
        </CardHeader>
        <CardContent>
          {connected.length === 0 ? (
            <div className="text-muted-foreground">No platforms connected yet.</div>
          ) : (
            <>
              <PlatformPills platforms={connected} selectedPlatformId={selectedPlatformId} onSelectPlatform={onSelectPlatform} />

              {currentIntegration ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-base">Sync Status</CardTitle>
                      <CardDescription>Last and next sync windows</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Last Sync</p>
                          <p className="font-semibold">{currentIntegration.lastSync}</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Next Sync</p>
                        <p className="font-semibold">{currentIntegration.nextSync}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-base">Completion</CardTitle>
                      <CardDescription>Workflow progress for this platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        {[1, 2, 3, 4].map((s) => (
                          <span
                            key={s}
                            className={`w-10 h-2 rounded-full ${
                              s <= currentIntegration.completionStep ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Step {currentIntegration.completionStep} of 4 completed
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="mt-6 text-muted-foreground">Select a connected platform to view details.</div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Add Platforms</CardTitle>
          <CardDescription>Expand your talent sources.</CardDescription>
        </CardHeader>
        <CardContent>
          {disconnected.length === 0 ? (
            <div className="text-muted-foreground">All available platforms are connected.</div>
          ) : (
            <div className="space-y-3">
              {disconnected.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${p.color}`} />
                    {p.icon ? <p.icon className="w-4 h-4" /> : null}
                    <span className="font-medium">{p.name}</span>
                  </div>
                  <Button size="sm" onClick={onConnectClick}>
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function FiltersStep({
  platforms,
  selectedPlatformId,
  onSelectPlatform,
  integration,
}: {
  platforms: JobSource[]
  selectedPlatformId: number | null
  onSelectPlatform: (id: number) => void
  integration: PlatformIntegration | null
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" /> Select Platform
          </CardTitle>
          <CardDescription>Filters apply per platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlatformPills platforms={platforms} selectedPlatformId={selectedPlatformId} onSelectPlatform={onSelectPlatform} />
        </CardContent>
      </Card>

      <Card className="border-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Configure Filters</CardTitle>
          <CardDescription>Use guardrails to refine candidate intake.</CardDescription>
        </CardHeader>
        <CardContent>
          {!integration ? (
            <div className="text-muted-foreground">Select a connected platform to configure filters.</div>
          ) : (
            <div className="space-y-4">
              {integration.filters.map((f) => (
                <div key={f.id} className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{f.label}</p>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                    </div>
                    <Switch defaultChecked={f.type !== "exclude"} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${f.id}-value`}>Value</Label>
                      <Input id={`${f.id}-value`} defaultValue={f.value} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${f.id}-type`}>Type</Label>
                      <Input id={`${f.id}-type`} defaultValue={f.type} />
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Apply</Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <Button variant="outline">Reset</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function PreviewStep({
  platforms,
  selectedPlatformId,
  onSelectPlatform,
  integration,
  onPreview,
  onImport,
}: {
  platforms: JobSource[]
  selectedPlatformId: number | null
  onSelectPlatform: (id: number) => void
  integration: PlatformIntegration | null
  onPreview: (c: PlatformCandidate) => void
  onImport: (c: PlatformCandidate) => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Choose Platform
          </CardTitle>
          <CardDescription>Preview matched candidates.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlatformPills platforms={platforms} selectedPlatformId={selectedPlatformId} onSelectPlatform={onSelectPlatform} />
        </CardContent>
      </Card>

      <Card className="border-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Matched Candidates</CardTitle>
          <CardDescription>Review before import.</CardDescription>
        </CardHeader>
        <CardContent>
          {!integration ? (
            <div className="text-muted-foreground">Select a platform to preview candidates.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integration.candidates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.role}</TableCell>
                      <TableCell>{c.experience}</TableCell>
                      <TableCell className="text-muted-foreground">{c.location}</TableCell>
                      <TableCell>{c.availability}</TableCell>
                      <TableCell>
                        <Badge className="bg-primary/10 text-primary border-primary/20">{c.matchScore}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            c.status === "Ready"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : c.status === "Filtered"
                              ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                              : c.status === "Imported"
                              ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                              : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                          }
                        >
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => onPreview(c)}>
                            Preview
                          </Button>
                          <Button size="sm" onClick={() => onImport(c)}>Import</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ImportStep({
  platforms,
  selectedPlatformId,
  onSelectPlatform,
  integration,
}: {
  platforms: JobSource[]
  selectedPlatformId: number | null
  onSelectPlatform: (id: number) => void
  integration: PlatformIntegration | null
}) {
  const totalReady = integration?.candidates.filter((c) => c.status === "Ready").length ?? 0
  const totalFiltered = integration?.candidates.filter((c) => c.status === "Filtered").length ?? 0
  const totalNew = integration?.candidates.filter((c) => c.status === "New").length ?? 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" /> Select Platform
          </CardTitle>
          <CardDescription>Finalize import.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlatformPills platforms={platforms} selectedPlatformId={selectedPlatformId} onSelectPlatform={onSelectPlatform} />
        </CardContent>
      </Card>

      <Card className="border-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Import Summary</CardTitle>
          <CardDescription>Confirm the import and start syncing.</CardDescription>
        </CardHeader>
        <CardContent>
          {!integration ? (
            <div className="text-muted-foreground">Select a platform to view summary.</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Ready to Import</p>
                  <p className="text-2xl font-bold">{totalReady}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Needs Review</p>
                  <p className="text-2xl font-bold">{totalFiltered}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">New</p>
                  <p className="text-2xl font-bold">{totalNew}</p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <p className="font-medium">Sync Options</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="import-batch">Batch Size</Label>
                    <Input id="import-batch" defaultValue="25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="import-schedule">Schedule</Label>
                    <Input id="import-schedule" defaultValue="Immediate" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="import-notify">Notify Team</Label>
                    <div className="flex items-center gap-2 h-10">
                      <Switch defaultChecked />
                      <span className="text-sm text-muted-foreground">Email summary</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>
                  <Play className="w-4 h-4 mr-2" /> Start Import
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
