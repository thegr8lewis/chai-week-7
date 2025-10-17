"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecruiterView } from "@/components/recruiter-view"
import { CaregiverView } from "@/components/caregiver-view"
import { ClientView } from "@/components/client-view"
import { UserCircle, Heart, Building2 } from "lucide-react"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("recruiter")

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-auto p-1 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="recruiter"
            className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            <UserCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Recruiter</span>
          </TabsTrigger>
          <TabsTrigger
            value="caregiver"
            className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
          >
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Caregiver</span>
          </TabsTrigger>
          <TabsTrigger
            value="client"
            className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
          >
            <Building2 className="w-5 h-5" />
            <span className="hidden sm:inline">Client</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recruiter" className="mt-8 animate-in fade-in slide-in-from-bottom duration-500">
          <RecruiterView />
        </TabsContent>

        <TabsContent value="caregiver" className="mt-8 animate-in fade-in slide-in-from-bottom duration-500">
          <CaregiverView />
        </TabsContent>

        <TabsContent value="client" className="mt-8 animate-in fade-in slide-in-from-bottom duration-500">
          <ClientView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
