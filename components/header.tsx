"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { NavigationSection } from "@/types/navigation"

interface HeaderProps {
  onSectionChange: (section: NavigationSection) => void
  currentSection: NavigationSection
}

export default function Header({ onSectionChange, currentSection }: HeaderProps) {
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(false)
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be handled by a secure authentication service
    // For demo purposes, we'll use environment variables or fallback to demo credentials
    const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "andrew@king.com"
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "AndrewKing123!@#"

    if (credentials.email === validEmail && credentials.password === validPassword) {
      router.push("/admin")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <>
      <header className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center">
          <button
            onClick={() => onSectionChange("home")}
            className="text-white text-lg font-medium hover:text-teal-300 transition-colors duration-200"
          >
            Andrew King
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center"
          >
            Login
          </button>
        </div>
      </header>

      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div
            className="bg-gray-900/85 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 animate-modal-enter"
            style={{ filter: "url(#glass-effect)" }}
          >
            <h3 className="text-2xl font-medium text-white mb-6">Login</h3>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-white/20 rounded-lg mb-4 text-white placeholder-white/50 focus:border-teal-400 focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full p-3 bg-gray-800/50 border border-white/20 rounded-lg mb-6 text-white placeholder-white/50 focus:border-teal-400 focus:outline-none"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 py-3 bg-gray-600/20 hover:bg-gray-600/30 text-white rounded-lg transition-colors duration-200 border border-gray-400/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
