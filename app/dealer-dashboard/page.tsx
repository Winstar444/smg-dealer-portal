"use client"
import { useState } from "react"
import { Menu } from "lucide-react"
import DealerPortalHeader from "@/components/dealer-portal-header"
import DealerSidebar from "@/components/dealer-sidebar"
import ModuleSection from "@/components/module-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"

export default function DealerDashboard() {
  const [activeSection, setActiveSection] = useState("services")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sectionOptions = [
    { id: "services", label: "Service" },
    { id: "sales", label: "Sales" },
    { id: "purchase", label: "Purchase" },
    { id: "spare_parts", label: "Spare Parts" },
    { id: "feedback", label: "Feedback" },
    { id: "events", label: "Events & Training" },
    { id: "announcements", label: "Announcements" },
  ]

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)",
      }}
    >
      <DealerPortalHeader />

      <DealerSidebar
        sections={sectionOptions}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="ml-64 max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#1A2A5A] mb-2">Dealer Dashboard</h2>
          <p className="text-gray-600">Manage services, sales, purchases, spare parts, and customer interactions.</p>
        </div>

        <div className="space-y-12">
          {activeSection === "services" && <ModuleSection title="Services" modules={DEALER_SECTIONS.services} />}
          {activeSection === "sales" && <ModuleSection title="Sales" modules={DEALER_SECTIONS.sales} />}
          {activeSection === "purchase" && <ModuleSection title="Purchase" modules={DEALER_SECTIONS.purchase} />}
          {activeSection === "spare_parts" && (
            <ModuleSection title="Spare Parts" modules={DEALER_SECTIONS.spare_parts} />
          )}
          {activeSection === "feedback" && <ModuleSection title="Feedback" modules={DEALER_SECTIONS.feedback} />}
          {activeSection === "events" && <ModuleSection title="Events & Training" modules={DEALER_SECTIONS.events} />}
          {activeSection === "announcements" && (
            <ModuleSection title="Announcements" modules={DEALER_SECTIONS.announcements} />
          )}
        </div>
      </main>
    </div>
  )
}
