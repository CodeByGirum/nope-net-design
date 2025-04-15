"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ResultsSection from "@/components/results-section"
import Footer from "@/components/footer"
import FloatingAssistant from "@/components/floating-assistant"
import { useDetection } from "@/context/detection-context"

export default function ResultsPage() {
  const router = useRouter()
  const { detectionData } = useDetection()
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if we have detection data or redirect back to home
  useEffect(() => {
    if (!detectionData) {
      // If no detection data, redirect to home
      router.push("/")
    } else {
      setIsLoaded(true)
    }
  }, [router, detectionData])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading results...</div>
      </div>
    )
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
          <ResultsSection />
          <Footer />
        </div>
      </div>
      <FloatingAssistant />
    </main>
  )
}
