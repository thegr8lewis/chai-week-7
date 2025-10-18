"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Users,
  Star,
  MapPin,
  Award,
  Zap,
  MessageSquare,
  Video,
  Brain,
  AlertCircle,
  CheckCircle,
  FileText,
  Heart,
  Activity,
} from "lucide-react"

const matchedCaregivers = [
  {
    id: 1,
    name: "Amara Okafor",
    role: "Registered Nurse",
    location: "Lagos, Nigeria",
    trustScore: 98,
    matchScore: 95,
    skills: ["Pediatric Care", "Emergency Response", "Patient Education"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    experience: "8 years",
    availability: "Immediate",
    status: "matched",
  },
  {
    id: 2,
    name: "Kwame Mensah",
    role: "Physical Therapist",
    location: "Accra, Ghana",
    trustScore: 96,
    matchScore: 92,
    skills: ["Rehabilitation", "Sports Therapy", "Geriatric Care"],
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    experience: "6 years",
    availability: "2 weeks notice",
    status: "matched",
  },
  {
    id: 3,
    name: "Zainab Hassan",
    role: "Home Health Aide",
    location: "Nairobi, Kenya",
    trustScore: 94,
    matchScore: 89,
    skills: ["Personal Care", "Medication Management", "Companionship"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    experience: "5 years",
    availability: "Immediate",
    status: "matched",
  },
]

const currentCaregiver = {
  id: 100,
  name: "Fatima Adeyemi",
  role: "Senior Caregiver",
  location: "Nairobi, Kenya",
  trustScore: 96,
  rating: 4.8,
  skills: ["Geriatric Care", "Alzheimer's Care", "Medication Management", "Physical Therapy Support"],
  avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
  experience: "8 years in geriatric care",
  specialization: "Alzheimer's & Dementia Care",
  languages: "English, Swahili, Kikuyu",
  certifications: ["CPR Certified", "First Aid", "Dementia Care Specialist", "Nursing License"],
  daysWithYou: 47,
  totalHours: 376,
  responseTime: "< 5 min",
  about: "Dedicated caregiver with extensive experience in providing compassionate, person-centered care. Specializes in supporting individuals with memory care needs and creating meaningful daily routines.",
  startDate: "December 2024",
  status: "active",
}

const schedules = [
  {
    id: 1,
    caregiver: "Amara Okafor",
    date: "Monday, Jan 20",
    time: "6:00 AM - 2:00 PM",
    type: "Morning Shift",
    status: "confirmed",
  },
  {
    id: 2,
    caregiver: "Kwame Mensah",
    date: "Tuesday, Jan 21",
    time: "2:00 PM - 10:00 PM",
    type: "Afternoon Shift",
    status: "confirmed",
  },
  {
    id: 3,
    caregiver: "Zainab Hassan",
    date: "Wednesday, Jan 22",
    time: "10:00 PM - 6:00 AM",
    type: "Night Shift",
    status: "pending",
  },
]

const matchingAnalysis = [
  {
    id: 1,
    caregiver: "Amara Okafor",
    matchScore: 95,
    trustScore: 98,
    compatibilityFactors: [
      { factor: "Skills Match", score: 98, weight: "High" },
      { factor: "Experience Level", score: 96, weight: "High" },
      { factor: "Location Proximity", score: 92, weight: "Medium" },
      { factor: "Availability", score: 100, weight: "High" },
      { factor: "Communication Style", score: 94, weight: "Medium" },
      { factor: "Care Philosophy", score: 93, weight: "High" },
    ],
    aiInsights:
      "Excellent match based on your care requirements. Amara has extensive pediatric care experience and immediate availability. Her communication style aligns well with your preferences.",
    riskFactors: [],
    recommendedAction: "Highly Recommended",
  },
  {
    id: 2,
    caregiver: "Kwame Mensah",
    matchScore: 92,
    trustScore: 96,
    compatibilityFactors: [
      { factor: "Skills Match", score: 94, weight: "High" },
      { factor: "Experience Level", score: 92, weight: "High" },
      { factor: "Location Proximity", score: 85, weight: "Medium" },
      { factor: "Availability", score: 88, weight: "High" },
      { factor: "Communication Style", score: 91, weight: "Medium" },
      { factor: "Care Philosophy", score: 90, weight: "High" },
    ],
    aiInsights:
      "Strong match for rehabilitation and geriatric care needs. Kwame requires 2 weeks notice but has proven expertise in your care type.",
    riskFactors: ["Availability requires advance notice"],
    recommendedAction: "Recommended",
  },
  {
    id: 3,
    caregiver: "Zainab Hassan",
    matchScore: 89,
    trustScore: 94,
    compatibilityFactors: [
      { factor: "Skills Match", score: 88, weight: "High" },
      { factor: "Experience Level", score: 90, weight: "High" },
      { factor: "Location Proximity", score: 87, weight: "Medium" },
      { factor: "Availability", score: 100, weight: "High" },
      { factor: "Communication Style", score: 89, weight: "Medium" },
      { factor: "Care Philosophy", score: 85, weight: "High" },
    ],
    aiInsights:
      "Good match for personal care and companionship. Zainab has immediate availability and strong patient feedback.",
    riskFactors: [],
    recommendedAction: "Recommended",
  },
]

export default function ClientDashboard() {
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof matchedCaregivers)[0] | null>(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<(typeof schedules)[0] | null>(null)
  const [selectedMatching, setSelectedMatching] = useState<(typeof matchingAnalysis)[0] | null>(null)
  const [acceptedCaregivers, setAcceptedCaregivers] = useState<number[]>([])
  const [showRecruiterNotification, setShowRecruiterNotification] = useState(false)
  const [acceptedCaregiverName, setAcceptedCaregiverName] = useState("")
  const [requestFormData, setRequestFormData] = useState({
    careType: "",
    duration: "",
    startDate: "",
    shiftPreference: "",
    location: "",
    specialRequirements: "",
    budget: "",
    languagePreference: "",
  })

  const handleAcceptCaregiver = (caregiverId: number) => {
    if (!acceptedCaregivers.includes(caregiverId)) {
      setAcceptedCaregivers([...acceptedCaregivers, caregiverId])
      // Find the caregiver name
      const caregiver = matchingAnalysis.find((c) => c.id === caregiverId)
      if (caregiver) {
        setAcceptedCaregiverName(caregiver.caregiver)
        setShowRecruiterNotification(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your caregivers, schedule, and preferences</p>
        </div>

        {/* Key Metrics */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{matchedCaregivers.length}</div>
                <div className="text-sm text-muted-foreground">Matched Caregivers</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{schedules.length}</div>
                <div className="text-sm text-muted-foreground">Scheduled Shifts</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Avg Match Score</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">96</div>
                <div className="text-sm text-muted-foreground">Avg Trust Score</div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Tabs */}
        <Tabs defaultValue="caregivers" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger 
              value="caregivers" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Request Caregiver
            </TabsTrigger>
            <TabsTrigger 
              value="matching" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Caregivers
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
            >
              Preferences
            </TabsTrigger>
            
          </TabsList>

          {/* Caregivers Tab */}
          <TabsContent value="caregivers" className="space-y-6">
            <Card className="border-2 shadow-sm">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <FileText className="w-5 h-5 text-primary" />
                      Request a Caregiver
                    </CardTitle>
                    <CardDescription className="mt-1">Fill out the form to get matched with qualified caregivers</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Step 1 of 2</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Care Type */}
                    <div className="space-y-2">
                      <Label htmlFor="careType" className="text-sm font-medium flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                        Type of Care Needed <span className="text-destructive">*</span>
                      </Label>
                      <Select value={requestFormData.careType} onValueChange={(value) => setRequestFormData({ ...requestFormData, careType: value })}>
                        <SelectTrigger id="careType" className="border-2 border-primary/20 focus:border-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                          <SelectValue placeholder="Select care type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pediatric">Pediatric Care</SelectItem>
                          <SelectItem value="geriatric">Geriatric Care</SelectItem>
                          <SelectItem value="post-surgery">Post-Surgery Care</SelectItem>
                          <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                          <SelectItem value="palliative">Palliative Care</SelectItem>
                          <SelectItem value="companionship">Companionship</SelectItem>
                          <SelectItem value="medical">Medical Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-sm font-medium flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                        Expected Duration <span className="text-destructive">*</span>
                      </Label>
                      <Select value={requestFormData.duration} onValueChange={(value) => setRequestFormData({ ...requestFormData, duration: value })}>
                        <SelectTrigger id="duration" className="border-2 border-primary/20 focus:border-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="temporary">Temporary (1-4 weeks)</SelectItem>
                          <SelectItem value="short-term">Short-term (1-3 months)</SelectItem>
                          <SelectItem value="long-term">Long-term (3-12 months)</SelectItem>
                          <SelectItem value="permanent">Permanent (12+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Start Date */}
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                        Preferred Start Date <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="startDate" 
                        type="date" 
                        className="border-2 border-primary/20 focus:border-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                        value={requestFormData.startDate} 
                        onChange={(e) => setRequestFormData({ ...requestFormData, startDate: e.target.value })} 
                      />
                    </div>

                    {/* Shift Preference */}
                    <div className="space-y-2">
                      <Label htmlFor="shiftPreference" className="text-sm font-medium flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">4</span>
                        Shift Preference <span className="text-destructive">*</span>
                      </Label>
                      <Select value={requestFormData.shiftPreference} onValueChange={(value) => setRequestFormData({ ...requestFormData, shiftPreference: value })}>
                        <SelectTrigger id="shiftPreference" className="border-2 border-primary/20 focus:border-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                          <SelectValue placeholder="Select shift" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (6AM-2PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (2PM-10PM)</SelectItem>
                          <SelectItem value="night">Night (10PM-6AM)</SelectItem>
                          <SelectItem value="24-7">24/7 Care</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">5</span>
                        Location <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="location" 
                        placeholder="Enter city or address"
                        className="border-2 border-primary/20 focus:border-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                        value={requestFormData.location} 
                        onChange={(e) => setRequestFormData({ ...requestFormData, location: e.target.value })} 
                      />
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-sm font-medium flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">6</span>
                        Budget (per month) <span className="text-destructive">*</span>
                      </Label>
                      <Input 
                        id="budget" 
                        type="number" 
                        placeholder="Enter budget in USD"
                        className="border-2 border-primary/20 focus:border-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                        value={requestFormData.budget} 
                        onChange={(e) => setRequestFormData({ ...requestFormData, budget: e.target.value })} 
                      />
                    </div>

                    {/* Language Preference - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="languagePreference" className="text-sm font-medium flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold">7</span>
                        Language Preference <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <Input 
                        id="languagePreference" 
                        placeholder="e.g., English, Swahili, French"
                        className="border-2 border-secondary/20 focus:border-secondary bg-secondary/5 hover:bg-secondary/10 transition-colors"
                        value={requestFormData.languagePreference} 
                        onChange={(e) => setRequestFormData({ ...requestFormData, languagePreference: e.target.value })} 
                      />
                    </div>
                  </div>

                  {/* Special Requirements - Full Width */}
                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements" className="text-sm font-medium flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold">8</span>
                      Special Requirements or Medical Conditions <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Textarea 
                      id="specialRequirements" 
                      placeholder="Please describe any special requirements, medical conditions, or specific needs..." 
                      rows={4}
                      className="border-2 border-secondary/20 focus:border-secondary bg-secondary/5 hover:bg-secondary/10 transition-colors resize-none"
                      value={requestFormData.specialRequirements} 
                      onChange={(e) => setRequestFormData({ ...requestFormData, specialRequirements: e.target.value })} 
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" size="lg">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Submit Request
                    </Button>
                    <Button type="button" variant="outline" size="lg">
                      Save Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Quick Response</h4>
                      <p className="text-sm text-muted-foreground">Get AI-matched caregivers within 24 hours of your request</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Brain className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">AI Matching</h4>
                      <p className="text-sm text-muted-foreground">Our AI analyzes 50+ factors to find your perfect caregiver match</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Heart className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Verified Caregivers</h4>
                      <p className="text-sm text-muted-foreground">All caregivers are background-checked and certified professionals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Matching Tab */}
          <TabsContent value="matching" className="space-y-6">
            <Tabs defaultValue="recommendations" className="w-full">
              <div className="relative mb-8">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 bg-transparent p-2 rounded-2xl gap-3">
                  <TabsTrigger 
                    value="recommendations" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-xl transition-all duration-300 hover:scale-105 py-3 font-semibold border-2 data-[state=active]:border-primary data-[state=inactive]:border-muted"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Recommendations</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="current-caregiver" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-secondary/80 data-[state=active]:text-white data-[state=active]:shadow-xl rounded-xl transition-all duration-300 hover:scale-105 py-3 font-semibold border-2 data-[state=active]:border-secondary data-[state=inactive]:border-muted"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      <span>Current Caregiver</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* AI Recommendations Tab */}
              <TabsContent value="recommendations" className="space-y-6 mt-6">
                {/* Matching Overview */}
                <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI-Powered Matching Analysis
                </CardTitle>
                <CardDescription>Advanced algorithm analyzing compatibility across multiple factors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Matches Found</span>
                      <Badge className="bg-primary text-primary-foreground">{matchedCaregivers.length}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Based on your care requirements and preferences</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Avg Compatibility</span>
                      <span className="text-lg font-bold text-primary">92%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Across all matched caregivers</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Top Match</span>
                      <Badge className="bg-secondary text-white">Amara - 95%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Highest compatibility score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matching Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Detailed Matching Analysis</h3>
              <div className="grid grid-cols-1 gap-4">
                {matchingAnalysis.map((analysis, index) => (
                  <Card
                    key={analysis.id}
                    className="border hover:shadow-md transition-all duration-300 cursor-pointer hover:border-primary/40 animate-in fade-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedMatching(analysis)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 flex items-start gap-3">
                          <Avatar className="w-10 h-10 border-2 border-primary/20">
                            <AvatarImage
                              src={(matchedCaregivers.find((c) => c.name === analysis.caregiver)?.avatar) || "/placeholder.svg"}
                              alt={analysis.caregiver}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {analysis.caregiver.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{analysis.caregiver}</CardTitle>
                            <CardDescription className="text-xs">
                              {(matchedCaregivers.find((c) => c.name === analysis.caregiver)?.role) || "Caregiver"}
                              {" • "}
                              {(matchedCaregivers.find((c) => c.name === analysis.caregiver)?.location) || "Location N/A"}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase text-muted-foreground tracking-wide">Match</div>
                          <div className="text-2xl font-bold text-primary">{analysis.matchScore}%</div>
                          <Badge className="bg-primary/10 text-primary text-xs mt-1">{analysis.recommendedAction}</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground">Top Factors</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.compatibilityFactors.slice(0, 3).map((factor) => (
                            <span
                              key={factor.factor}
                              className="px-2 py-1 rounded-full border bg-muted text-foreground text-[11px]"
                              title={`${factor.factor}: ${factor.score}%`}
                            >
                              {factor.factor}: {factor.score}%
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        <span className="font-medium text-foreground">Insight: </span>
                        {analysis.aiInsights}
                      </p>

                      {analysis.riskFactors.length > 0 && (
                        <div className="flex items-start gap-2 p-2 bg-secondary/10 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                          <p className="text-xs text-secondary">{analysis.riskFactors[0]}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAcceptCaregiver(analysis.id)
                          }}
                          disabled={acceptedCaregivers.includes(analysis.id)}
                        >
                          {acceptedCaregivers.includes(analysis.id) ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accepted
                            </>
                          ) : (
                            "Accept Match"
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedMatching(analysis)
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Current Caregiver Tab */}
          <TabsContent value="current-caregiver" className="space-y-6 mt-6">
            <Card className="border-2">
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Your Current Caregiver
                </CardTitle>
                <CardDescription>View details, rate, and provide feedback for your caregiver</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Caregiver Profile Card */}
                  <div className="lg:col-span-1 space-y-4">
                    <Card className="border-2 border-primary/20">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <Avatar className="w-32 h-32 border-4 border-primary/20">
                            <AvatarImage src={currentCaregiver.avatar || "/placeholder.svg"} alt="Caregiver" />
                            <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                              {currentCaregiver.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-bold">{currentCaregiver.name}</h3>
                            <p className="text-sm text-muted-foreground">{currentCaregiver.role}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.round(currentCaregiver.rating) ? "fill-primary text-primary" : "text-muted"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-semibold">{currentCaregiver.rating}</span>
                          </div>
                          <Badge className="bg-primary text-primary-foreground">Active Care</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Quick Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-muted-foreground">Days with You</span>
                          <span className="font-semibold">{currentCaregiver.daysWithYou} days</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-muted-foreground">Total Hours</span>
                          <span className="font-semibold">{currentCaregiver.totalHours} hrs</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-muted-foreground">Response Time</span>
                          <span className="font-semibold">{currentCaregiver.responseTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Details and Rating Section */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Caregiver Details */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg">Caregiver Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Experience</p>
                            <p className="text-sm font-medium">{currentCaregiver.experience}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Location</p>
                            <p className="text-sm font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {currentCaregiver.location}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Specialization</p>
                            <p className="text-sm font-medium">{currentCaregiver.specialization}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Languages</p>
                            <p className="text-sm font-medium">{currentCaregiver.languages}</p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Certifications</p>
                          <div className="flex flex-wrap gap-2">
                            {currentCaregiver.certifications.map((cert) => (
                              <Badge key={cert} variant="outline" className="bg-primary/5">
                                <Award className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase">About</p>
                          <p className="text-sm text-muted-foreground">
                            {currentCaregiver.about}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Rating and Review Section */}
                    <Card className="border-2 border-primary/20">
                      <CardHeader className="bg-primary/5">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          Rate & Review Your Caregiver
                        </CardTitle>
                        <CardDescription>Your feedback helps us maintain quality care</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                        {/* Overall Rating */}
                        <div className="space-y-3">
                          <Label className="text-base font-semibold">Overall Rating</Label>
                          <div className="flex items-center gap-3">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                className="transition-transform hover:scale-110"
                                onClick={() => {}}
                              >
                                <Star
                                  className={`w-10 h-10 cursor-pointer ${
                                    rating <= 4 ? "fill-primary text-primary" : "text-muted hover:text-primary"
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="ml-2 text-2xl font-bold text-primary">4.0</span>
                          </div>
                        </div>

                        {/* Category Ratings */}
                        <div className="space-y-4">
                          <Label className="text-base font-semibold">Detailed Ratings</Label>
                          {[
                            { label: "Professionalism", value: 95 },
                            { label: "Communication", value: 90 },
                            { label: "Punctuality", value: 98 },
                            { label: "Care Quality", value: 92 },
                          ].map((item) => (
                            <div key={item.label} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{item.label}</span>
                                <span className="text-sm font-semibold text-primary">{item.value}%</span>
                              </div>
                              <Progress value={item.value} className="h-2" />
                            </div>
                          ))}
                        </div>

                        {/* Written Review */}
                        <div className="space-y-3">
                          <Label htmlFor="review" className="text-base font-semibold">Your Review</Label>
                          <Textarea
                            id="review"
                            placeholder="Share your experience with this caregiver..."
                            rows={5}
                            className="border-2 border-primary/20 focus:border-primary resize-none"
                          />
                        </div>

                        {/* Recommend Checkbox */}
                        <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                          <input
                            type="checkbox"
                            id="recommend"
                            className="w-5 h-5 rounded border-primary/30"
                            defaultChecked
                          />
                          <Label htmlFor="recommend" className="text-sm font-medium cursor-pointer">
                            I would recommend this caregiver to others
                          </Label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Button className="flex-1 bg-primary hover:bg-primary/90" size="lg">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Submit Review
                          </Button>
                          <Button variant="outline" size="lg">
                            Save Draft
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Schedule</CardTitle>
                <CardDescription>Upcoming shifts and caregiver assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedules.map((schedule, index) => (
                  <div
                    key={schedule.id}
                    className="p-4 border-2 rounded-lg hover:shadow-lg transition-all animate-in fade-in slide-in-from-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{schedule.caregiver}</h4>
                        <p className="text-sm text-muted-foreground">{schedule.type}</p>
                      </div>
                      <Badge
                        className={
                          schedule.status === "confirmed"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-white"
                        }
                      >
                        {schedule.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {schedule.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {schedule.time}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Join Meeting
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            {/* Header Info */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Care Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Help us understand your preferences to match you with the perfect caregiver. All questions are optional and can be updated anytime.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Question 1 - Care Types */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 1</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What types of care do you need?</CardTitle>
                  <CardDescription>Select all that apply to help us narrow down your search</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Geriatric Care", "Post-Surgery Care", "Rehabilitation", "Companionship", "Medical Care", "Dementia Care"].map((type) => (
                      <div key={type} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-primary/5 cursor-pointer transition-colors">
                        <input type="checkbox" id={`pref-${type}`} className="w-4 h-4" />
                        <label htmlFor={`pref-${type}`} className="flex-1 cursor-pointer text-sm font-medium">{type}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question 2 - Gender Preference */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 2</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">Do you have a gender preference for your caregiver?</CardTitle>
                  <CardDescription>This helps ensure comfort for everyone involved</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Choose preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                      <SelectItem value="male">Male Caregiver</SelectItem>
                      <SelectItem value="female">Female Caregiver</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Question 3 - Age Range */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 3</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What age range do you prefer for your caregiver?</CardTitle>
                  <CardDescription>Some clients prefer caregivers within a specific age range</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                      <SelectItem value="21-30">21-30 years</SelectItem>
                      <SelectItem value="31-40">31-40 years</SelectItem>
                      <SelectItem value="41-50">41-50 years</SelectItem>
                      <SelectItem value="51-plus">51+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Question 4 - Languages */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 4</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What languages should your caregiver speak?</CardTitle>
                  <CardDescription>List any languages you'd like your caregiver to be fluent in</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input 
                    placeholder="e.g., English, Swahili, French, Arabic" 
                    className="max-w-md"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Separate multiple languages with commas</p>
                </CardContent>
              </Card>

              {/* Question 5 - Shift Times */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 5</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What shift times do you prefer?</CardTitle>
                  <CardDescription>Select all time periods that work for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "morning", label: "Morning (6AM-2PM)" },
                      { value: "afternoon", label: "Afternoon (2PM-10PM)" },
                      { value: "night", label: "Night (10PM-6AM)" },
                      { value: "24-7", label: "24/7 Care" },
                    ].map((shift) => (
                      <div key={shift.value} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-primary/5 cursor-pointer transition-colors">
                        <input type="checkbox" id={`shift-${shift.value}`} className="w-4 h-4" />
                        <label htmlFor={`shift-${shift.value}`} className="flex-1 cursor-pointer text-sm font-medium">{shift.label}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question 6 - Days of Week */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 6</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">Which days of the week do you need care?</CardTitle>
                  <CardDescription>Select all days when you'll need caregiver support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-primary/5 cursor-pointer transition-colors">
                        <input type="checkbox" id={`day-${day}`} className="w-4 h-4" />
                        <label htmlFor={`day-${day}`} className="flex-1 cursor-pointer text-sm font-medium">{day}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question 7 - Certifications */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 7</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What certifications are required?</CardTitle>
                  <CardDescription>Select any professional certifications you need your caregiver to have</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "CPR Certified",
                      "First Aid Certified",
                      "Nursing License (RN/LPN)",
                      "Home Health Aide (HHA)",
                      "Physical Therapy Assistant",
                      "Dementia Care Specialist",
                    ].map((cert) => (
                      <div key={cert} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-primary/5 cursor-pointer transition-colors">
                        <input type="checkbox" id={`cert-${cert}`} className="w-4 h-4" />
                        <label htmlFor={`cert-${cert}`} className="flex-1 cursor-pointer text-sm font-medium">{cert}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question 8 - Experience Level */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 8</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What minimum experience level do you require?</CardTitle>
                  <CardDescription>Choose the experience level that makes you comfortable</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                      <SelectItem value="experienced">Experienced (6-10 years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Question 9 - Special Skills */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 9</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What special skills are needed?</CardTitle>
                  <CardDescription>Select specific skills required for your care needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Medication Management", "Wound Care", "Mobility Assistance", "Meal Preparation", "Physical Therapy", "Bathing & Hygiene"].map((skill) => (
                      <div key={skill} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-primary/5 cursor-pointer transition-colors">
                        <input type="checkbox" id={`skill-${skill}`} className="w-4 h-4" />
                        <label htmlFor={`skill-${skill}`} className="flex-1 cursor-pointer text-sm font-medium">{skill}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question 10 - Personality Traits */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 10</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">What personality traits do you value?</CardTitle>
                  <CardDescription>Select the characteristics that are important to you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Patient", "Energetic", "Calm", "Friendly", "Professional", "Compassionate"].map((trait) => (
                      <div key={trait} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-primary/5 cursor-pointer transition-colors">
                        <input type="checkbox" id={`trait-${trait}`} className="w-4 h-4" />
                        <label htmlFor={`trait-${trait}`} className="flex-1 cursor-pointer text-sm font-medium">{trait}</label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question 11 - Communication */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 11</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">How often would you like updates from your caregiver?</CardTitle>
                  <CardDescription>Set your preferred communication frequency</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Choose communication frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frequent">Frequent Updates - Multiple times daily</SelectItem>
                      <SelectItem value="daily">Daily Check-ins - Once per day</SelectItem>
                      <SelectItem value="as-needed">As Needed - Only when necessary</SelectItem>
                      <SelectItem value="minimal">Minimal Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Question 12 - Cultural Considerations */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 12</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">Any cultural or religious considerations?</CardTitle>
                  <CardDescription>Share any important cultural, religious, or dietary preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Example: Prefers Muslim caregiver, requires halal meals, needs prayer time accommodation..." 
                    rows={4}
                    className="max-w-2xl"
                  />
                </CardContent>
              </Card>

              {/* Question 13 - Additional Notes */}
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground">Question 13</Badge>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <CardTitle className="text-base">Anything else we should know?</CardTitle>
                  <CardDescription>Add any other requirements, allergies, or important information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Example: Patient has severe allergies to pets, prefers quiet caregivers, needs someone who can drive..." 
                    rows={4}
                    className="max-w-2xl"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Save Button */}
            <Card className="border-2 bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-lg">Save Your Preferences</h4>
                      <p className="text-sm text-muted-foreground">
                        These preferences will help our AI find the best caregiver matches for you. You can update them anytime.
                      </p>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 shrink-0" size="lg">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Save All Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          
        </Tabs>
      </div>

      {/* Caregiver Profile Dialog */}
      <Dialog open={!!selectedCaregiver} onOpenChange={() => setSelectedCaregiver(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Caregiver Profile</DialogTitle>
            <DialogDescription>Complete information about your matched caregiver</DialogDescription>
          </DialogHeader>
          {selectedCaregiver && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={selectedCaregiver.avatar || "/placeholder.svg"} alt={selectedCaregiver.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {selectedCaregiver.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground">{selectedCaregiver.name}</h3>
                  <p className="text-lg text-muted-foreground">{selectedCaregiver.role}</p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <Badge className="bg-primary text-primary-foreground">{selectedCaregiver.matchScore}% Match</Badge>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Zap className="w-4 h-4 fill-primary text-primary" />
                      {selectedCaregiver.trustScore}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{selectedCaregiver.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{selectedCaregiver.experience}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Availability:</span> {selectedCaregiver.availability}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaregiver.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Video className="w-4 h-4 mr-2" />
                  Join Meeting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Matching Analysis Dialog */}
      <Dialog open={!!selectedMatching} onOpenChange={() => setSelectedMatching(null)}>
        <DialogContent className="max-w-[90rem] w-[150vw] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Matching Analysis: {selectedMatching?.caregiver}
            </DialogTitle>
            <DialogDescription>Detailed AI-powered compatibility assessment</DialogDescription>
          </DialogHeader>
          {selectedMatching && (
            <div className="space-y-6">
              {/* Caregiver Summary */}
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
                <div>
                  <div className="font-semibold text-foreground">{selectedMatching.caregiver}</div>
                  <div className="text-xs text-muted-foreground">
                    {(matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.role) || "Caregiver"}
                    {" • "}
                    {(matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.location) || "Location N/A"}
                  </div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-1">Match Score (%)</p>
                  <div className="text-3xl font-bold text-primary">{selectedMatching.matchScore}%</div>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                  <p className="text-xs text-muted-foreground mb-1">Trust Score (0–100)</p>
                  <div className="text-3xl font-bold text-secondary">{selectedMatching.trustScore}</div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-muted">
                  <p className="text-xs text-muted-foreground mb-1">Recommendation</p>
                  <Badge className="bg-primary/10 text-primary text-sm py-1 px-2">{selectedMatching.recommendedAction}</Badge>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Role</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.role || "—"}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.location || "—"}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Experience</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.experience || "—"}
                  </p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-[11px] text-muted-foreground">Availability</p>
                  <p className="text-sm font-semibold text-foreground">
                    {matchedCaregivers.find((c) => c.name === selectedMatching.caregiver)?.availability || "—"}
                  </p>
                </div>
              </div>

              {/* Compatibility Factors */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Compatibility Factors</h4>
                <div className="space-y-2">
                  {selectedMatching.compatibilityFactors.map((factor) => (
                    <div key={factor.factor} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">{factor.factor}</span>
                          <Badge className="text-xs bg-muted text-muted-foreground">{factor.weight}</Badge>
                        </div>
                        <span className="text-sm font-bold text-primary">{factor.score}%</span>
                      </div>
                      <Progress value={factor.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Considerations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Top Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMatching.compatibilityFactors
                      .slice()
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 3)
                      .map((factor) => (
                        <Badge key={factor.factor} className="bg-primary/10 text-primary">
                          {factor.factor} • {factor.score}%
                        </Badge>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Considerations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMatching.compatibilityFactors
                      .slice()
                      .sort((a, b) => a.score - b.score)
                      .slice(0, 2)
                      .map((factor) => (
                        <Badge key={factor.factor} className="bg-secondary/10 text-secondary">
                          {factor.factor} • {factor.score}%
                        </Badge>
                      ))}
                    {selectedMatching.riskFactors.length > 0 && (
                      <Badge className="bg-secondary/10 text-secondary">
                        {selectedMatching.riskFactors[0]}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-foreground">AI Insights</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedMatching.aiInsights}</p>
              </div>

              {/* Risk Factors */}
              {selectedMatching.riskFactors.length > 0 && (
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-secondary" />
                    Risk Factors
                  </h4>
                  <div className="space-y-2">
                    {selectedMatching.riskFactors.map((risk, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-secondary/10 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <p className="text-sm text-secondary">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule Interview</DialogTitle>
            <DialogDescription>Set up an interview with your matched caregiver</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Select Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Select Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Interview Type</label>
              <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Video Call</option>
                <option>Phone Call</option>
                <option>In-Person</option>
              </select>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">Confirm Interview</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recruiter Notification Dialog */}
      <Dialog open={showRecruiterNotification} onOpenChange={setShowRecruiterNotification}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="w-8 h-8 text-primary" />
              Match Accepted!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Recruiter Notified</h3>
                <p className="text-sm text-muted-foreground">
                  Our recruitment team has been notified about your interest in <span className="font-semibold text-foreground">{acceptedCaregiverName}</span>.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">What happens next?</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Background verification in progress</li>
                    <li>• Interview will be scheduled within 24 hours</li>
                    <li>• You'll receive email and SMS notifications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => setShowRecruiterNotification(false)}
              >
                Got it!
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowRecruiterNotification(false)
                  setShowScheduleDialog(true)
                }}
              >
                Schedule Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
