"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  MapPin,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  Award,
  Heart,
  Filter,
  FileText,
  ExternalLink,
  TrendingUp,
  Link2,
  Users,
  Plus,
  UserCheck,
  Clock,
  Send,
  ArrowUpRight,
  LayoutDashboard,
  Layers,
  UserCircle,
  Settings,
} from "lucide-react"
import {
  IndeedIcon,
  LinkedInIcon,
  ZipRecruiterIcon,
  MonsterIcon,
  GlassdoorIcon,
  Scan123Icon,
  WellskyIcon,
} from "@/components/platform-icons"

const jobSources = [
  { id: 1, name: "Indeed", icon: IndeedIcon, connected: true, applicants: 24, color: "bg-blue-500" },
  { id: 2, name: "Scan123", icon: Scan123Icon, connected: true, applicants: 18, color: "bg-purple-500" },
  { id: 3, name: "Wellsky", icon: WellskyIcon, connected: true, applicants: 12, color: "bg-teal-500" },
]

const availablePlatforms = [
  { id: 4, name: "LinkedIn", icon: LinkedInIcon, color: "bg-blue-600" },
  { id: 5, name: "ZipRecruiter", icon: ZipRecruiterIcon, color: "bg-green-500" },
  { id: 6, name: "Monster", icon: MonsterIcon, color: "bg-purple-600" },
  { id: 7, name: "Glassdoor", icon: GlassdoorIcon, color: "bg-emerald-500" },
]

// Chart Data
const applicantTrendData = [
  { month: "Jan", applicants: 45, interviews: 12, offers: 8 },
  { month: "Feb", applicants: 52, interviews: 15, offers: 10 },
  { month: "Mar", applicants: 48, interviews: 14, offers: 9 },
  { month: "Apr", applicants: 61, interviews: 18, offers: 12 },
  { month: "May", applicants: 55, interviews: 16, offers: 11 },
  { month: "Jun", applicants: 67, interviews: 20, offers: 15 },
]

const sourceDistributionData = [
  { name: "Indeed", value: 45, color: "#3b82f6" },
  { name: "Scan123", value: 30, color: "#a855f7" },
  { name: "Wellsky", value: 25, color: "#14b8a6" },
]

const recentActivityData = [
  { id: 1, candidate: "Amara Okafor", action: "Interview Scheduled", date: "2024-01-15", status: "Pending" },
  { id: 2, candidate: "Kwame Mensah", action: "Application Received", date: "2024-01-14", status: "New" },
  { id: 3, candidate: "Zainab Hassan", action: "Offer Sent", date: "2024-01-13", status: "Awaiting Response" },
  { id: 4, candidate: "John Doe", action: "Profile Reviewed", date: "2024-01-12", status: "In Progress" },
  { id: 5, candidate: "Jane Smith", action: "Background Check", date: "2024-01-11", status: "Verified" },
]

const applicants = [
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
    status: "available" as "available" | "interview-scheduled" | "offer-sent",
    interviewDate: null as string | null,
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
    status: "available" as "available" | "interview-scheduled" | "offer-sent",
    interviewDate: null as string | null,
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
    status: "available" as "available" | "interview-scheduled" | "offer-sent",
    interviewDate: null as string | null,
    source: "Wellsky",
    documents: [
      { name: "License", status: "verified" },
      { name: "Background Check", status: "verified" },
      { name: "References", status: "pending" },
    ],
  },
]

