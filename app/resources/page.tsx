"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ExternalLink, BookOpen, Shield, AlertTriangle, Zap, Search, Lock } from "lucide-react"
import Footer from "@/components/footer"
import FloatingAssistant from "@/components/floating-assistant"

// Attack type definitions
const attackTypes = [
  {
    id: "dos",
    name: "Denial of Service (DoS)",
    icon: <Shield className="h-5 w-5 text-red-400" />,
    description:
      "Attacks that attempt to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services.",
    examples: [
      {
        name: "Neptune",
        description:
          "A SYN flood DoS attack that sends TCP SYN packets to a target with spoofed source IP addresses, overwhelming connection tables.",
        reference: "https://en.wikipedia.org/wiki/SYN_flood",
      },
      {
        name: "Smurf",
        description:
          "Involves using IP broadcast addressing to send ICMP echo request packets with the spoofed source address of the intended victim.",
        reference: "https://en.wikipedia.org/wiki/Smurf_attack",
      },
      {
        name: "Pod (Ping of Death)",
        description:
          "Involves sending malformed or oversized ping packets, causing buffer overflows in the target system.",
        reference: "https://en.wikipedia.org/wiki/Ping_of_death",
      },
      {
        name: "Teardrop",
        description:
          "Involves sending fragmented IP packets that overlap, causing the target system to crash when attempting to reassemble them.",
        reference: "https://en.wikipedia.org/wiki/Denial-of-service_attack",
      },
    ],
    color: "red",
  },
  {
    id: "probe",
    name: "Probing/Scanning",
    icon: <Search className="h-5 w-5 text-yellow-400" />,
    description:
      "Surveillance and other probing attacks, such as port scans, that gather information to identify vulnerabilities for future exploitation.",
    examples: [
      {
        name: "PortSweep",
        description:
          "A scan that targets multiple ports on a single host to discover which services are running and potentially vulnerable.",
        reference: "https://nmap.org/book/man-port-scanning-techniques.html",
      },
      {
        name: "IPSweep",
        description:
          "A scan that targets a range of IP addresses to identify active hosts on a network for further targeting.",
        reference: "https://nmap.org/book/man-host-discovery.html",
      },
      {
        name: "Satan",
        description:
          "An automated tool that scans networks for vulnerabilities and provides information about how they might be exploited.",
        reference: "https://en.wikipedia.org/wiki/Security_Administrator_Tool_for_Analyzing_Networks",
      },
      {
        name: "Nmap",
        description:
          "A comprehensive network scanning tool used for security auditing and discovery of hosts and services on a network.",
        reference: "https://nmap.org/",
      },
    ],
    color: "yellow",
  },
  {
    id: "r2l",
    name: "Remote to Local (R2L)",
    icon: <ExternalLink className="h-5 w-5 text-blue-400" />,
    description:
      "Unauthorized access from a remote machine to a local machine, attempting to exploit vulnerabilities to gain local access.",
    examples: [
      {
        name: "Guess_Passwd",
        description:
          "Attempts to gain access to a system by repeatedly trying different passwords, often using automated tools.",
        reference: "https://en.wikipedia.org/wiki/Password_cracking",
      },
      {
        name: "Ftp_Write",
        description:
          "Exploits misconfigured FTP servers to gain write access, potentially allowing attackers to upload malicious files.",
        reference: "https://owasp.org/www-community/attacks/Path_Traversal",
      },
      {
        name: "Imap",
        description:
          "Targets vulnerabilities in IMAP (Internet Message Access Protocol) servers to gain unauthorized access to email accounts.",
        reference: "https://www.cvedetails.com/vulnerability-list/vendor_id-12/product_id-128/IMAP.html",
      },
      {
        name: "Phf",
        description:
          "Exploits a vulnerability in the PHF CGI script on web servers, allowing attackers to execute commands on the server.",
        reference: "https://en.wikipedia.org/wiki/PHF_exploit",
      },
    ],
    color: "blue",
  },
  {
    id: "u2r",
    name: "User to Root (U2R)",
    icon: <Lock className="h-5 w-5 text-green-400" />,
    description:
      "Attacks where a normal user gains root/administrator privileges by exploiting vulnerabilities in operating systems or applications.",
    examples: [
      {
        name: "Buffer_Overflow",
        description:
          "Exploits a program that attempts to write data beyond the boundaries of pre-allocated fixed-length buffers, allowing execution of arbitrary code.",
        reference: "https://owasp.org/www-community/vulnerabilities/Buffer_Overflow",
      },
      {
        name: "Rootkit",
        description:
          "A collection of software tools that enable an unauthorized user to gain control of a computer system without being detected.",
        reference: "https://en.wikipedia.org/wiki/Rootkit",
      },
      {
        name: "LoadModule",
        description:
          "Exploits vulnerabilities in the module loading process of applications or operating systems to execute malicious code.",
        reference: "https://attack.mitre.org/techniques/T1129/",
      },
      {
        name: "Perl",
        description:
          "Uses Perl scripts to exploit vulnerabilities, often leveraging the language's powerful text processing capabilities.",
        reference: "https://www.cvedetails.com/vulnerability-list/vendor_id-72/product_id-128/Perl-Perl.html",
      },
    ],
    color: "green",
  },
]

