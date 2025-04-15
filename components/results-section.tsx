"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  RefreshCw,
  AlertTriangle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  Info,
} from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDetection } from "@/context/detection-context"
import { generateRecommendations } from "@/utils/process-data"

export default function ResultsSection() {
  const router = useRouter()
  const { detectionData } = useDetection()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your NopeNet Assistant. How can I help you analyze your scan results?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [viewAllThreats, setViewAllThreats] = useState(false)

  // Generate recommendations based on detection results
  const recommendations = useMemo(() => {
    if (!detectionData) return []
    return generateRecommendations(detectionData.results)
  }, [detectionData])

  // Calculate attack type distribution
  const attackDistribution = useMemo(() => {
    if (!detectionData) return { DOS: 0, Probe: 0, R2L: 0, U2R: 0, total: 0 }

    const distribution = {
      DOS: 0,
      Probe: 0,
      R2L: 0,
      U2R: 0,
      total: 0,
    }

    detectionData.results.forEach((result) => {
      if (result.attackType !== "normal") {
        distribution[result.attackType]++
        distribution.total++
      }
    })

    return distribution
  }, [detectionData])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputMessage }])

    // Simulate assistant response
    setTimeout(() => {
      let response = ""

      if (inputMessage.toLowerCase().includes("dos") || inputMessage.toLowerCase().includes("denial of service")) {
        response = `DOS (Denial of Service) attacks attempt to make a machine or network resource unavailable. In your scan, we detected ${attackDistribution.DOS} DOS attacks. I recommend implementing rate limiting and traffic filtering.`
      } else if (inputMessage.toLowerCase().includes("probe") || inputMessage.toLowerCase().includes("scanning")) {
        response = `Probe attacks involve scanning networks to gather information for later attacks. Your scan shows ${attackDistribution.Probe} probe attempts. Consider hiding your service fingerprints and implementing port knocking.`
      } else if (inputMessage.toLowerCase().includes("summary") || inputMessage.toLowerCase().includes("overview")) {
        response = `Your scan analyzed ${detectionData?.totalPackets || 0} packets and detected ${detectionData?.attacksDetected || 0} potential threats across ${attackDistribution.total ? "multiple" : "0"} attack categories.`
      } else {
        response =
          "I can provide information about the detected attacks, explain attack types, or suggest security improvements based on your scan results. What specific aspect would you like to know more about?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 1000)

    setInputMessage("")
  }

  if (!detectionData) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">No Detection Data Available</h2>
          <p className="text-gray-400 mb-8">Please run a detection first to see results.</p>
          <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-500">
            Go to Scanner
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scanner
          </Button>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Detection <span className="text-blue-400">Results</span>
            </h2>
          </motion.div>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-blue-400" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Packets</span>
                    <span className="text-white font-mono">{detectionData.totalPackets}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Attacks Detected</span>
                    <span className="text-red-400 font-mono">{detectionData.attacksDetected}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Processing Time</span>
                    <span className="text-white font-mono">{detectionData.processingTime}</span>
                  </div>
                  <div className="pt-4">
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${(detectionData.attacksDetected / detectionData.totalPackets) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {((detectionData.attacksDetected / detectionData.totalPackets) * 100).toFixed(2)}% of packets
                      flagged
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ShieldAlert className="mr-2 h-5 w-5 text-red-400" />
                  Attack Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                {detectionData.totalPackets <= 1 || attackDistribution.total === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-8">
                    <Info className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium text-gray-300 mb-2">Not Enough Information</h3>
                    <p className="text-gray-500">
                      We need more packet data to perform a meaningful attack distribution analysis. Try submitting more
                      network data or using the sample data option.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="relative">
                      <div className="w-full h-48 flex items-center justify-center">
                        <div className="relative w-40 h-40">
                          {/* DOS Attack */}
                          {attackDistribution.DOS > 0 && (
                            <div
                              className="absolute inset-0 rounded-full border-8 border-red-500/80"
                              style={{
                                clipPath: `polygon(50% 50%, 50% 0%, ${50 + (attackDistribution.DOS / attackDistribution.total) * 50}% 0%, 100% ${(attackDistribution.DOS / attackDistribution.total) * 100}%, 50% 100%)`,
                              }}
                            ></div>
                          )}
                          {/* Probe Attack */}
                          {attackDistribution.Probe > 0 && (
                            <div
                              className="absolute inset-0 rounded-full border-8 border-yellow-500/80"
                              style={{
                                clipPath: `polygon(50% 50%, ${50 - (attackDistribution.Probe / attackDistribution.total) * 50}% 0%, 0% 0%, 0% ${(attackDistribution.Probe / attackDistribution.total) * 100}%)`,
                              }}
                            ></div>
                          )}
                          {/* R2L Attack */}
                          {attackDistribution.R2L > 0 && (
                            <div
                              className="absolute inset-0 rounded-full border-8 border-blue-500/80"
                              style={{
                                clipPath: `polygon(50% 50%, 0% ${100 - (attackDistribution.R2L / attackDistribution.total) * 100}%, 0% 100%, ${(attackDistribution.R2L / attackDistribution.total) * 50}% 100%)`,
                              }}
                            ></div>
                          )}
                          {/* U2R Attack */}
                          {attackDistribution.U2R > 0 && (
                            <div
                              className="absolute inset-0 rounded-full border-8 border-green-500/80"
                              style={{
                                clipPath: `polygon(50% 50%, ${50 + (attackDistribution.U2R / attackDistribution.total) * 50}% 100%, 100% 100%, 100% ${100 - (attackDistribution.U2R / attackDistribution.total) * 100}%)`,
                              }}
                            ></div>
                          )}
                          <div className="absolute inset-8 bg-gray-900/80 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{detectionData.attacksDetected}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {attackDistribution.DOS > 0 && (
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                              DOS ({Math.round((attackDistribution.DOS / attackDistribution.total) * 100)}%)
                            </span>
                          </div>
                        )}
                        {attackDistribution.Probe > 0 && (
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                              Probe ({Math.round((attackDistribution.Probe / attackDistribution.total) * 100)}%)
                            </span>
                          </div>
                        )}
                        {attackDistribution.R2L > 0 && (
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                              R2L ({Math.round((attackDistribution.R2L / attackDistribution.total) * 100)}%)
                            </span>
                          </div>
                        )}
                        {attackDistribution.U2R > 0 && (
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-gray-300">
                              U2R ({Math.round((attackDistribution.U2R / attackDistribution.total) * 100)}%)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="h-48">
                        <div className="h-full flex items-end space-x-2">
                          {detectionData.results.slice(0, 5).map((result, index) => (
                            <div
                              key={index}
                              className={`w-1/5 rounded-t-md ${
                                result.attackType === "DOS"
                                  ? "bg-gradient-to-t from-red-500/80 to-red-500/20"
                                  : result.attackType === "Probe"
                                    ? "bg-gradient-to-t from-yellow-500/80 to-yellow-500/20"
                                    : result.attackType === "R2L"
                                      ? "bg-gradient-to-t from-blue-500/80 to-blue-500/20"
                                      : result.attackType === "U2R"
                                        ? "bg-gradient-to-t from-green-500/80 to-green-500/20"
                                        : "bg-gradient-to-t from-gray-500/80 to-gray-500/20"
                              }`}
                              style={{ height: `${result.confidence * 100}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {detectionData.results.slice(0, 5).map((result, index) => (
                          <span key={index}>{result.timestamp.split(" ")[1].substring(0, 5)}</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2 text-center">Attack frequency over time</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                Detected Threats
              </CardTitle>
              <CardDescription className="text-gray-500">
                Detailed list of all detected intrusion attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Timestamp</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Protocol</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Flag</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Attack Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detectionData.results
                      .filter((result) => result.attackType !== "normal")
                      .slice(0, viewAllThreats ? undefined : 5)
                      .map((attack, index) => (
                        <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30">
                          <td className="py-3 px-4 text-gray-300">{attack.timestamp}</td>
                          <td className="py-3 px-4 text-gray-300">{attack.protocol}</td>
                          <td className="py-3 px-4 text-gray-300">{attack.flag}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                attack.attackType === "DOS"
                                  ? "bg-red-500/20 text-red-400"
                                  : attack.attackType === "Probe"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : attack.attackType === "R2L"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {attack.attackType}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-800 rounded-full h-1.5 mr-2">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    attack.confidence > 0.9
                                      ? "bg-red-500"
                                      : attack.confidence > 0.8
                                        ? "bg-yellow-500"
                                        : "bg-blue-500"
                                  }`}
                                  style={{ width: `${attack.confidence * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-300 text-sm">{(attack.confidence * 100).toFixed(0)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {detectionData.results.filter((result) => result.attackType !== "normal").length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No threats detected in the analyzed data.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
              <div className="text-sm text-gray-500">
                Showing{" "}
                {viewAllThreats
                  ? detectionData.results.filter((result) => result.attackType !== "normal").length
                  : Math.min(detectionData.results.filter((result) => result.attackType !== "normal").length, 5)}{" "}
                of {detectionData.attacksDetected} threats
              </div>
              {detectionData.attacksDetected > 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => setViewAllThreats(!viewAllThreats)}
                >
                  {viewAllThreats ? "Show Less" : "View All"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />
                Recommendations
              </CardTitle>
              <CardDescription className="text-gray-500">Suggested actions based on detected threats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-full mr-4 ${
                            rec.attackType === "DOS"
                              ? "bg-red-500/20"
                              : rec.attackType === "Probe"
                                ? "bg-yellow-500/20"
                                : rec.attackType === "R2L"
                                  ? "bg-blue-500/20"
                                  : rec.attackType === "U2R"
                                    ? "bg-green-500/20"
                                    : "bg-gray-500/20"
                          }`}
                        >
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              rec.attackType === "DOS"
                                ? "text-red-400"
                                : rec.attackType === "Probe"
                                  ? "text-yellow-400"
                                  : rec.attackType === "R2L"
                                    ? "text-blue-400"
                                    : rec.attackType === "U2R"
                                      ? "text-green-400"
                                      : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">
                            {rec.attackType === "normal" ? "General Security" : `For ${rec.attackType} Attacks`}
                          </h4>
                          <p className="text-gray-400">{rec.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No specific recommendations available. Continue monitoring your network for potential threats.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4 flex justify-end space-x-4">
              <Button
                variant="outline"
                className="border-blue-800 text-blue-400 hover:bg-blue-950/30"
                onClick={() => {
                  // Find and trigger the floating assistant button
                  const floatingAssistantButton = document.querySelector(
                    ".floating-assistant-button",
                  ) as HTMLButtonElement
                  if (floatingAssistantButton) {
                    floatingAssistantButton.click()
                  }
                }}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Assistant
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                onClick={() => router.push("/")}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Another Scan
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-white sm:max-w-[500px] max-h-[80vh] flex flex-col shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          <DialogHeader className="border-b border-gray-800/50 pb-4">
            <DialogTitle className="flex items-center text-xl">
              <div className="relative mr-3">
                <MessageSquare className="text-blue-400 h-6 w-6" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-400 opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </div>
              NopeNet Assistant
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4 my-2">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 ${
                    message.role === "assistant"
                      ? "bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700/50"
                      : "bg-blue-600/90 backdrop-blur-sm text-white border border-blue-500/50"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="flex items-center border-t border-gray-800/50 pt-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                className="flex-1 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 focus:border-blue-500 text-white"
                placeholder="Ask about your scan results..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-500">
                Send
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
