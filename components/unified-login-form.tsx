"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function UnifiedLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const emailLower = email.toLowerCase()
    let dashboardRoute = ""

    if (emailLower.includes("admin")) {
      dashboardRoute = "/admin-dashboard"
    } else if (emailLower.includes("dealer")) {
      dashboardRoute = "/dealer-dashboard"
    } else if (emailLower.includes("customer")) {
      dashboardRoute = "/customer/dashboard"
    } else {
      setError("Invalid demo credentials")
      setLoading(false)
      return
    }

    // Navigate to the appropriate dashboard
    router.push(dashboardRoute)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F6FA] to-white flex flex-col items-start justify-center px-4 pl-20 shadow-xl">
      {/* Login Card */}
      <div className="rounded-lg p-8 w-full max-w-md bg-background opacity-100 mx-[-80px]">
        {/* SMG Logo */}
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#1A2A5A]">SMG</h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1A2A5A] text-center mb-6">SMG Portal Login</h2>

        {/* Error Message */}
        {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-black"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-black"
              required
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A2A5A] hover:bg-[#0F1A3A] text-white font-semibold py-2 rounded-md transition-colors duration-200 mt-6"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Create Customer Account Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/customer-signup")}
            className="text-sm text-[#1A2A5A] hover:underline font-medium"
          >
            Create Customer Account
          </button>
        </div>
      </div>
    </main>
  )
}
