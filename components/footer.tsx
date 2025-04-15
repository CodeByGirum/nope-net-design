import { Crosshair } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-2 px-4 sm:px-6 lg:px-8 border-t border-gray-800/30 bg-black/20 backdrop-blur-md fixed bottom-0 w-full z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-8">
          <div className="flex items-center">
            <Crosshair className="h-3 w-3 text-blue-400/80 mr-1.5" />
            <span className="text-xs font-medium text-white/80">NopeNet</span>
          </div>

          <div className="flex space-x-4 text-xs">
            <Link href="/resources" className="text-gray-400/90 hover:text-blue-400 transition-colors">
              Resources
            </Link>
            <Link href="/assignment-files" className="text-gray-400/90 hover:text-blue-400 transition-colors">
              Assignment Files
            </Link>
            <a href="#" className="text-gray-400/90 hover:text-blue-400 transition-colors">
              Docs
            </a>
            <span className="text-gray-500/70 text-[10px] self-center">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
