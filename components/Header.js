'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut } from 'lucide-react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="border-b-2 border-black bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:opacity-70 transition-opacity">
          BLOG
        </Link>

        <nav className="flex items-center gap-6">
          <Link 
            href="/blog" 
            className="hover:opacity-70 transition-opacity"
          >
            Posts
          </Link>

          {status === 'loading' ? (
            <div className="w-20 h-10 bg-gray-100 animate-pulse" />
          ) : session ? (
            <>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{session.user.name}</span>
              </div>

              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login"
                className="px-4 py-2 border-2 border-black hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
