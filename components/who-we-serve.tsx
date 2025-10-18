"use client"

import { Building2, Heart, Briefcase } from "lucide-react"
import Image from "next/image"

export function WhoWeServe() {
  const users = [
    {
      icon: Briefcase,
      title: "Recruiters & Agencies",
      description: "Healthcare staffing agencies finding the perfect match",
      benefits: ["AI-powered candidate matching", "Automated screening & verification", "Real-time placement tracking"],
      image: "/african-woman-nurse.jpg",
      color: "primary",
    },
    {
      icon: Heart,
      title: "Caregivers & Healthcare Workers",
      description: "Nurses, CNAs, and home health aides seeking opportunities",
      benefits: ["Quick job matching", "Transparent application process", "Fair compensation & benefits"],
      image: "/african-woman-caregiver.jpg",
      color: "secondary",
    },
    {
      icon: Building2,
      title: "Healthcare Facilities & Clients",
      description: "Hospitals, clinics, and home care agencies needing staff",
      benefits: ["24/7 staff availability", "Verified, trusted caregivers", "Flexible scheduling & coverage"],
      image: "/care-facility.jpg",
      color: "accent",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Who We Serve</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            NannyCare connects three essential groups in the healthcare ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {users.map((user, index) => {
            const Icon = user.icon
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                {/* Image Header */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                  <Image
                    src={user.image || "/placeholder.svg"}
                    alt={user.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-card shadow-lg flex items-center justify-center border-2 border-primary">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{user.title}</h3>
                  <p className="text-muted-foreground mb-6">{user.description}</p>

                  <div className="space-y-3">
                    {user.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm text-foreground">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
