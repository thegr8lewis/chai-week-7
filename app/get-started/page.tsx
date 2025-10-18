"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Briefcase } from "lucide-react"
import Link from "next/link"

export default function GetStarted() {
  const roles = [
    {
      type: "recruiter",
      title: "Recruiter",
      description: "Connect caregivers with opportunities and manage placements",
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      features: [
        "Post job opportunities",
        "Review caregiver applications",
        "Manage placements and contracts",
        "Access analytics and insights",
      ],
    },
    {
      type: "caregiver",
      title: "Caregiver",
      description: "Find meaningful work and build your healthcare career",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      features: [
        "Browse job opportunities",
        "Upload certifications",
        "Track application status",
        "Build your professional profile",
      ],
    },
    {
      type: "client",
      title: "Client / Facility",
      description: "Find qualified caregivers for your needs",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      features: [
        "Search for caregivers",
        "Review qualifications",
        "Schedule interviews",
        "Manage care teams",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the option that best describes you to get started with NannyCare
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon
            return (
              <Card
                key={role.type}
                className={`border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${role.bgColor} animate-in fade-in slide-in-from-bottom`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${role.color} mt-1.5 shrink-0`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/login?role=${role.type}`} className="block">
                    <Button
                      className={`w-full bg-gradient-to-br ${role.color} hover:shadow-lg text-white transition-all duration-300`}
                    >
                      Continue as {role.title}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
