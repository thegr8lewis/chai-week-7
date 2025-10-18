import {
  IndeedIcon,
  LinkedInIcon,
  ZipRecruiterIcon,
  MonsterIcon,
  GlassdoorIcon,
  Scan123Icon,
  WellskyIcon,
} from "@/components/platform-icons"
import type {
  AvailablePlatform,
  ApplicantTrendDatum,
  Candidate,
  JobSource,
  RecentActivity,
  SourceDistributionDatum,
} from "./types"

export const jobSources: JobSource[] = [
  { id: 1, name: "Indeed", icon: IndeedIcon, connected: true, applicants: 24, color: "bg-blue-500" },
  { id: 2, name: "Scan123", icon: Scan123Icon, connected: true, applicants: 18, color: "bg-purple-500" },
  { id: 3, name: "Wellsky", icon: WellskyIcon, connected: true, applicants: 12, color: "bg-teal-500" },
]

export const availablePlatforms: AvailablePlatform[] = [
  { id: 4, name: "LinkedIn", icon: LinkedInIcon, color: "bg-blue-600" },
  { id: 5, name: "ZipRecruiter", icon: ZipRecruiterIcon, color: "bg-green-500" },
  { id: 6, name: "Monster", icon: MonsterIcon, color: "bg-purple-600" },
  { id: 7, name: "Glassdoor", icon: GlassdoorIcon, color: "bg-emerald-500" },
]

export const applicantTrendData: ApplicantTrendDatum[] = [
  { month: "Jan", applicants: 45, interviews: 12, offers: 8 },
  { month: "Feb", applicants: 52, interviews: 15, offers: 10 },
  { month: "Mar", applicants: 48, interviews: 14, offers: 9 },
  { month: "Apr", applicants: 61, interviews: 18, offers: 12 },
  { month: "May", applicants: 55, interviews: 16, offers: 11 },
  { month: "Jun", applicants: 67, interviews: 20, offers: 15 },
]

export const sourceDistributionData: SourceDistributionDatum[] = [
  { name: "Indeed", value: 45, color: "#3b82f6" },
  { name: "Scan123", value: 30, color: "#a855f7" },
  { name: "Wellsky", value: 25, color: "#14b8a6" },
]

export const recentActivityData: RecentActivity[] = [
  { id: 1, candidate: "Amara Okafor", action: "Interview Scheduled", date: "2024-01-15", status: "Pending" },
  { id: 2, candidate: "Kwame Mensah", action: "Application Received", date: "2024-01-14", status: "New" },
  { id: 3, candidate: "Zainab Hassan", action: "Offer Sent", date: "2024-01-13", status: "Awaiting Response" },
  { id: 4, candidate: "John Doe", action: "Profile Reviewed", date: "2024-01-12", status: "In Progress" },
  { id: 5, candidate: "Jane Smith", action: "Background Check", date: "2024-01-11", status: "Verified" },
]

export const applicants: Candidate[] = [
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
    status: "available",
    interviewDate: null,
    source: "Indeed",
    documents: [
      { name: "License", status: "verified" },
      { name: "Background Check", status: "verified" },
      { name: "References", status: "verified" },
    ],
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
    status: "available",
    interviewDate: null,
    source: "Scan123",
    documents: [
      { name: "License", status: "verified" },
      { name: "Background Check", status: "pending" },
      { name: "References", status: "verified" },
    ],
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
    status: "available",
    interviewDate: null,
    source: "Wellsky",
    documents: [
      { name: "License", status: "verified" },
      { name: "Background Check", status: "verified" },
      { name: "References", status: "pending" },
    ],
  },
]
