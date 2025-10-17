"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Clock,
  UserCheck,
  Briefcase,
  MessageSquare,
  FileText,
  Phone,
  Download,
  Eye,
  Users,
  Award,
  Heart,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react"

const timeline = [
  {
    id: 1,
    status: "Placed",
    title: "Position Confirmed",
    description: "You have been placed at Sunrise Care Home",
    date: "Today, 2:30 PM",
    icon: Briefcase,
    color: "text-primary",
    bgColor: "bg-primary/10",
    completed: true,
    details: "Start date: Next Monday. Orientation scheduled for 9:00 AM. Contact: Sarah Johnson, HR Manager.",
  },
  {
    id: 2,
    status: "Matched",
    title: "Client Match Found",
    description: "Matched with Sunrise Care Home - 95% compatibility",
    date: "Yesterday, 4:15 PM",
    icon: UserCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
    completed: true,
    details: "Facility specializes in geriatric care. 50-bed facility with modern equipment. Team of 15 caregivers.",
  },
  {
    id: 3,
    status: "Screening",
    title: "Background Check Complete",
    description: "All verifications passed successfully",
    date: "2 days ago",
    icon: CheckCircle2,
    color: "text-primary",
    bgColor: "bg-primary/10",
    completed: true,
    details: "Criminal background check, employment verification, and reference checks all cleared.",
  },
  {
    id: 4,
    status: "Applied",
    title: "Application Submitted",
    description: "Your profile was submitted for review",
    date: "5 days ago",
    icon: Clock,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    completed: true,
    details: "Application reviewed by AI matching system and forwarded to 3 potential employers.",
  },
]

