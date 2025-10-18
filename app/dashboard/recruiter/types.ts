import type { ComponentType } from "react"

export type IconComponent = ComponentType<{ className?: string }>

export type CandidateStatus = "available" | "interview-scheduled" | "offer-sent"

export type CandidateDocumentStatus = "verified" | "pending"

export interface CandidateDocument {
  name: string
  status: CandidateDocumentStatus
}

export interface Candidate {
  id: number
  name: string
  role: string
  location: string
  trustScore: number
  skills: string[]
  allergySafe: boolean
  matchScore: number
  avatar: string
  phone: string
  email: string
  experience: string
  certifications: string[]
  languages: string[]
  availability: string
  status: CandidateStatus
  interviewDate: string | null
  source: string
  documents: CandidateDocument[]
}

export interface JobSource {
  id: number
  name: string
  icon: IconComponent
  connected: boolean
  applicants: number
  color: string
}

export interface AvailablePlatform {
  id: number
  name: string
  icon: IconComponent
  color: string
}

export interface ApplicantTrendDatum {
  month: string
  applicants: number
  interviews: number
  offers: number
}

export interface SourceDistributionDatum {
  name: string
  value: number
  color: string
}

export type RecentActivityStatus = "New" | "Pending" | "Verified" | "Awaiting Response" | "In Progress"

export interface RecentActivity {
  id: number
  candidate: string
  action: string
  date: string
  status: RecentActivityStatus
}

export interface SidebarItem {
  id: string
  label: string
  icon: IconComponent
}

export type CandidatePipelineStatus = "New" | "Filtered" | "Ready" | "Imported"

export interface PlatformCandidate {
  id: number
  name: string
  role: string
  experience: string
  location: string
  specialty: string
  availability: string
  matchScore: number
  status: CandidatePipelineStatus
}

export type PlatformFilterType = "include" | "exclude" | "limit"

export interface PlatformFilterRule {
  id: string
  label: string
  description: string
  type: PlatformFilterType
  value: string
}

export interface PlatformIntegration {
  platformId: JobSource["id"]
  lastSync: string
  nextSync: string
  completionStep: number
  filters: PlatformFilterRule[]
  candidates: PlatformCandidate[]
}

export interface IntegrationWorkflowStep {
  id: number
  title: string
  description: string
}
