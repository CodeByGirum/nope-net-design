"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Database, Cpu, GitBranch, Download, ArrowRight } from "lucide-react"
import Footer from "@/components/footer"
import FloatingAssistant from "@/components/floating-assistant"

export default function AssignmentFilesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("readme")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-black text-white pb-16">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a20] z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-12">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scanner
            </Button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Assignment <span className="text-blue-400">Files</span>
              </h1>
            </motion.div>
            <div className="w-[100px]"></div> {/* Spacer for centering */}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto text-center mb-12"
          >
            Documentation and technical details about the NopeNet intrusion detection system.
          </motion.p>

          <Tabs
            defaultValue="readme"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-5xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 rounded-xl mb-8">
              <TabsTrigger
                value="readme"
                className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400"
              >
                <FileText className="mr-2 h-4 w-4" />
                README
              </TabsTrigger>
              <TabsTrigger value="kdd" className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400">
                <Database className="mr-2 h-4 w-4" />
                KDD Dataset
              </TabsTrigger>
              <TabsTrigger
                value="model"
                className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400"
              >
                <Cpu className="mr-2 h-4 w-4" />
                XGBoost Model
              </TabsTrigger>
            </TabsList>

            <TabsContent value="readme">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm mb-8">
                    <CardHeader className="pb-2 border-b border-gray-800/50">
                      <CardTitle className="text-xl flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-blue-400" />
                        README.md
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 prose prose-invert max-w-none">
                      <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white mb-0">
                          NopeNet - Intrusion Detection, Reinvented
                        </h1>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                            <GitBranch className="mr-1 h-3 w-3" /> main
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                            <Download className="mr-1 h-3 w-3" /> Download
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-6">
                        <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-medium">
                          v1.0.0
                        </div>
                        <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs font-medium">
                          Next.js
                        </div>
                        <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md text-xs font-medium">
                          Machine Learning
                        </div>
                        <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md text-xs font-medium">
                          Network Security
                        </div>
                      </div>

                      <p>
                        NopeNet is a modern web application for network intrusion detection with an intuitive user
                        interface. It analyzes network data to detect potential threats and attacks, providing detailed
                        visualizations and actionable recommendations.
                      </p>

                      <h2>Features</h2>
                      <ul>
                        <li>
                          <strong>Interactive UI:</strong> Modern, responsive design with smooth animations and
                          transitions
                        </li>
                        <li>
                          <strong>Data Analysis:</strong> Process network data in KDD format to identify potential
                          threats
                        </li>
                        <li>
                          <strong>Visualization:</strong> View attack distributions, confidence levels, and temporal
                          patterns
                        </li>
                        <li>
                          <strong>AI-Powered Assistant:</strong> Chat with an AI assistant for insights and
                          recommendations
                        </li>
                        <li>
                          <strong>Real-time Processing:</strong> Visual feedback during data processing
                        </li>
                      </ul>

                      <h2>Technologies Used</h2>
                      <ul>
                        <li>
                          <strong>Next.js:</strong> React framework for server-rendered applications
                        </li>
                        <li>
                          <strong>TypeScript:</strong> Type-safe JavaScript
                        </li>
                        <li>
                          <strong>Tailwind CSS:</strong> Utility-first CSS framework
                        </li>
                        <li>
                          <strong>Framer Motion:</strong> Animation library for React
                        </li>
                        <li>
                          <strong>XGBoost:</strong> Gradient boosting framework for machine learning
                        </li>
                        <li>
                          <strong>shadcn/ui:</strong> High-quality UI components
                        </li>
                      </ul>

                      <h2>Getting Started</h2>
                      <h3>Prerequisites</h3>
                      <ul>
                        <li>Node.js 18.x or higher</li>
                        <li>npm or yarn</li>
                      </ul>

                      <h3>Installation</h3>
                      <div className="bg-gray-900 rounded-md p-4 my-4">
                        <pre className="text-gray-300 text-sm">
                          <code>
                            {`# Clone the repository
git clone https://github.com/yourusername/nopenet.git
cd nopenet

# Install dependencies
npm install

# Run the development server
npm run dev`}
                          </code>
                        </pre>
                      </div>

                      <p>Open http://localhost:3000 in your browser to see the application.</p>

                      <h2>Project Structure</h2>
                      <div className="bg-gray-900 rounded-md p-4 my-4">
                        <pre className="text-gray-300 text-sm">
                          <code>
                            {`nopenet/
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   ├── results/          # Results page
│   ├── resources/        # Resources page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── floating-assistant.tsx  # AI assistant chat interface
│   ├── footer.tsx        # Footer component
│   ├── hero-section.tsx  # Hero section with data input
│   ├── results-section.tsx  # Results visualization
│   └── ui/               # UI components from shadcn/ui
├── context/              # React context providers
├── utils/                # Utility functions
│   └── process-data.ts   # Data processing utilities
├── public/               # Static assets
└── README.md             # Project documentation`}
                          </code>
                        </pre>
                      </div>

                      <h2>License</h2>
                      <p>This project is licensed under the MIT License - see the LICENSE file for details.</p>

                      <div className="mt-8 pt-6 border-t border-gray-800">
                        <p className="text-gray-500 text-sm">
                          Built with ❤️ using Next.js and React for the Network Security course.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="kdd">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm mb-8">
                    <CardHeader className="pb-2 border-b border-gray-800/50">
                      <CardTitle className="text-xl flex items-center">
                        <Database className="mr-2 h-5 w-5 text-blue-400" />
                        KDD Cup 99 Dataset
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-invert max-w-none">
                        <h2>About the KDD Cup 99 Dataset</h2>
                        <p>
                          The KDD Cup 99 dataset is a widely used benchmark dataset for evaluating intrusion detection
                          systems. It was created based on the data captured in the DARPA'98 IDS evaluation program and
                          contains a standard set of data to be audited, which includes a wide variety of intrusions
                          simulated in a military network environment.
                        </p>

                        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 my-6">
                          <h3 className="text-blue-400 mt-0">Dataset Overview</h3>
                          <ul className="mt-2">
                            <li>
                              <strong>Size:</strong> Approximately 4.9 million connection records
                            </li>
                            <li>
                              <strong>Features:</strong> 41 features per connection record
                            </li>
                            <li>
                              <strong>Classes:</strong> Normal traffic and 4 main categories of attacks
                            </li>
                            <li>
                              <strong>Format:</strong> CSV with comma-separated values
                            </li>
                          </ul>
                        </div>

                        <h3>Feature Categories</h3>
                        <p>The 41 features in the KDD dataset can be classified into three groups:</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Basic Features</h4>
                            <p className="text-sm text-gray-400 mt-0">
                              Features derived from packet headers without inspecting the payload
                            </p>
                            <ul className="text-sm mt-2">
                              <li>duration</li>
                              <li>protocol_type</li>
                              <li>service</li>
                              <li>flag</li>
                              <li>src_bytes</li>
                              <li>dst_bytes</li>
                            </ul>
                          </div>

                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Content Features</h4>
                            <p className="text-sm text-gray-400 mt-0">
                              Features derived by analyzing the payload of the original TCP packets
                            </p>
                            <ul className="text-sm mt-2">
                              <li>hot</li>
                              <li>num_failed_logins</li>
                              <li>logged_in</li>
                              <li>num_compromised</li>
                              <li>root_shell</li>
                              <li>su_attempted</li>
                            </ul>
                          </div>

                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Traffic Features</h4>
                            <p className="text-sm text-gray-400 mt-0">
                              Features computed using a two-second time window
                            </p>
                            <ul className="text-sm mt-2">
                              <li>count</li>
                              <li>srv_count</li>
                              <li>serror_rate</li>
                              <li>srv_serror_rate</li>
                              <li>rerror_rate</li>
                              <li>srv_rerror_rate</li>
                            </ul>
                          </div>
                        </div>

                        <h3>Attack Categories</h3>
                        <p>
                          The dataset contains four main categories of attacks, along with normal traffic. Each category
                          includes multiple specific attack types:
                        </p>

                        <div className="overflow-x-auto my-6">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-900/50">
                                <th className="border border-gray-800 px-4 py-2 text-left">Category</th>
                                <th className="border border-gray-800 px-4 py-2 text-left">Description</th>
                                <th className="border border-gray-800 px-4 py-2 text-left">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-red-400">DoS</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Denial of Service attacks aim to make a resource unavailable
                                </td>
                                <td className="border border-gray-800 px-4 py-2">
                                  neptune, smurf, pod, teardrop, land, back
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-yellow-400">Probe</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Surveillance and probing attacks that gather information
                                </td>
                                <td className="border border-gray-800 px-4 py-2">portsweep, ipsweep, satan, nmap</td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-blue-400">R2L</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Unauthorized access from a remote machine
                                </td>
                                <td className="border border-gray-800 px-4 py-2">
                                  guess_passwd, ftp_write, imap, phf, multihop, warezmaster
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-green-400">U2R</td>
                                <td className="border border-gray-800 px-4 py-2">
                                  Unauthorized access to local superuser privileges
                                </td>
                                <td className="border border-gray-800 px-4 py-2">
                                  buffer_overflow, rootkit, loadmodule, perl
                                </td>
                              </tr>
                              <tr>
                                <td className="border border-gray-800 px-4 py-2 text-gray-400">Normal</td>
                                <td className="border border-gray-800 px-4 py-2">Regular network traffic</td>
                                <td className="border border-gray-800 px-4 py-2">-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <h3>How NopeNet Uses the KDD Format</h3>
                        <p>
                          NopeNet is designed to process network data in the KDD format, extracting relevant features to
                          identify potential intrusions. Our system:
                        </p>
                        <ul>
                          <li>Parses the comma-separated values from the input data</li>
                          <li>Extracts key features for analysis</li>
                          <li>Applies our trained XGBoost model to classify traffic</li>
                          <li>Categorizes detected attacks into the four main categories</li>
                          <li>Provides confidence scores for each detection</li>
                        </ul>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 my-6">
                          <h4 className="text-blue-400 mt-0">Sample KDD Format</h4>
                          <pre className="text-xs text-gray-300 overflow-x-auto">
                            <code>
                              {`0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal
0,udp,private,SF,105,146,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,255,254,1.00,0.01,0.00,0.00,0.00,0.00,0.00,0.00,normal
0,tcp,private,S0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,123,6,0.05,0.07,0.00,0.00,0.00,0.00,0.00,0.00,neptune`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="model">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm mb-8">
                    <CardHeader className="pb-2 border-b border-gray-800/50">
                      <CardTitle className="text-xl flex items-center">
                        <Cpu className="mr-2 h-5 w-5 text-blue-400" />
                        XGBoost Model Implementation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-invert max-w-none">
                        <h2>XGBoost for Intrusion Detection</h2>
                        <p>
                          NopeNet uses XGBoost (eXtreme Gradient Boosting), a powerful machine learning algorithm, to
                          detect network intrusions with high accuracy and efficiency.
                        </p>

                        <div className="my-8">
                          <h3>Why XGBoost?</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                              <h4 className="text-blue-400 mt-0 mb-2">Performance Advantages</h4>
                              <ul className="mt-2 space-y-2">
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>XGBoost has the highest accuracy (0.9229)</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Strong precision, recall, and F1-score</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Detects major attacks accurately</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Performs best on dominant and rare classes</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-green-400 mr-2">✓</span>
                                  <span>Better generalization than other models</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                              <h4 className="text-blue-400 mt-0 mb-2">Comparison to Other Models</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr>
                                      <th className="text-left pr-4">Model</th>
                                      <th className="text-left pr-4">Accuracy</th>
                                      <th className="text-left">Training Speed</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="pr-4">XGBoost</td>
                                      <td className="pr-4 text-green-400">92.29%</td>
                                      <td className="text-red-400">Slow</td>
                                    </tr>
                                    <tr>
                                      <td className="pr-4">Random Forest</td>
                                      <td className="pr-4 text-green-400">92.23%</td>
                                      <td className="text-yellow-400">Medium</td>
                                    </tr>
                                    <tr>
                                      <td className="pr-4">Logistic Regression</td>
                                      <td className="pr-4 text-green-400">92.09%</td>
                                      <td className="text-yellow-400">Medium</td>
                                    </tr>
                                    <tr>
                                      <td className="pr-4">LightGBM</td>
                                      <td className="pr-4 text-red-400">30.18%</td>
                                      <td className="text-green-400">Fast</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Model Architecture and Training</h3>

                        <div className="my-6 bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/2">
                              <h4 className="text-blue-400 mt-0">Training Process</h4>
                              <ol className="space-y-3 mt-4">
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    1
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Data Preprocessing:</strong> Cleaning,
                                    normalization and feature engineering
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    2
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Feature Selection:</strong> Identifying the most
                                    important features using feature importance
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    3
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Hyperparameter Tuning:</strong> Grid search with
                                    cross-validation to find optimal parameters
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    4
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Model Training:</strong> Training on 80% of the
                                    KDD dataset with optimized parameters
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-blue-900/50 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                    5
                                  </span>
                                  <span>
                                    <strong className="text-blue-400">Evaluation:</strong> Testing on the remaining 20%
                                    to validate performance
                                  </span>
                                </li>
                              </ol>
                            </div>

                            <div className="w-full md:w-1/2">
                              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                <h4 className="text-blue-400 mt-0 mb-4">XGBoost Parameters</h4>
                                <pre className="text-xs text-gray-300 overflow-x-auto">
                                  <code>
                                    {`{
  "objective": "multi:softprob",
  "num_class": 5,  // Normal + 4 attack types
  "max_depth": 6,
  "learning_rate": 0.1,
  "n_estimators": 100,
  "subsample": 0.8,
  "colsample_bytree": 0.8,
  "min_child_weight": 1,
  "reg_alpha": 0.1,
  "reg_lambda": 1.0,
  "scale_pos_weight": 1,
  "seed": 42
}`}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Feature Importance</h3>
                        <p>
                          Our analysis identified the most important features for detecting different types of attacks:
                        </p>

                        <div className="my-6">
                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-4">Top 10 Features by Importance</h4>
                            <div className="relative h-64">
                              <div className="absolute inset-0 flex items-end space-x-2">
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "95%" }}></div>
                                  <p className="text-xs mt-1 text-center">src_bytes</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "87%" }}></div>
                                  <p className="text-xs mt-1 text-center">dst_bytes</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "82%" }}></div>
                                  <p className="text-xs mt-1 text-center">count</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "78%" }}></div>
                                  <p className="text-xs mt-1 text-center">srv_count</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "73%" }}></div>
                                  <p className="text-xs mt-1 text-center">serror_rate</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "68%" }}></div>
                                  <p className="text-xs mt-1 text-center">same_srv_rate</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "65%" }}></div>
                                  <p className="text-xs mt-1 text-center">dst_host_count</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "60%" }}></div>
                                  <p className="text-xs mt-1 text-center">flag</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "55%" }}></div>
                                  <p className="text-xs mt-1 text-center">protocol_type</p>
                                </div>
                                <div className="h-full flex flex-col justify-end">
                                  <div className="bg-blue-500/80 w-10 rounded-t-md" style={{ height: "50%" }}></div>
                                  <p className="text-xs mt-1 text-center">service</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Model Performance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Confusion Matrix</h4>
                            <div className="relative overflow-hidden">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr>
                                    <th className="p-1"></th>
                                    <th className="p-1 text-center">Normal</th>
                                    <th className="p-1 text-center">DoS</th>
                                    <th className="p-1 text-center">Probe</th>
                                    <th className="p-1 text-center">R2L</th>
                                    <th className="p-1 text-center">U2R</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="p-1 font-medium">Normal</td>
                                    <td className="p-1 text-center bg-green-900/30">9,845</td>
                                    <td className="p-1 text-center">102</td>
                                    <td className="p-1 text-center">43</td>
                                    <td className="p-1 text-center">10</td>
                                    <td className="p-1 text-center">0</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1 font-medium">DoS</td>
                                    <td className="p-1 text-center">78</td>
                                    <td className="p-1 text-center bg-green-900/30">7,312</td>
                                    <td className="p-1 text-center">10</td>
                                    <td className="p-1 text-center">0</td>
                                    <td className="p-1 text-center">0</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1 font-medium">Probe</td>
                                    <td className="p-1 text-center">35</td>
                                    <td className="p-1 text-center">5</td>
                                    <td className="p-1 text-center bg-green-900/30">2,377</td>
                                    <td className="p-1 text-center">4</td>
                                    <td className="p-1 text-center">0</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1 font-medium">R2L</td>
                                    <td className="p-1 text-center">12</td>
                                    <td className="p-1 text-center">0</td>
                                    <td className="p-1 text-center">2</td>
                                    <td className="p-1 text-center bg-green-900/30">986</td>
                                    <td className="p-1 text-center">0</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1 font-medium">U2R</td>
                                    <td className="p-1 text-center">2</td>
                                    <td className="p-1 text-center">0</td>
                                    <td className="p-1 text-center">0</td>
                                    <td className="p-1 text-center">1</td>
                                    <td className="p-1 text-center bg-green-900/30">47</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                            <h4 className="text-blue-400 mt-0 mb-2">Performance Metrics</h4>
                            <div
                              className="overflow-auto max-h-96 scrollbar-hide"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              <table className="w-full text-sm">
                                <thead>
                                  <tr>
                                    <th className="text-left p-1 sticky top-0 bg-gray-900/80">Attack Type</th>
                                    <th className="text-center p-1 sticky top-0 bg-gray-900/80">Precision</th>
                                    <th className="text-center p-1 sticky top-0 bg-gray-900/80">Recall</th>
                                    <th className="text-center p-1 sticky top-0 bg-gray-900/80">F1-Score</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="p-1">back</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">98.0%</td>
                                    <td className="p-1 text-center">99.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">buffer_overflow</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">5.0%</td>
                                    <td className="p-1 text-center">9.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">ipsweep</td>
                                    <td className="p-1 text-center">97.0%</td>
                                    <td className="p-1 text-center">98.0%</td>
                                    <td className="p-1 text-center">98.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">land</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">78.0%</td>
                                    <td className="p-1 text-center">88.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">neptune</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">nmap</td>
                                    <td className="p-1 text-center">99.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">99.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">normal</td>
                                    <td className="p-1 text-center">72.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">84.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">phf</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">50.0%</td>
                                    <td className="p-1 text-center">67.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">pod</td>
                                    <td className="p-1 text-center">84.0%</td>
                                    <td className="p-1 text-center">94.0%</td>
                                    <td className="p-1 text-center">89.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">portsweep</td>
                                    <td className="p-1 text-center">84.0%</td>
                                    <td className="p-1 text-center">96.0%</td>
                                    <td className="p-1 text-center">90.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">satan</td>
                                    <td className="p-1 text-center">90.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">95.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">smurf</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">teardrop</td>
                                    <td className="p-1 text-center">24.0%</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">39.0%</td>
                                  </tr>
                                  <tr>
                                    <td className="p-1">unknown</td>
                                    <td className="p-1 text-center">100.0%</td>
                                    <td className="p-1 text-center">6.0%</td>
                                    <td className="p-1 text-center">12.0%</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <h3>NopeNet Data Flow</h3>
                        <p>
                          Our platform implements a streamlined data flow for processing network data and detecting
                          intrusions:
                        </p>

                        <div className="my-8 bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                          <div className="flex flex-col items-center">
                            <div className="w-full max-w-3xl">
                              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                                <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 text-center w-full md:w-64 mb-4 md:mb-0">
                                  <h4 className="text-blue-400 mt-0 mb-2">Input</h4>
                                  <p className="text-sm text-gray-300 m-0">
                                    Text input or CSV file upload with KDD format data
                                  </p>
                                </div>
                                <div className="hidden md:block">
                                  <ArrowRight className="h-8 w-8 text-gray-600" />
                                </div>
                                <div className="block md:hidden my-2">
                                  <ArrowRight className="h-8 w-8 text-gray-600 transform rotate-90" />
                                </div>
                                <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 text-center w-full md:w-64">
                                  <h4 className="text-blue-400 mt-0 mb-2">Parsing</h4>
                                  <p className="text-sm text-gray-300 m-0">
                                    Extraction of features from KDD format data
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                                <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 text-center w-full md:w-64 mb-4 md:mb-0">
                                  <h4 className="text-blue-400 mt-0 mb-2">Detection</h4>
                                  <p className="text-sm text-gray-300 m-0">
                                    XGBoost model classifies traffic and identifies attacks
                                  </p>
                                </div>
                                <div className="hidden md:block">
                                  <ArrowRight className="h-8 w-8 text-gray-600" />
                                </div>
                                <div className="block md:hidden my-2">
                                  <ArrowRight className="h-8 w-8 text-gray-600 transform rotate-90" />
                                </div>
                                <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 text-center w-full md:w-64">
                                  <h4 className="text-blue-400 mt-0 mb-2">Dashboard</h4>
                                  <p className="text-sm text-gray-300 m-0">
                                    Visualization of attack distribution and details
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 text-center w-full md:w-64 mb-4 md:mb-0">
                                  <h4 className="text-blue-400 mt-0 mb-2">Recommendations</h4>
                                  <p className="text-sm text-gray-300 m-0">
                                    Actionable security recommendations based on detected threats
                                  </p>
                                </div>
                                <div className="hidden md:block">
                                  <ArrowRight className="h-8 w-8 text-gray-600" />
                                </div>
                                <div className="block md:hidden my-2">
                                  <ArrowRight className="h-8 w-8 text-gray-600 transform rotate-90" />
                                </div>
                                <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 text-center w-full md:w-64">
                                  <h4 className="text-blue-400 mt-0 mb-2">AI Assistant</h4>
                                  <p className="text-sm text-gray-300 m-0">
                                    Interactive chat for deeper insights and explanations
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>Implementation in NopeNet</h3>
                        <p>
                          In the NopeNet web application, we've implemented a simplified version of our XGBoost model
                          for demonstration purposes. The actual implementation would involve:
                        </p>

                        <ul>
                          <li>A backend API that processes the input data</li>
                          <li>Feature extraction and normalization</li>
                          <li>Model inference using the trained XGBoost model</li>
                          <li>Returning classification results with confidence scores</li>
                          <li>Generating recommendations based on detected attack types</li>
                        </ul>

                        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 my-6">
                          <h4 className="text-blue-400 mt-0">Future Improvements</h4>
                          <ul className="mt-2">
                            <li>Integration with real-time network monitoring tools</li>
                            <li>Continuous model retraining with new attack patterns</li>
                            <li>Ensemble methods combining multiple models for higher accuracy</li>
                            <li>Anomaly detection for zero-day attack identification</li>
                            <li>Expanded visualization options for security analysts</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Try NopeNet?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Analyze your network data for potential intrusions and vulnerabilities using our advanced detection
              system.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              onClick={() => router.push("/")}
            >
              Go to Scanner
            </Button>
          </div>
        </div>
      </div>
      <FloatingAssistant />
      <Footer />
    </main>
  )
}