const documents = [
  {
    id: 1,
    name: "Nursing License",
    type: "Certification",
    status: "Verified",
    uploadDate: "Jan 15, 2025",
    expiryDate: "Jan 15, 2027",
    verifiedBy: "CareLink AI System",
    fileSize: "2.4 MB",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    name: "CPR Certification",
    type: "Certification",
    status: "Verified",
    uploadDate: "Dec 10, 2024",
    expiryDate: "Dec 10, 2026",
    verifiedBy: "Red Cross",
    fileSize: "1.8 MB",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 3,
    name: "Background Check",
    type: "Legal",
    status: "Verified",
    uploadDate: "Jan 5, 2025",
    expiryDate: "Jan 5, 2026",
    verifiedBy: "National Bureau",
    fileSize: "856 KB",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 4,
    name: "TB Test Results",
    type: "Medical",
    status: "Verified",
    uploadDate: "Jan 8, 2025",
    expiryDate: "Jan 8, 2026",
    verifiedBy: "City Health Clinic",
    fileSize: "1.2 MB",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 5,
    name: "Hepatitis B Vaccination",
    type: "Medical",
    status: "Verified",
    uploadDate: "Nov 20, 2024",
    expiryDate: "Lifetime",
    verifiedBy: "City Health Clinic",
    fileSize: "945 KB",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 6,
    name: "Professional References",
    type: "Reference",
    status: "Verified",
    uploadDate: "Jan 3, 2025",
    expiryDate: "N/A",
    verifiedBy: "3 References Contacted",
    fileSize: "654 KB",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const matchedClients = [
  {
    id: 1,
    name: "Sunrise Care Home",
    type: "Facility",
    trustScore: 95,
    matchScore: 95,
    location: "Lagos, Nigeria",
    specialization: "Geriatric Care",
    status: "matched",
    image: "/care-facility.jpg",
  },
  {
    id: 2,
    name: "Mrs. Adeyemi",
    type: "Individual",
    trustScore: 92,
    matchScore: 88,
    location: "Ikoyi, Lagos",
    specialization: "Post-Surgery Care",
    status: "matched",
    image: "/elderly-woman.png",
  },
  {
    id: 3,
    name: "Wellness Center",
    type: "Facility",
    trustScore: 89,
    matchScore: 85,
    location: "Victoria Island, Lagos",
    specialization: "Rehabilitation",
    status: "rejected",
    image: "/wellness-center.jpg",
  },
]

const documentAssessments = [
  {
    id: 1,
    name: "Nursing License",
    type: "Certification",
    status: "Verified",
    uploadDate: "Jan 15, 2025",
    expiryDate: "Jan 15, 2027",
    verifiedBy: "CareLink AI System",
    fileSize: "2.4 MB",
    color: "text-primary",
    bgColor: "bg-primary/10",
    qualityScore: 98,
    authenticityScore: 99,
    complianceStatus: "Compliant",
    aiNotes: "Document verified through OCR and database cross-reference. All security features present.",
    riskLevel: "Low",
    recommendedAction: "Approved",
  },
  {
    id: 2,
    name: "CPR Certification",
    type: "Certification",
    status: "Verified",
    uploadDate: "Dec 10, 2024",
    expiryDate: "Dec 10, 2026",
    verifiedBy: "Red Cross",
    fileSize: "1.8 MB",
    color: "text-primary",
    bgColor: "bg-primary/10",
    qualityScore: 96,
    authenticityScore: 98,
    complianceStatus: "Compliant",
    aiNotes: "Valid Red Cross certification. Expiry date within acceptable range.",
    riskLevel: "Low",
    recommendedAction: "Approved",
  },
  {
    id: 3,
    name: "Background Check",
    type: "Legal",
    status: "Verified",
    uploadDate: "Jan 5, 2025",
    expiryDate: "Jan 5, 2026",
    verifiedBy: "National Bureau",
    fileSize: "856 KB",
    color: "text-primary",
    bgColor: "bg-primary/10",
    qualityScore: 94,
    authenticityScore: 97,
    complianceStatus: "Compliant",
    aiNotes: "Background check clear. No red flags detected.",
    riskLevel: "Low",
    recommendedAction: "Approved",
  },
  {
    id: 4,
    name: "TB Test Results",
    type: "Medical",
    status: "Verified",
    uploadDate: "Jan 8, 2025",
    expiryDate: "Jan 8, 2026",
    verifiedBy: "City Health Clinic",
    fileSize: "1.2 MB",
    color: "text-primary",
    bgColor: "bg-primary/10",
    qualityScore: 92,
    authenticityScore: 96,
    complianceStatus: "Compliant",
    aiNotes: "TB test negative. Medical document authenticated.",
    riskLevel: "Low",
    recommendedAction: "Approved",
  },
  {
    id: 5,
    name: "Hepatitis B Vaccination",
    type: "Medical",
    status: "Verified",
    uploadDate: "Nov 20, 2024",
    expiryDate: "Lifetime",
    verifiedBy: "City Health Clinic",
    fileSize: "945 KB",
    color: "text-primary",
    bgColor: "bg-primary/10",
    qualityScore: 95,
    authenticityScore: 99,
    complianceStatus: "Compliant",
    aiNotes: "Vaccination record verified. Lifetime immunity confirmed.",
    riskLevel: "Low",
    recommendedAction: "Approved",
  },
  {
    id: 6,
    name: "Professional References",
    type: "Reference",
    status: "Verified",
    uploadDate: "Jan 3, 2025",
    expiryDate: "N/A",
    verifiedBy: "3 References Contacted",
    fileSize: "654 KB",
    color: "text-primary",
    bgColor: "bg-primary/10",
    qualityScore: 91,
    authenticityScore: 95,
    complianceStatus: "Compliant",
    aiNotes: "All 3 references verified. Positive feedback received.",
    riskLevel: "Low",
    recommendedAction: "Approved",
  },
]

export default function CaregiverDashboard() {
  const [selectedItem, setSelectedItem] = useState<(typeof timeline)[0] | null>(null)
  const [showDocuments, setShowDocuments] = useState(false)
  const [selectedClient, setSelectedClient] = useState<(typeof matchedClients)[0] | null>(null)
  const [actionDialog, setActionDialog] = useState<{ open: boolean; action: string }>({
    open: false,
    action: "",
  })
  const [selectedAssessment, setSelectedAssessment] = useState<(typeof documentAssessments)[0] | null>(null)

  const handleAction = (action: string) => {
    if (action === "documents") {
      setShowDocuments(true)
      return
    }

    setActionDialog({ open: true, action })
    setTimeout(() => {
      setActionDialog({ open: false, action: "" })
    }, 2000)
  }

  const handleDownload = (docName: string) => {
    const button = document.activeElement as HTMLButtonElement
    if (button) {
      button.textContent = "Downloaded!"
      setTimeout(() => {
        button.innerHTML =
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>'
      }, 1500)
    }
  }

  const overallComplianceScore = Math.round(
    documentAssessments.reduce((sum, doc) => sum + doc.qualityScore, 0) / documentAssessments.length,
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Caregiver Dashboard</h1>
          <p className="text-muted-foreground">Track your applications, matches, and document status</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Match Score</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">98</div>
                <div className="text-sm text-muted-foreground">Trust Score</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Active Matches</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6/6</div>
                <div className="text-sm text-muted-foreground">Documents Verified</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger 
              value="timeline" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Timeline
            </TabsTrigger>
            <TabsTrigger 
              value="matches" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Matches
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="assessment" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Assessment
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Application Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-8">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                  {timeline.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative flex gap-6 animate-in fade-in slide-in-from-left group cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div
                        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${item.bgColor} ${item.color} shrink-0 transition-all duration-300 group-hover:scale-110`}
                      >
                        <item.icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                          {item.completed && <CheckCircle2 className="w-5 h-5 text-primary shrink-0 ml-4" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                        <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          Click for details →
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedClients.map((client, index) => (
                <Card
                  key={client.id}
                  className={`border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom ${
                    client.status === "rejected" ? "opacity-60" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={client.image || "/placeholder.svg"} alt={client.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Badge
                        className={
                          client.status === "matched" ? "bg-primary text-primary-foreground" : "bg-secondary text-white"
                        }
                      >
                        {client.status === "matched" ? "Matched" : "Rejected"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.type}</CardDescription>
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
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                              i < Math.round(client.trustScore / 20) ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4" />
                        {client.specialization}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {client.location}
                      </div>
                    </div>

                    {client.status === "matched" && (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => setSelectedClient(client)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="border-2">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{documents.length}</div>
                    <div className="text-xs text-muted-foreground">Total Documents</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {documents.filter((d) => d.status === "Verified").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Verified</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">100%</div>
                    <div className="text-xs text-muted-foreground">Compliance</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              {documents.map((doc, index) => (
                <Card
                  key={doc.id}
                  className="border-2 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${doc.bgColor} shrink-0`}>
                          <FileText className={`w-6 h-6 ${doc.color}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{doc.name}</h4>
                            <Badge className={`${doc.bgColor} ${doc.color} text-xs`}>{doc.status}</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Type:</span>
                              <span className="font-medium">{doc.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Size:</span>
                              <span className="font-medium">{doc.fileSize}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Uploaded:</span>
                              <span className="font-medium">{doc.uploadDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Expires:</span>
                              <span className="font-medium">{doc.expiryDate}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">Verified by {doc.verifiedBy}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 bg-transparent"
                          onClick={() => handleDownload(doc.name)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Need to add more documents?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload additional certifications or update existing ones
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">Upload Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            {/* Compliance Overview */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Document Compliance Assessment
                </CardTitle>
                <CardDescription>AI-powered verification and quality analysis of your documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Overall Compliance</span>
                      <span className="text-2xl font-bold text-primary">{overallComplianceScore}%</span>
                    </div>
                    <Progress value={overallComplianceScore} className="h-3" />
                    <p className="text-xs text-muted-foreground">All documents meet compliance standards</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Verified Documents</span>
                      <span className="text-2xl font-bold text-primary">{documentAssessments.length}/6</span>
                    </div>
                    <Progress value={100} className="h-3" />
                    <p className="text-xs text-muted-foreground">All documents verified</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Risk Assessment</span>
                      <Badge className="bg-primary/10 text-primary">Low Risk</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      No compliance issues detected
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Assessment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Document Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentAssessments.map((doc, index) => (
                  <Card
                    key={doc.id}
                    className="border-2 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50 animate-in fade-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedAssessment(doc)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-base">{doc.name}</CardTitle>
                          <CardDescription className="text-xs">{doc.type}</CardDescription>
                        </div>
                        <Badge className={`${doc.bgColor} ${doc.color} text-xs`}>{doc.status}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Quality Score</span>
                          <span className="font-semibold">{doc.qualityScore}%</span>
                        </div>
                        <Progress value={doc.qualityScore} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Authenticity</span>
                          <span className="font-semibold">{doc.authenticityScore}%</span>
                        </div>
                        <Progress value={doc.authenticityScore} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              doc.riskLevel === "Low" ? "bg-primary" : "bg-secondary"
                            }`}
                          />
                          <span className="text-xs text-muted-foreground">Risk: {doc.riskLevel}</span>
                        </div>
                        <Badge className="bg-primary/10 text-primary text-xs">{doc.recommendedAction}</Badge>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full text-xs border-primary/30 hover:bg-primary/10 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAssessment(doc)
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Compliance Recommendations */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Compliance Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">All documents verified</p>
                    <p className="text-xs text-muted-foreground">
                      Your profile is fully compliant and ready for placements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Renewal reminder</p>
                    <p className="text-xs text-muted-foreground">
                      CPR Certification expires Dec 10, 2026. Plan renewal 3 months prior
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>Answer questions to help AI match you with suitable clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">What is your preferred work environment?</label>
                  <div className="space-y-2">
                    {["Hospital", "Home Care", "Facility", "Mixed"].map((option) => (
                      <div
                        key={option}
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <input type="radio" id={option} name="environment" className="w-4 h-4" />
                        <label htmlFor={option} className="flex-1 cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Specializations</label>
                  <div className="space-y-2">
                    {["Geriatric Care", "Pediatric Care", "Post-Surgery", "Mental Health", "Rehabilitation"].map(
                      (spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                          <input type="checkbox" id={spec} className="w-4 h-4" />
                          <label htmlFor={spec} className="flex-1 cursor-pointer">
                            {spec}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Preferred shift times</label>
                  <div className="space-y-2">
                    {["Morning (6AM-2PM)", "Afternoon (2PM-10PM)", "Night (10PM-6AM)", "Flexible"].map((shift) => (
                      <div
                        key={shift}
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <input type="checkbox" id={shift} className="w-4 h-4" />
                        <label htmlFor={shift} className="flex-1 cursor-pointer">
                          {shift}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">Save Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button
            className="h-auto py-4 flex flex-col items-center gap-2 bg-primary hover:bg-primary/90"
            onClick={() => handleAction("contact")}
          >
            <MessageSquare className="w-6 h-6" />
            <span>Contact Recruiter</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 border-primary/30 hover:bg-primary/10 bg-transparent"
            onClick={() => handleAction("documents")}
          >
            <FileText className="w-6 h-6" />
            <span>View Documents</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 border-secondary/30 hover:bg-secondary/10 bg-transparent"
            onClick={() => handleAction("support")}
          >
            <Phone className="w-6 h-6" />
            <span>Get Support</span>
          </Button>
        </div>
      </div>

      {/* Timeline Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && <selectedItem.icon className={`w-6 h-6 ${selectedItem.color}`} />}
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription>{selectedItem?.description}</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-foreground">{selectedItem.details}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={selectedItem.bgColor + " " + selectedItem.color}>{selectedItem.status}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{selectedItem.date}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Client Detail Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Client Details</DialogTitle>
            <DialogDescription>Information about your matched client</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={selectedClient.image || "/placeholder.svg"} alt={selectedClient.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {selectedClient.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground">{selectedClient.name}</h3>
                  <p className="text-lg text-muted-foreground">{selectedClient.type}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-primary text-primary-foreground">{selectedClient.matchScore}% Match</Badge>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Zap className="w-4 h-4 fill-primary text-primary" />
                      {selectedClient.trustScore}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Location:</span> {selectedClient.location}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Specialization:</span> {selectedClient.specialization}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Heart className="w-4 h-4 mr-2" />
                  Apply to This Job
                </Button>
                <Button variant="outline" className="flex-1 border-primary/30 hover:bg-primary/10 bg-transparent">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedAssessment} onOpenChange={() => setSelectedAssessment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {selectedAssessment?.name}
            </DialogTitle>
            <DialogDescription>Detailed assessment and verification information</DialogDescription>
          </DialogHeader>
          {selectedAssessment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Document Type</p>
                  <p className="font-semibold text-foreground">{selectedAssessment.type}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className={`${selectedAssessment.bgColor} ${selectedAssessment.color}`}>
                    {selectedAssessment.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Upload Date</p>
                  <p className="font-semibold text-foreground">{selectedAssessment.uploadDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Expiry Date</p>
                  <p className="font-semibold text-foreground">{selectedAssessment.expiryDate}</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h4 className="font-semibold text-foreground">AI Assessment Scores</h4>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Quality Score</span>
                      <span className="text-lg font-bold text-primary">{selectedAssessment.qualityScore}%</span>
                    </div>
                    <Progress value={selectedAssessment.qualityScore} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Authenticity Score</span>
                      <span className="text-lg font-bold text-primary">{selectedAssessment.authenticityScore}%</span>
                    </div>
                    <Progress value={selectedAssessment.authenticityScore} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">Compliance & Risk</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Compliance Status</p>
                    <Badge className="bg-primary text-primary-foreground">{selectedAssessment.complianceStatus}</Badge>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                    <Badge className="bg-primary/10 text-primary">{selectedAssessment.riskLevel}</Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">AI Verification Notes</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedAssessment.aiNotes}</p>
              </div>

              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">Recommended Action</h4>
                <Badge className="bg-primary text-primary-foreground text-base py-2 px-3">
                  {selectedAssessment.recommendedAction}
                </Badge>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="flex-1 border-primary/30 hover:bg-primary/10 bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  View Document
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => !open && setActionDialog({ open: false, action: "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Request Sent
            </DialogTitle>
            <DialogDescription>
              {actionDialog.action === "contact" &&
                "Your message has been sent to your recruiter. They will respond within 24 hours."}
              {actionDialog.action === "support" &&
                "Support team notified. A representative will call you within 30 minutes."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
