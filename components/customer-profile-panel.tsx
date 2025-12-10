"use client"

import type React from "react"
import type { RefObject } from "react"

import { X, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useRef, useEffect } from "react"

interface CustomerProfilePanelProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  userEmail?: string

  // ✅ FIXED TYPE — must allow null
  avatarRef?: RefObject<HTMLButtonElement | null>

  onNameSaved?: (name: string) => void
}

export default function CustomerProfilePanel({
  isOpen,
  onClose,
  userName,
  userEmail = "",
  avatarRef,
  onNameSaved,
}: CustomerProfilePanelProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    vehicleModel: "",
    registrationNumber: "",
    dateOfPurchase: "",
  })

  const [lastSavedData, setLastSavedData] = useState(formData)
  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    if (!isOpen || !avatarRef?.current || !popupRef.current) return

    const avatarRect = avatarRef.current.getBoundingClientRect()
    const popupWidth = 320
    const popupHeight = 360
    const gap = 8

    let left = avatarRect.left + avatarRect.width / 2 - popupWidth / 2
    let top = avatarRect.bottom + gap

    const minLeft = 16
    const maxLeft = window.innerWidth - popupWidth - 16

    if (left < minLeft) {
      left = minLeft
    } else if (left > maxLeft) {
      left = maxLeft
    }

    if (top + popupHeight > window.innerHeight - 16) {
      top = avatarRect.top - popupHeight - gap
    }

    setPopupPosition({ top, left })
  }, [isOpen, avatarRef])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveChanges = () => {
    setLastSavedData(formData)
    setDisplayName(formData.name)
    onNameSaved?.(formData.name)
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  const handleCancel = () => {
    setFormData(lastSavedData)
  }

  if (!isOpen) return null

  return (
    <div
      ref={popupRef}
      className="fixed bg-white rounded-lg shadow-lg z-50 w-80 border border-gray-200 max-h-96 flex flex-col"
      style={{
        top: `${popupPosition.top}px`,
        left: `${popupPosition.left}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="border-b border-gray-200 p-2 flex flex-col items-center flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 self-end -mr-1 -mt-1 h-6 w-6"
        >
          <X className="w-3 h-3" />
        </Button>

        <div className="flex flex-col items-center w-full">
          {/* Avatar */}
          <div className="relative mb-1.5">
            <div className="w-12 h-12 rounded-full bg-[#1A2A5A] flex items-center justify-center text-white overflow-hidden">
              {profileImage ? (
                <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#1A2A5A] hover:bg-[#0F1A3A] text-white rounded-full p-0.5 transition-colors"
            >
              <Upload className="w-2.5 h-2.5" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          <h2 className="text-xs font-bold text-[#1A2A5A]">{displayName}</h2>
          <p className="text-xs text-gray-600 mt-0.5">Customer Profile</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-2 overflow-y-auto flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="profile" className="text-xs">
              Profile
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-1.5 mt-0">
            {showSaveMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-2 py-1 rounded-lg text-xs">
                Profile updated successfully.
              </div>
            )}

            {/* Form */}
            <div className="space-y-1.5">
              <div>
                <label className="text-xs font-semibold text-gray-600">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="Enter your name"
                  className="w-full mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleFieldChange("mobile", e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Vehicle Model</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => handleFieldChange("vehicleModel", e.target.value)}
                  placeholder="Enter vehicle model"
                  className="w-full mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Registration Number</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => handleFieldChange("registrationNumber", e.target.value)}
                  placeholder="Enter registration number"
                  className="w-full mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Date of Purchase</label>
                <input
                  type="date"
                  value={formData.dateOfPurchase}
                  onChange={(e) => handleFieldChange("dateOfPurchase", e.target.value)}
                  className="w-full mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="flex gap-1.5 mt-2 pt-2 border-t border-gray-200">
              <Button
                onClick={handleSaveChanges}
                className="flex-1 bg-[#1A2A5A] hover:bg-[#0F1A3A] text-white text-xs py-1 h-7"
              >
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 bg-transparent text-xs py-1 h-7"
              >
                Cancel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-1.5 mt-0">
            <div>
              <h3 className="text-xs font-semibold text-gray-700">Service History</h3>
              <p className="text-xs text-gray-600 mt-1">No service history yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
