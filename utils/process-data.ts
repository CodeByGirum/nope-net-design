import type { AttackType, DetectionResult } from "@/context/detection-context"

// Function to parse KDD format data and return detection results
export function processKddData(inputText: string): {
  results: DetectionResult[]
  totalPackets: number
  attacksDetected: number
  processingTime: string
} {
  // Split the input text into lines
  const lines = inputText.trim().split("\n")
  const totalPackets = lines.length

  // Process each line to extract attack information
  const results: DetectionResult[] = lines.map((line, index) => {
    const parts = line.split(",")

    // In KDD format, the last field is the attack type
    const rawAttackType = parts[parts.length - 1].trim()

    // Map the attack type to our categories
    let attackType: AttackType = "normal"
    if (
      rawAttackType.includes("neptune") ||
      rawAttackType.includes("smurf") ||
      rawAttackType.includes("pod") ||
      rawAttackType.includes("teardrop")
    ) {
      attackType = "DOS"
    } else if (
      rawAttackType.includes("portsweep") ||
      rawAttackType.includes("ipsweep") ||
      rawAttackType.includes("satan") ||
      rawAttackType.includes("nmap")
    ) {
      attackType = "Probe"
    } else if (
      rawAttackType.includes("guess_passwd") ||
      rawAttackType.includes("ftp_write") ||
      rawAttackType.includes("imap") ||
      rawAttackType.includes("phf") ||
      rawAttackType.includes("multihop")
    ) {
      attackType = "R2L"
    } else if (
      rawAttackType.includes("buffer_overflow") ||
      rawAttackType.includes("rootkit") ||
      rawAttackType.includes("loadmodule") ||
      rawAttackType.includes("perl")
    ) {
      attackType = "U2R"
    }

    // Extract protocol (usually the 2nd field in KDD)
    const protocol = parts.length > 1 ? parts[1] : "unknown"

    // Extract flag (usually the 4th field in KDD)
    const flag = parts.length > 3 ? parts[3] : "unknown"

    // Generate a confidence score (in a real system, this would come from the model)
    const confidence = attackType === "normal" ? 0.2 : Math.random() * 0.3 + 0.7

    // Create a timestamp (in a real system, this might be in the data or use the current time)
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds() + index).padStart(2, "0")}`

    return {
      timestamp,
      protocol,
      flag,
      attackType,
      confidence,
    }
  })

  // Count non-normal packets as attacks
  const attacksDetected = results.filter((r) => r.attackType !== "normal").length

  // Simulate processing time
  const processingTime = `${(Math.random() * 2 + 0.5).toFixed(1)}s`

  return {
    results,
    totalPackets,
    attacksDetected,
    processingTime,
  }
}

// Function to generate recommendations based on detected attacks
export function generateRecommendations(results: DetectionResult[]) {
  const attackTypes = new Set(results.filter((r) => r.attackType !== "normal").map((r) => r.attackType))

  const recommendations = []

  if (attackTypes.has("DOS")) {
    recommendations.push({
      id: 1,
      attackType: "DOS",
      recommendation:
        "Apply rate limiting and firewall rules to block suspicious IPs. Consider implementing DDoS protection services.",
    })
  }

  if (attackTypes.has("Probe")) {
    recommendations.push({
      id: 2,
      attackType: "Probe",
      recommendation:
        "Configure port scan detection, implement port knocking, and hide service fingerprints to prevent information disclosure.",
    })
  }

  if (attackTypes.has("R2L")) {
    recommendations.push({
      id: 3,
      attackType: "R2L",
      recommendation:
        "Update authentication mechanisms, implement multi-factor authentication, and review access controls for all remote services.",
    })
  }

  if (attackTypes.has("U2R")) {
    recommendations.push({
      id: 4,
      attackType: "U2R",
      recommendation:
        "Apply security patches regularly, implement least privilege principles, and use application sandboxing to limit privilege escalation.",
    })
  }

  // If no specific attack types or only normal traffic
  if (recommendations.length === 0) {
    recommendations.push({
      id: 5,
      attackType: "normal",
      recommendation:
        "No specific threats detected. Continue monitoring and maintain regular security updates and backups.",
    })
  }

  return recommendations
}
