"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "recruiter"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock credentials for each role
  const mockCredentials: Record<string, { email: string; password: string }> = {
    recruiter: { email: "recruiter@carelink.ai", password: "demo123" },
    caregiver: { email: "caregiver@carelink.ai", password: "demo123" },
    client: { email: "client@carelink.ai", password: "demo123" },
  }

  // Auto-fill credentials when component mounts
  useEffect(() => {
    const credentials = mockCredentials[role]
    if (credentials) {
      // Simulate typing effect
      setTimeout(() => {
        setEmail(credentials.email)
      }, 300)
      setTimeout(() => {
        setPassword(credentials.password)
      }, 600)
    }
  }, [role])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      // Navigate to respective dashboard
      router.push(`/dashboard/${role}`)
    }, 1500)
  }

  const getRoleTitle = (role: string) => {
    const titles: Record<string, string> = {
      recruiter: "Recruiter",
      caregiver: "Caregiver",
      client: "Client / Facility",
    }
    return titles[role] || "User"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-2 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <Heart className="w-12 h-12 text-secondary fill-secondary animate-pulse" />
              <Sparkles className="w-5 h-5 text-primary absolute -top-1 -right-1" />
            </div>
          </div>

          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in as <span className="font-semibold text-foreground">{getRoleTitle(role)}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/get-started" className="text-primary hover:underline font-semibold">
                Get Started
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  )
}

