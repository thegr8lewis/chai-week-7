import { HeroSection } from "@/components/hero-section"
import { WhoWeServe } from "@/components/who-we-serve"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhoWeServe />
      <HowItWorks />
      <Footer />
    </main>
  )
}
