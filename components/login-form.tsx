"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface LoginFormProps {
  role: "admin" | "dealer" | "customer"
  heading: string
  dashboardRoute: string
  showSignupOption?: boolean
}

export default function LoginForm({ role, heading, dashboardRoute, showSignupOption = false }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(dashboardRoute)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F6FA] to-white flex flex-col items-center justify-center px-4">
      {/* Login Card */}
      <div className="rounded-lg p-8 w-full max-w-md shadow-xl bg-slate-300">
        {/* SMG Logo */}
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#1A2A5A]">SMG</h1>
        </div>

        {/* Role Heading */}
        <h2 className="text-2xl font-bold text-[#1A2A5A] text-center mb-2">{heading}</h2>

        {/* Subtext */}
        <p className="text-sm text-gray-600 text-center mb-6">Sign in to continue to your dashboard.</p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email or username"
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
            className="w-full bg-[#1A2A5A] hover:bg-[#0F1A3A] text-white font-semibold py-2 rounded-md transition-colors duration-200 mt-6"
          >
            Login
          </Button>
        </form>

        {showSignupOption && (
          <>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Don't have an account?</p>
            </div>
            <Button
              onClick={() => router.push("/customer-signup")}
              className="w-full mt-3 bg-white border border-[#1A2A5A] text-[#1A2A5A] hover:bg-[#F5F6FA] font-semibold py-2 rounded-md transition-colors duration-200"
            >
              Create Account
            </Button>
          </>
        )}

        {/* Back to Role Selection */}
        <div className="mt-4 text-center">
          <button onClick={() => router.push("/")} className="text-sm text-[#1A2A5A] hover:underline font-medium">
            Back to role selection
          </button>
        </div>
      </div>
    </main>
  )
}