// Articles about network security and intrusion detection
const articles = [
  {
    id: 1,
    title: "Understanding the KDD Cup 99 Dataset",
    description:
      "An in-depth analysis of the KDD Cup 99 dataset, its features, and its relevance to modern intrusion detection systems.",
    author: "Dr. Sarah Chen",
    date: "2023-05-15",
    readTime: "12 min read",
    link: "https://www.researchgate.net/publication/228853275_Analysis_and_Results_of_the_1999_DARPA_Off-Line_Intrusion_Detection_Evaluation",
  },
  {
    id: 2,
    title: "Machine Learning Approaches for Network Intrusion Detection",
    description:
      "A comprehensive review of various machine learning techniques used in modern network intrusion detection systems.",
    author: "Prof. James Wilson",
    date: "2023-07-22",
    readTime: "15 min read",
    link: "https://ieeexplore.ieee.org/document/8581424",
  },
  {
    id: 3,
    title: "The Evolution of Cyber Attacks: From KDD to Modern Threats",
    description:
      "How cyber attacks have evolved since the creation of the KDD dataset and what new challenges security professionals face today.",
    author: "Alex Rodriguez",
    date: "2023-09-10",
    readTime: "8 min read",
    link: "https://www.sciencedirect.com/science/article/pii/S1877050920304865",
  },
]

export default function ResourcesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("attack-types")

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
                NopeNet <span className="text-blue-400">Resources</span>
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
            Explore different types of network attacks from the KDD dataset and learn about intrusion detection
            techniques.
          </motion.p>

          <Tabs
            defaultValue="attack-types"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-5xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 rounded-xl mb-8">
              <TabsTrigger
                value="attack-types"
                className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 rounded-l-xl"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Attack Types
              </TabsTrigger>
              <TabsTrigger
                value="articles"
                className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 rounded-r-xl"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Articles & Research
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attack-types">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {attackTypes.map((type) => (
                  <motion.div key={type.id} variants={item}>
                    <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm h-full overflow-hidden">
                      <CardHeader
                        className={`pb-2 border-b border-gray-800/50 bg-${type.color}-900/10 backdrop-blur-sm`}
                      >
                        <CardTitle className="text-xl flex items-center">
                          {type.icon}
                          <span className="ml-2">{type.name}</span>
                        </CardTitle>
                        <CardDescription className="text-gray-400">{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium text-gray-300 mb-4">Common Attack Examples:</h3>
                        <div className="space-y-4">
                          {type.examples.map((example) => (
                            <div
                              key={example.name}
                              className="p-3 rounded-lg bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <h4 className={`text-${type.color}-400 font-medium`}>{example.name}</h4>
                                <a
                                  href={example.reference}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-500 hover:text-blue-400 transition-colors"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </div>
                              <p className="text-gray-400 text-sm mt-1">{example.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="articles">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {articles.map((article) => (
                  <motion.div key={article.id} variants={item}>
                    <Card className="bg-black/50 border border-gray-800 shadow-xl backdrop-blur-sm h-full hover:border-blue-800/50 transition-all duration-300 group">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg group-hover:text-blue-400 transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="text-gray-500 text-xs">
                          {article.author} • {article.date} • {article.readTime}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-400 text-sm">{article.description}</p>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 text-sm flex items-center hover:text-blue-300 transition-colors"
                        >
                          Read Full Article
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}

                <motion.div variants={item}>
                  <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 shadow-xl backdrop-blur-sm h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                      <Zap className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Want to Learn More?</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Explore our comprehensive documentation and tutorials on network security and intrusion
                        detection.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-500">View Documentation</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Analyze Your Network?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Apply your knowledge by scanning your network data for potential intrusions and vulnerabilities.
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
