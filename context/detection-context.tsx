"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type AttackType = "DOS" | "Probe" | "R2L" | "U2R" | "normal"

export interface DetectionResult {
  timestamp: string
  protocol: string
  flag: string
  attackType: AttackType
  confidence: number
}

export interface DetectionData {
  inputText: string
  totalPackets: number
  attacksDetected: number
  processingTime: string
  results: DetectionResult[]
}

interface DetectionContextType {
  detectionData: DetectionData | null
  setDetectionData: (data: DetectionData | null) => void
}

const DetectionContext = createContext<DetectionContextType | undefined>(undefined)

export function DetectionProvider({ children }: { children: ReactNode }) {
  const [detectionData, setDetectionData] = useState<DetectionData | null>(null)

  return <DetectionContext.Provider value={{ detectionData, setDetectionData }}>{children}</DetectionContext.Provider>
}

export function useDetection() {
  const context = useContext(DetectionContext)
  if (context === undefined) {
    throw new Error("useDetection must be used within a DetectionProvider")
  }
  return context
}
