"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Shield, Building2, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoginCard {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  route: string
}

export default function SMGHomepage() {
  const router = useRouter()

  const loginCards: LoginCard[] = [
    {
      id: "admin",
      icon: <Shield className="w-12 h-12" />,
      title: "Admin Login",
      description: "Access administrative tools and dealer management modules.",
      route: "/admin-login",
    },
    {
      id: "dealer",
      icon: <Building2 className="w-12 h-12" />,
      title: "Dealer Login",
      description: "Manage services, sales, purchases, technician operations, and more.",
      route: "/dealer-login",
    },
    {
      id: "customer",
      icon: <User className="w-12 h-12" />,
      title: "Customer Login",
      description: "View service tracking, AMC, HSRP status, enquiries, and more.",
      route: "/customer-login",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F6FA] to-white flex flex-col">
      {/* Header with SMG Logo */}
      <div className="flex justify-center pt-12 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-serif font-bold text-[#1A2A5A]">SMG</h1>
          <p className="text-sm text-gray-600 mt-2">Dealer Management Portal</p>
        </div>
      </div>

      {/* Login Cards Grid */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {loginCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col items-center text-center shadow-xl bg-slate-300"
            >
              {/* Icon */}
              <div className="text-[#1A2A5A] mb-4">{card.icon}</div>

              {/* Title */}
              <h2 className="text-xl font-bold text-[#1A2A5A] mb-3">{card.title}</h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 flex-grow">{card.description}</p>

              {/* Button */}
              <Button
                onClick={() => router.push(card.route)}
                className="w-full bg-[#1A2A5A] hover:bg-[#0F1A3A] text-white font-semibold py-2 rounded-md transition-colors duration-200"
              >
                Login Now
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 text-center text-gray-500 text-xs">
        <p>© 2025 SMG. All rights reserved.</p>
      </div>
    </main>
  )
}
