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
            Admin
          </button>
        </div>
      </header>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-medium mb-4 text-black">Admin Login</h3>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full p-2 border rounded mb-3 text-black"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full p-2 border rounded mb-4 text-black"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
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
