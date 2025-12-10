"use client"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import CustomerPortalHeader from "@/components/customer-portal-header"
import ModuleSection from "@/components/module-section"
import CustomerSidebar from "@/components/customer-sidebar"
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules"

const SECTION_OPTIONS = [
  { id: "service", label: "Service" },
  { id: "technician", label: "Service Technician Tools" },
  { id: "marketing", label: "Marketing" },
]

function extractNameFromEmail(email: string): string {
  if (!email) return ""
  const nameWithoutDomain = email.split("@")[0]
  return nameWithoutDomain
    .split(/[._-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export default function CustomerDashboard() {
  const [activeSection, setActiveSection] = useState("service")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const storedEmail = localStorage.getItem("customerEmail") || "john.doe@gmail.com"
    setEmail(storedEmail)
    setUserName(extractNameFromEmail(storedEmail))
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)",
      }}
    >
      <CustomerPortalHeader userName={userName} userEmail={email} />

      <CustomerSidebar
        sections={SECTION_OPTIONS}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="max-w-6xl px-6 py-8">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-300 text-[#1A2A5A] hover:bg-gray-50 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
          <span className="text-sm font-medium">Sections</span>
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#1A2A5A] mb-2">Customer Dashboard</h2>
          <p className="text-gray-600">Track services, view information, and manage your account</p>
        </div>

        <div className="space-y-12">
          {activeSection === "service" && <ModuleSection title="Service" modules={CUSTOMER_SECTIONS.service} />}
          {activeSection === "technician" && (
            <ModuleSection title="Service Technician Tools" modules={CUSTOMER_SECTIONS.technician} />
          )}
          {activeSection === "marketing" && <ModuleSection title="Marketing" modules={CUSTOMER_SECTIONS.marketing} />}
        </div>
      </main>
    </div>
  )
}
