"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LayoutDashboard, Link2, Users, Building2 } from "lucide-react"
import {
  availablePlatforms,
  applicantTrendData,
  applicants as initialApplicants,
  integrationWorkflowSteps,
  jobSources,
  platformIntegrations,
  recentActivityData,
  sourceDistributionData,
} from "./data"
import { Sidebar } from "./components/sidebar"
import { OverviewSection } from "./components/overview-section"
import { PlatformsSection } from "./components/platforms-section"
import { ApplicantsSection } from "./components/applicants-section"
import { ConnectPlatformDialog } from "./components/connect-platform-dialog"
import { ClientsSection } from "./components/clients-section"
import type { Candidate, SidebarItem } from "./types"

const sidebarItems: SidebarItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "platforms", label: "Job Platforms", icon: Link2 },
  { id: "applicants", label: "Applicants", icon: Users },
  { id: "clients", label: "Clients", icon: Building2 },
]

function RecruiterDashboardContent() {
  const router = useRouter()
  const search = useSearchParams()
  const [candidates, setCandidates] = useState(initialApplicants)
  const [filterSource, setFilterSource] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const initialSection = (search.get("section") as SidebarItem["id"]) || "overview"
  const [activeSection, setActiveSection] = useState<SidebarItem["id"]>(initialSection)

  // Keep URL in sync when section changes
  useEffect(() => {
    const current = search.get("section")
    if (current !== activeSection) {
      const params = new URLSearchParams(Array.from(search.entries()))
      params.set("section", activeSection)
      router.replace(`/dashboard/recruiter?${params.toString()}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection])

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSource = filterSource === "all" || candidate.source === filterSource
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSource && matchesSearch
  })

  const handleScheduleInterview = (candidateId: Candidate["id"]) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              status: "interview-scheduled",
              interviewDate: "Tuesday, Jan 28 at 10:00 AM",
            }
          : candidate,
      ),
    )
  }

  const handleSendOffer = (candidateId: Candidate["id"]) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              status: "offer-sent",
            }
          : candidate,
      ),
    )
  }

  const metrics = {
    totalApplicants: candidates.length,
    interviewsScheduled: candidates.filter((candidate) => candidate.status === "interview-scheduled").length,
    offersSent: candidates.filter((candidate) => candidate.status === "offer-sent").length,
    totalPlatforms: jobSources.length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="flex">
        <Sidebar items={sidebarItems} activeSection={activeSection} onSelect={setActiveSection} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {activeSection === "overview" && (
              <OverviewSection
                metrics={metrics}
                applicantTrendData={applicantTrendData}
                sourceDistributionData={sourceDistributionData}
                recentActivityData={recentActivityData}
              />
            )}

            {activeSection === "platforms" && (
              <PlatformsSection
                jobSources={jobSources}
                integrations={platformIntegrations}
                workflowSteps={integrationWorkflowSteps}
                availablePlatforms={availablePlatforms}
                onConnectClick={() => setShowConnectDialog(true)}
              />
            )}

            {activeSection === "applicants" && (
              <ApplicantsSection
                candidates={filteredCandidates}
                searchTerm={searchTerm}
                filterSource={filterSource}
                onSearchChange={setSearchTerm}
                onFilterChange={setFilterSource}
                onViewProfile={(candidate: Candidate) =>
                  router.push(`/dashboard/recruiter/candidate/${candidate.id}?from=applicants`)
                }
                onScheduleInterview={handleScheduleInterview}
                onSendOffer={handleSendOffer}
              />
            )}

            {activeSection === "clients" && (
              <ClientsSection
                onViewProfile={(id: number) => router.push(`/dashboard/recruiter/candidate/${id}?from=clients`)}
                onScheduleInterview={handleScheduleInterview}
                onSendOffer={handleSendOffer}
              />
            )}
          </div>
        </main>
      </div>

      <ConnectPlatformDialog
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
        platforms={availablePlatforms}
      />

      {/* CandidateProfileDialog removed: navigates to dedicated route now */}
    </div>
  )
}

export default function RecruiterDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    }>
      <RecruiterDashboardContent />
    </Suspense>
  )
}
