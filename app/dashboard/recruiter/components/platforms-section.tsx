"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Link2, Plus, Users } from "lucide-react"
import type { JobSource } from "../types"

interface PlatformsSectionProps {
  jobSources: JobSource[]
  onConnectClick: () => void
}

export function PlatformsSection({ jobSources, onConnectClick }: PlatformsSectionProps) {
  return (
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
            <Button onClick={onConnectClick} className="bg-primary hover:bg-primary/90">
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
                          {source.connected && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mt-1">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          )}
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
  )
}
