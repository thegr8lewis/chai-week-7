"use client"

import { ArrowRight, CheckCircle2, Sparkles, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export function HowItWorks() {
  const flows = [
    {
      user: "Recruiter Journey",
      color: "primary",
      steps: [
        { icon: Users, title: "Post Job Opening", desc: "Create detailed job requirements" },
        { icon: Sparkles, title: "AI Matches Candidates", desc: "Smart algorithm finds best fits" },
        { icon: Calendar, title: "Schedule Interviews", desc: "Coordinate with top candidates" },
        { icon: CheckCircle2, title: "Send Offers", desc: "Place caregivers with clients" },
      ],
    },
    {
      user: "Caregiver Journey",
      color: "secondary",
      steps: [
        { icon: Users, title: "Create Profile", desc: "Upload credentials & certifications" },
        { icon: Sparkles, title: "Get Matched", desc: "AI finds opportunities for you" },
        { icon: Calendar, title: "Interview & Screen", desc: "Connect with recruiters" },
        { icon: CheckCircle2, title: "Get Placed", desc: "Start your new position" },
      ],
    },
    {
      user: "Client Journey",
      color: "accent",
      steps: [
        { icon: Users, title: "Request Staff", desc: "Specify your staffing needs" },
        { icon: Sparkles, title: "Review Matches", desc: "See verified caregiver profiles" },
        { icon: Calendar, title: "Schedule Coverage", desc: "Manage shifts & availability" },
        { icon: CheckCircle2, title: "Receive Care", desc: "Trusted caregivers arrive" },
      ],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A seamless journey for every user, powered by AI
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {flows.map((flow, flowIndex) => (
            <div key={flowIndex} className="relative">
              {/* User Type Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-2xl font-bold text-foreground">{flow.user}</h3>
              </div>

              {/* Steps Flow */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {flow.steps.map((step, stepIndex) => {
                  const Icon = step.icon
                  return (
                    <div key={stepIndex} className="relative">
                      {/* Step Card */}
                      <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                        <div className="flex flex-col items-center text-center gap-4">
                          {/* Step Number & Icon */}
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                              {stepIndex + 1}
                            </div>
                          </div>

                          {/* Step Content */}
                          <div>
                            <h4 className="font-semibold text-lg text-foreground mb-2">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      </div>

                      {/* Arrow Connector (hidden on last step and mobile) */}
                      {stepIndex < flow.steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card rounded-2xl border border-border p-8 shadow-lg">
            <p className="text-lg text-muted-foreground mb-4">Ready to see it in action?</p>
          <Link href="/get-started">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
