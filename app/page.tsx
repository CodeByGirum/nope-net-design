"use client"
import { useState } from "react"
import HeroSection from "@/components/hero-section"
import ResultsSection from "@/components/results-section"
import Footer from "@/components/footer"
import FloatingAssistant from "@/components/floating-assistant"

export default function Home() {
  const [showResults, setShowResults] = useState(false)

  const handleDetectionComplete = () => {
    setShowResults(true)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a20] z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <HeroSection onDetectionComplete={handleDetectionComplete} />
          {showResults && <ResultsSection />}
          <Footer />
        </div>
      </div>
      <FloatingAssistant />
    </main>
  )
}
