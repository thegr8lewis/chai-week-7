"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const handleLearnMore = () => {
    window.open("https://github.com", "_blank")
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="relative">
            <Heart className="w-12 h-12 text-secondary fill-secondary animate-pulse" />
            <Sparkles className="w-5 h-5 text-primary absolute -top-1 -right-1" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">NannyCare</h1>
        </div>

        {/* Tagline */}
        <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-150 text-balance">
          Connecting Care Through <span className="text-primary">Intelligence</span>
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300 text-pretty">
          Empowering healthcare staffing across Africa with AI-powered matching, real-time coordination, and trust-first
          connections.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <Link href="/dashboard/recruiter">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View Dashboard
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={handleLearnMore}
            className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
          >
            Learn More
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-700">
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">AI Matching</h3>
            <p className="text-sm text-muted-foreground text-center">
              Smart algorithms connect the right caregivers with the right clients
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">Trust First</h3>
            <p className="text-sm text-muted-foreground text-center">
              Verified profiles, trust scores, and safety certifications
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">Real-Time Sync</h3>
            <p className="text-sm text-muted-foreground text-center">
              Live availability, instant notifications, seamless coordination
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