export default function RecruiterDashboard() {
  const [candidates, setCandidates] = useState(applicants)
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof candidates)[0] | null>(null)
  const [filterSource, setFilterSource] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  const filteredCandidates = candidates.filter((c) => {
    const matchesSource = filterSource === "all" || c.source === filterSource
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.role.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSource && matchesSearch
  })

  const handleScheduleInterview = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              status: "interview-scheduled",
              interviewDate: "Tuesday, Jan 28 at 10:00 AM",
            }
          : c,
      ),
    )
    setSelectedCandidate(null)
  }

  const handleSendOffer = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? {
              ...c,
              status: "offer-sent",
            }
          : c,
      ),
    )
    setSelectedCandidate(null)
  }

  const totalApplicants = candidates.length
  const interviewsScheduled = candidates.filter(c => c.status === "interview-scheduled").length
  const offersSent = candidates.filter(c => c.status === "offer-sent").length
  const totalPlatforms = jobSources.length

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "platforms", label: "Job Platforms", icon: Link2 },
    { id: "applicants", label: "Applicants", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border sticky top-0 hidden lg:block">
          <div className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Navigation</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>
            
            <div className="mt-8 pt-8 border-t border-border">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-all">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {/* Overview View */}
            {activeSection === "overview" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <LayoutDashboard className="w-10 h-10 text-primary" />
                    Overview
                  </h1>
                  <p className="text-muted-foreground">Your recruitment metrics at a glance</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{totalApplicants}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    +12% from last week
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interviews Scheduled</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{interviewsScheduled}</p>
                  <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {interviewsScheduled} this week
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Offers Sent</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{offersSent}</p>
                  <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                    <Send className="w-3 h-3" />
                    Awaiting responses
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Connected Platforms</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{totalPlatforms}</p>
                  <p className="text-xs text-teal-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    All active
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  {/* Applicant Trends Chart */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Applicant Trends
                      </CardTitle>
                      <CardDescription>Monthly applicant flow over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={applicantTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="applicants" stroke="#3b82f6" strokeWidth={2} name="Applicants" />
                          <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} name="Interviews" />
                          <Line type="monotone" dataKey="offers" stroke="#f59e0b" strokeWidth={2} name="Offers" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Source Distribution Chart */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        Applicant Sources
                      </CardTitle>
                      <CardDescription>Distribution of applicants by platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={sourceDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {sourceDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Metrics Bar Chart */}
                <Card className="border-2 mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Recruitment Performance
                    </CardTitle>
                    <CardDescription>Monthly recruitment metrics comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={applicantTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="applicants" fill="#3b82f6" name="Applicants" />
                        <Bar dataKey="interviews" fill="#10b981" name="Interviews" />
                        <Bar dataKey="offers" fill="#f59e0b" name="Offers" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Recent Activity Table */}
                <Card className="border-2 mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Latest recruitment activities and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentActivityData.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell className="font-medium">{activity.candidate}</TableCell>
                            <TableCell>{activity.action}</TableCell>
                            <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  activity.status === "New"
                                    ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                    : activity.status === "Pending"
                                    ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                    : activity.status === "Verified"
                                    ? "bg-green-500/10 text-green-600 border-green-500/20"
                                    : "bg-purple-500/10 text-purple-600 border-purple-500/20"
                                }
                              >
                                {activity.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Job Platforms View */}
            {activeSection === "platforms" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <Link2 className="w-10 h-10 text-primary" />
                    Job Platforms
                  </h1>
                  <p className="text-muted-foreground">Manage your job listing integrations</p>
                </div>

                <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-primary" />
                  Connected Job Platforms
                </CardTitle>
                <CardDescription>Manage your job listing integrations</CardDescription>
              </div>
              <Button
                onClick={() => setShowConnectDialog(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Connect New Platform
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jobSources.map((source) => {
                const IconComponent = source.icon
                return (
                  <Card key={source.id} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${source.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{source.name}</h3>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mt-1">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Applicants</span>
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {source.applicants}
                        </span>
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        View Source
                      </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
                </Card>
              </div>
            )}

            {/* Applicants View */}
            {activeSection === "applicants" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <Users className="w-10 h-10 text-primary" />
                    Applicants
                  </h1>
                  <p className="text-muted-foreground">Manage candidates and applications</p>
                </div>

                {/* Filters and Search */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterSource} onValueChange={setFilterSource}>
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

                {/* Applicants Grid */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-foreground">All Candidates</h3>
                    <Badge className="bg-primary/10 text-primary">{filteredCandidates.length}</Badge>
                  </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate, index) => (
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
                          .map((n) => n[0])
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
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      View Full Profile
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 bg-transparent disabled:opacity-50"
                        onClick={() => handleScheduleInterview(candidate.id)}
                        disabled={candidate.status !== "available"}
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Interview
                      </Button>
                      <Button
                        variant="outline"
                        className="border-secondary/30 hover:bg-secondary/10 bg-transparent disabled:opacity-50"
                        onClick={() => handleSendOffer(candidate.id)}
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
            )}
          </div>
        </main>
      </div>

      {/* Connect New Platform Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Plus className="w-6 h-6 text-primary" />
              Connect New Job Platform
            </DialogTitle>
            <DialogDescription>
              Expand your reach by connecting to additional job listing platforms
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {availablePlatforms.map((platform) => {
              const IconComponent = platform.icon
              return (
                <Card key={platform.id} className="border-2 hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-14 h-14 ${platform.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">{platform.name}</h4>
                      <p className="text-sm text-muted-foreground">Job Board</p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    <Link2 className="w-4 h-4 mr-2" />
                    Connect
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Candidate Profile</DialogTitle>
            <DialogDescription>Complete information and credentials</DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} alt={selectedCandidate.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {selectedCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground">{selectedCandidate.name}</h3>
                  <p className="text-lg text-muted-foreground">{selectedCandidate.role}</p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <Badge className="bg-primary text-primary-foreground">{selectedCandidate.matchScore}% Match</Badge>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      {selectedCandidate.trustScore}
                    </div>
                    <Badge className="bg-muted text-muted-foreground">{selectedCandidate.source}</Badge>
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
                        <span className="text-muted-foreground">{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{selectedCandidate.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-semibold">Experience:</span> {selectedCandidate.experience}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Availability:</span> {selectedCandidate.availability}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Languages:</span> {selectedCandidate.languages.join(", ")}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-3">
                  {selectedCandidate.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                      <Badge
                        className={
                          doc.status === "verified"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="skills" className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill) => (
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
                      {selectedCandidate.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="border-primary/30">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
                  onClick={() => handleScheduleInterview(selectedCandidate.id)}
                  disabled={selectedCandidate.status !== "available"}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {selectedCandidate.status === "interview-scheduled" ? "Interview Scheduled" : "Schedule Interview"}
                </Button>
                <Button
                  className="flex-1 bg-secondary hover:bg-secondary/90 disabled:opacity-50"
                  onClick={() => handleSendOffer(selectedCandidate.id)}
                  disabled={selectedCandidate.status === "offer-sent"}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {selectedCandidate.status === "offer-sent" ? "Offer Sent" : "Send Offer"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
