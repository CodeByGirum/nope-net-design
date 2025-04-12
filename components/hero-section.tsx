"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Crosshair, FileText, Upload, AlertTriangle, Wand2 } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export default function HeroSection({ onDetectionComplete }: { onDetectionComplete: () => void }) {
  const [inputText, setInputText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isValidationError, setIsValidationError] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDetect = () => {
    // Simulate validation error for demo purposes
    if (Math.random() > 0.5) {
      setIsValidationError(true)
      return
    }

    // Start processing animation
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      onDetectionComplete()
    }, 3000)
  }

  const handleFixWithAI = () => {
    setIsValidationError(false)
    // Simulate AI fixing the format
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Crosshair className="w-16 h-16 mx-auto mb-6 text-blue-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400"
        >
          Welcome to NopeNet
          <span className="block text-blue-400">Intrusion Detection, Reinvented.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-300 mb-12"
        >
          Analyze your network data and detect attacks with intelligent AI models.
        </motion.p>

        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm p-10">
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <div className="relative w-24 h-24 mb-8">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-500/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border-2 border-blue-400/50"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 2, delay: 0.2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-2 border-blue-300/70"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 2, delay: 0.4, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-0 transform -translate-x-1/2" />
                  </motion.div>
                  <div className="absolute inset-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <motion.div
                      className="w-full h-full rounded-full bg-blue-500/30"
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Detecting...</h3>
                <p className="text-gray-400 text-center max-w-md">Analyzing network patterns for threats...</p>

                <div className="w-full max-w-md mt-8 bg-gray-900/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
                <div className="mt-2 text-gray-500 text-sm">Processing packets...</div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="hero-input-container bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 rounded-xl mb-6">
                    <TabsTrigger
                      value="text"
                      className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 rounded-l-xl"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Text Input
                    </TabsTrigger>
                    <TabsTrigger
                      value="file"
                      className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 rounded-r-xl"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      File Upload
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text">
                    <Textarea
                      placeholder="Paste your KDD-formatted network data package..."
                      className="min-h-[200px] bg-gray-900/30 border-gray-700 focus:border-blue-500 placeholder:text-gray-500 rounded-xl"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                  </TabsContent>

                  <TabsContent value="file">
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center hover:border-blue-500 transition-colors">
                      {file ? (
                        <div className="space-y-2">
                          <FileText className="mx-auto h-10 w-10 text-blue-400" />
                          <p className="text-white">{file.name}</p>
                          <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFile(null)}
                            className="mt-2 text-red-400 border-red-800 hover:bg-red-950/30"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="mx-auto h-10 w-10 text-gray-400" />
                          <p className="text-gray-300">Drag and drop your CSV file here, or click to browse</p>
                          <p className="text-gray-500 text-sm">Accepts .csv files in KDD format</p>
                          <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            id="file-upload"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="file-upload">
                            <Button
                              variant="outline"
                              className="border-blue-800 text-blue-400 hover:bg-blue-950/30"
                              asChild
                            >
                              <span>Select File</span>
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end mt-6 space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // Sample KDD data format
                      const sampleData = `0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal
0,udp,private,SF,105,146,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,255,254,1.00,0.01,0.00,0.00,0.00,0.00,0.00,0.00,normal
0,tcp,private,S0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,123,6,0.05,0.07,0.00,0.00,0.00,0.00,0.00,0.00,neptune`
                      setInputText(sampleData)
                    }}
                    className="text-blue-400 border-blue-800 hover:bg-blue-950/30"
                  >
                    Try Sample Data
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDetect}
                    className="bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  >
                    Detect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Dialog open={isValidationError} onOpenChange={setIsValidationError}>
        <DialogContent className="bg-gray-900 border border-gray-700 text-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
              Formatting Error
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Your input doesn't follow the expected KDD format.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-black/50 border border-gray-800 rounded-md p-4 my-4">
            <p className="text-gray-500 text-sm font-mono">
              Expected format: <span className="text-gray-300">duration,protocol_type,service,flag,src_bytes,...</span>
            </p>
          </div>
          <DialogFooter className="flex sm:justify-between gap-4">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Edit Manually
            </Button>
            <Button onClick={handleFixWithAI} className="bg-blue-600 hover:bg-blue-500">
              <Wand2 className="mr-2 h-4 w-4" />
              Fix with AI
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
