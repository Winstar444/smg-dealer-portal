"use client"

import type React from "react"

import { useState } from "react"
import { SMGLogo } from "./logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 flex items-center justify-center p-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary rounded-full mix-blend-multiply"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <SMGLogo />
          </div>

          {/* Title */}
          <h2 className="text-center text-xl md:text-2xl font-semibold text-foreground mb-8">
            SMG Dealer Management Portal
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email / Username
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-foreground cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2"
            >
              Login
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <button className="text-primary hover:underline text-sm font-medium">Forgot password?</button>
          </div>
        </div>
      </div>
    </div>
  )
}
