"use client"

import { useState } from "react"
import { LayoutDashboard, Link2, Users } from "lucide-react"
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
import { CandidateProfileDialog } from "./components/candidate-profile-dialog"
import type { Candidate, SidebarItem } from "./types"

const sidebarItems: SidebarItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "platforms", label: "Job Platforms", icon: Link2 },
  { id: "applicants", label: "Applicants", icon: Users },
]

export default function RecruiterDashboard() {
  const [candidates, setCandidates] = useState(initialApplicants)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [filterSource, setFilterSource] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [activeSection, setActiveSection] = useState<SidebarItem["id"]>("overview")

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
    setSelectedCandidate(null)
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
    setSelectedCandidate(null)
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
                onViewProfile={setSelectedCandidate}
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

      <CandidateProfileDialog
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onScheduleInterview={handleScheduleInterview}
        onSendOffer={handleSendOffer}
      />
    </div>
  )
}
