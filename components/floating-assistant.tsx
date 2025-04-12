"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FloatingAssistant() {
  const [isVisible, setIsVisible] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your NopeNet Assistant. How can I help you analyze your scan results?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [isEyeBlinking, setIsEyeBlinking] = useState(false)

  // For draggable functionality
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-100, 100], [-10, 10])

  // Show the button after a delay and position it near the input container
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Position near the input container in the hero section
      const inputContainer = document.querySelector(".hero-input-container")
      if (inputContainer) {
        const rect = inputContainer.getBoundingClientRect()
        x.set(rect.right - 80)
        y.set(rect.top - 30)
      } else {
        // Fallback position in top right
        x.set(window.innerWidth - 100)
        y.set(100)
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Random eye blink effect
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setIsEyeBlinking(true)
        setTimeout(() => setIsEyeBlinking(false), 200)
      },
      Math.random() * 3000 + 2000,
    ) // Random interval between 2-5 seconds

    return () => clearInterval(blinkInterval)
  }, [])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputMessage }])

    // Simulate assistant response
    setTimeout(() => {
      let response = ""

      if (inputMessage.toLowerCase().includes("dos") || inputMessage.toLowerCase().includes("denial of service")) {
        response =
          "DOS (Denial of Service) attacks attempt to make a machine or network resource unavailable. In your scan, we detected 17 DOS attacks with an average confidence of 93%. I recommend implementing rate limiting and traffic filtering."
      } else if (inputMessage.toLowerCase().includes("probe") || inputMessage.toLowerCase().includes("scanning")) {
        response =
          "Probe attacks involve scanning networks to gather information for later attacks. Your scan shows 9 probe attempts, primarily targeting ports 22 and 80. Consider hiding your service fingerprints and implementing port knocking."
      } else if (inputMessage.toLowerCase().includes("summary") || inputMessage.toLowerCase().includes("overview")) {
        response = `Your scan analyzed 1254 packets and detected 37 potential threats across 4 attack categories. The most common attack type was DOS (45%), followed by Probe (25%), R2L (20%), and U2R (10%).`
      } else {
        response =
          "I can provide information about the detected attacks, explain attack types, or suggest security improvements based on your scan results. What specific aspect would you like to know more about?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 1000)

    setInputMessage("")
  }

  // Expose a method to open the chat dialog
  useEffect(() => {
    // Add a global method to open the chat
    window.openNopeNetChat = () => {
      setIsChatOpen(true)
    }

    return () => {
      // Clean up
      delete window.openNopeNetChat
    }
  }, [])

  // Custom playful robot icon
  const PlayfulRobotIcon = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating animation for the entire robot */}
      <motion.div
        className="w-10 h-10"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {/* Robot face background */}
        <div className="w-full h-full bg-blue-500 rounded-xl relative overflow-hidden">
          {/* Eyes */}
          <div className="absolute top-2 left-0 w-full flex justify-around">
            <motion.div
              className={`w-2 h-${isEyeBlinking ? "0.5" : "2"} bg-white rounded-full transition-all duration-100`}
              animate={isHovered ? { y: [-1, 0, -1] } : {}}
              transition={{ duration: 1, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
            ></motion.div>
            <motion.div
              className={`w-2 h-${isEyeBlinking ? "0.5" : "2"} bg-white rounded-full transition-all duration-100`}
              animate={isHovered ? { y: [-1, 0, -1] } : {}}
              transition={{ duration: 1, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
            ></motion.div>
          </div>

          {/* Mouth - more expressive smile on hover */}
          <motion.div
            className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-white rounded-full`}
            animate={
              isHovered
                ? {
                    height: 3,
                    width: 7,
                    borderRadius: "100% 100% 0 0",
                  }
                : {
                    height: 2,
                    width: 6,
                    borderRadius: "0 0 100% 100%",
                  }
            }
            transition={{ duration: 0.3 }}
          ></motion.div>

          {/* Antenna */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-blue-300">
            <motion.div
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-200 rounded-full"
              animate={{
                y: [0, -3, 0],
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0px rgba(191, 219, 254, 0)",
                  "0 0 8px rgba(191, 219, 254, 0.8)",
                  "0 0 0px rgba(191, 219, 254, 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Sparkles around the robot */}
      <motion.div
        className="absolute top-0 right-0 text-yellow-300"
        animate={{
          rotate: [0, 20, 0, -20, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Sparkles size={12} />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 text-yellow-300"
        animate={{
          rotate: [0, -20, 0, 20, 0],
          scale: [1, 0.8, 1, 1.2, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 0.5,
        }}
      >
        <Sparkles size={12} />
      </motion.div>
    </div>
  )

  return (
    <>
      {/* Invisible div that covers the entire viewport for drag constraints */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed z-50"
            style={{ x, y }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            whileDrag={{ scale: 1.1 }}
          >
            <motion.button
              className="floating-assistant-button relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg cursor-grab active:cursor-grabbing"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ rotate }}
            >
              {/* Pulsing animation */}
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

              {/* Shining light effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-blue-600 opacity-0"
                animate={{
                  opacity: [0, 0.5, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Custom playful robot icon */}
              <PlayfulRobotIcon />

              {/* Chat indicator */}
              <div className="absolute -top-1 -right-1 bg-blue-300 text-blue-800 rounded-full text-[8px] px-1 font-bold animate-pulse">
                CHAT WITH ME
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-white sm:max-w-[500px] max-h-[80vh] flex flex-col shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          <DialogHeader className="border-b border-gray-800/50 pb-4">
            <DialogTitle className="flex items-center text-xl">
              <div className="relative mr-3 w-8 h-8">
                <PlayfulRobotIcon />
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
    </>
  )
}
