import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          WELCOME TO MY BLOG
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Minimal. Clean. Focused on content.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors"
          >
            <span>Read Posts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/register"
            className="px-6 py-3 border-2 border-black hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
