"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import CustomerProfilePanel from "./customer-profile-panel"

interface CustomerPortalHeaderProps {
  userName: string
  userEmail?: string
  onProfileOpen?: () => void
  onProfileClose?: () => void
}

export default function CustomerPortalHeader({
  userName,
  userEmail = "",
  onProfileOpen,
  onProfileClose,
}: CustomerPortalHeaderProps) {
  const router = useRouter()
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [savedName, setSavedName] = useState("")
  const avatarRef = useRef<HTMLButtonElement>(null)

  const handleLogout = () => {
    router.push("/login")
  }

  const handleProfileOpen = () => {
    setIsPanelOpen(true)
    onProfileOpen?.()
  }

  const handleProfileClose = () => {
    setIsPanelOpen(false)
    onProfileClose?.()
  }

  const tooltipText = savedName || "Profile"

  const handleNameSaved = (name: string) => {
    setSavedName(name)
  }

  return (
    <>
      <header
        className="bg-white border-b border-gray-200 sticky top-0 z-40"
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Dashboard Label */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-bold text-[#1A2A5A]">SMG</h1>
            <div className="w-px h-6 bg-[#DCE2EB] mx-3" />
            <span className="text-base font-medium text-[#1A2A5A]">Customer Dashboard</span>
          </div>

          {/* Right Section: Avatar and Logout */}
          <div className="flex items-center gap-3">
            {/* Avatar with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    ref={avatarRef}
                    onClick={handleProfileOpen}
                    className="w-10 h-10 rounded-full bg-[#1A2A5A] hover:bg-[#0F1A3A] flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-[#1A2A5A] text-white border-0">
                  {tooltipText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <CustomerProfilePanel
        isOpen={isPanelOpen}
        onClose={handleProfileClose}
        userName={userName}
        userEmail={userEmail}
        avatarRef={avatarRef}
        onNameSaved={handleNameSaved}
      />
    </>
  )
}
