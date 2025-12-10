"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CustomerSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleModel: "",
    registrationNumber: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // Show success message
    setShowSuccess(true)

    // Navigate back to login after 2 seconds
    setTimeout(() => {
      router.push("/customer-login")
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F6FA] to-white flex flex-col items-center justify-center px-4">
      {/* Signup Card */}
      <div className="rounded-lg p-8 w-full max-w-md shadow-xl bg-slate-200">
        {/* SMG Logo */}
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#1A2A5A]">SMG</h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#1A2A5A] text-center mb-2">Customer Sign Up</h2>

        {/* Subtext */}
        <p className="text-sm text-gray-600 text-center mb-6">Create your account to get started.</p>

        {/* Success Message */}
        {showSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
            <p className="text-green-700 font-medium">Account created successfully. You can now log in.</p>
          </div>
        ) : (
          /* Signup Form */
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-black"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-black"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
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
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-black"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-black"
                required
              />
            </div>

            {/* Vehicle Model Input (Optional) */}
            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Model (Optional)
              </label>
              <Input
                id="vehicleModel"
                name="vehicleModel"
                type="text"
                placeholder="Enter your vehicle model"
                value={formData.vehicleModel}
                onChange={handleChange}
                className="w-full border-black"
              />
            </div>

            {/* Registration Number Input (Optional) */}
            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number (Optional)
              </label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                placeholder="Enter your registration number"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full border-black"
              />
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              className="w-full bg-[#1A2A5A] hover:bg-[#0F1A3A] text-white font-semibold py-2 rounded-md transition-colors duration-200 mt-6"
            >
              Create Account
            </Button>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/customer-login")}
            className="text-sm text-[#1A2A5A] hover:underline font-medium"
          >
            Back to Login
          </button>
        </div>
      </div>
    </main>
  )
}
