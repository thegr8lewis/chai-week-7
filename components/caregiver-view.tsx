"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle2, Clock, UserCheck, Briefcase, MessageSquare, FileText, Phone, Download, Eye } from "lucide-react"

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
  {
    id: 7,
    name: "Resume/CV",
    type: "Profile",
    status: "Current",
    uploadDate: "Jan 1, 2025",
    expiryDate: "N/A",
    verifiedBy: "Self-uploaded",
    fileSize: "423 KB",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
]

export function CaregiverView() {
  const [selectedItem, setSelectedItem] = useState<(typeof timeline)[0] | null>(null)
  const [showDocuments, setShowDocuments] = useState(false)
  const [actionDialog, setActionDialog] = useState<{ open: boolean; action: string }>({
    open: false,
    action: "",
  })

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Application Progress</h3>
          <p className="text-muted-foreground">Track your journey to placement</p>
        </div>
        <Badge className="bg-primary text-primary-foreground px-4 py-2">
          <Briefcase className="w-4 h-4 mr-2" />
          Active Placement
        </Badge>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl">Your Timeline</CardTitle>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Days to Placement</div>
            </div>
          </CardContent>
        </Card>
      </div>

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

      <Dialog open={showDocuments} onOpenChange={setShowDocuments}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <FileText className="w-6 h-6 text-primary" />
              Document Portal
            </DialogTitle>
            <DialogDescription>All your credentials and certifications in one place</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-3 gap-4">
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
          </div>
        </DialogContent>
      </Dialog>

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
