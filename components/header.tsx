"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, LayoutDashboard } from "lucide-react"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/recruiter", label: "Recruiter", icon: LayoutDashboard },
    { href: "/dashboard/caregiver", label: "Caregiver", icon: LayoutDashboard },
    { href: "/dashboard/client", label: "Client", icon: LayoutDashboard },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-xl text-foreground hover:text-primary transition-colors"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-primary-foreground font-bold shadow-lg">
            CL
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
            CareLink AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? "default" : "ghost"}
                  className={`gap-2 rounded-lg transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-xl"
                      : "text-foreground hover:bg-muted/50 hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 bg-transparent rounded-lg transition-all duration-300"
          >
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg rounded-lg transition-all duration-300">
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    className={`w-full justify-start gap-2 rounded-lg transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                        : "text-foreground hover:bg-muted/50 hover:text-primary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
            <div className="pt-4 border-t border-border/40 space-y-2">
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10 bg-transparent rounded-lg transition-all duration-300"
              >
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary rounded-lg transition-all duration-300">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
