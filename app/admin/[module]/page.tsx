"use client"
import SparePartListSection from "@/components/admin/SparePartListSection"

import MarketingSection from "@/components/admin/MarketingCampaignSection"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import LabourChartSection from "@/components/admin/LabourChartSection"
import GovernmentAnnouncementSection from "@/components/admin/GovernmentAnnouncementSection"

import PortalHeader from "@/components/portal-header"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"

import DealerOnboardingSection from "@/components/admin/DealerOnboardingSection"
import EventManagementSection from "@/components/admin/EventManagementSection"
import NewModelListSection from "@/components/admin/NewModelListSection"

import AdminSidebar from "@/components/admin/admin-sidebar"
import { ADMIN_MODULES } from "@/lib/portal-modules"

const MODULE_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  "new-dealer-onboarding": {
    description:
      "Onboard new dealers into the SMG network with streamlined documentation and verification.",
    sections: [
      {
        title: "Dealer Information",
        description: "Data table of registered dealers (Coming Soon)",
      },
    ],
  },

  marketing: {
    description: "Create campaigns and manage marketing companies for SMG.",
    sections: [],
  },

  "labour-chart-list": {
    description:
      "Manage labor rates and service charges across all SMG service centers.",
    sections: [],
  },

  "spare-part-list": {
    description:
      "Maintain comprehensive inventory of spare parts and components.",
    sections: [
      { title: "Inventory Summary" },
      { title: "Key Actions", description: "Add, edit, or remove parts" },
      {
        title: "Parts Database",
        description: "Data table of all spare parts (Coming Soon)",
      },
    ],
  },

  "new-model-list": {
    description:
      "Track and manage new vehicle models and their availability.",
    sections: [
      { title: "Model Summary" },
      {
        title: "Key Actions",
        description: "Add new models and specifications",
      },
      {
        title: "Model Catalogue",
        description: "Data table of all models (Coming Soon)",
      },
    ],
  },

  "roadside-assistance-chart": {
    description:
      "Define and manage roadside assistance rates and service coverage.",
    sections: [
      { title: "Assistance Chart Summary" },
      { title: "Coverage Configuration" },
      {
        title: "Service Providers",
        description: "Data table of partner providers (Coming Soon)",
      },
    ],
  },

  "warranty-dates": {
    description:
      "Manage warranty receiving and forwarding dates for all vehicles.",
    sections: [
      { title: "Warranty Schedule" },
      {
        title: "Key Actions",
        description: "Update warranty dates and dealer assignments",
      },
      {
        title: "Warranty Records",
        description: "Data table of warranty information (Coming Soon)",
      },
    ],
  },

  "sales-to-dealer": {
    description:
      "Track and manage vehicle sales distributed to dealers.",
    sections: [
      { title: "Sales Summary" },
      {
        title: "Key Actions",
        description: "Record and track dealer sales",
      },
      {
        title: "Sales History",
        description: "Data table of sales transactions (Coming Soon)",
      },
    ],
  },

  "hsrp-booking-confirmation": {
    description:
      "Manage HSRP (High Security Registration Plate) booking confirmations.",
    sections: [
      { title: "HSRP Confirmation Summary" },
      {
        title: "Key Actions",
        description: "Confirm or reject HSRP bookings",
      },
      {
        title: "Booking Records",
        description: "Data table of HSRP bookings (Coming Soon)",
      },
    ],
  },

  "service-training-modules": {
    description:
      "Design and assign service technician training programs.",
    sections: [
      { title: "Training Modules" },
      {
        title: "Key Actions",
        description: "Create or assign training modules",
      },
      {
        title: "Training Catalog",
        description: "Data table of available modules (Coming Soon)",
      },
    ],
  },

  "regional-technicians": {
    description:
      "Manage regional technician assignments and handle complaint requests.",
    sections: [
      { title: "Technician Roster" },
      {
        title: "Complaint Management",
        description: "Review and resolve technician complaints",
      },
      {
        title: "Technician Records",
        description: "Data table of regional technicians (Coming Soon)",
      },
    ],
  },

  "training-meetings": {
    description:
      "Organize and track training sessions and meeting information.",
    sections: [{ title: "Event Manager" }],
  },

  "government-announcements": {
    description:
      "Publish and manage government official announcements for dealers.",
    sections: [],
  },

  "spare-part-orders": {
    description:
      "Track spare part orders, receipts, and vendor transfers.",
    sections: [
      { title: "Order Summary" },
      {
        title: "Key Actions",
        description: "Process orders and transfers",
      },
      {
        title: "Order History",
        description: "Data table of orders (Coming Soon)",
      },
    ],
  },

  recall: {
    description:
      "Manage vehicle recalls and recall option processing.",
    sections: [
      { title: "Active Recalls" },
      {
        title: "Key Actions",
        description: "Create or update recall requests",
      },
      {
        title: "Recall Register",
        description: "Data table of recalls (Coming Soon)",
      },
    ],
  },
}

export default function AdminModulePage() {
  const params = useParams()
  const module = params.module as string
  const router = useRouter()
  const [currentRole] = useState<"admin" | "dealer" | "customer">("admin")

  const moduleData = ADMIN_MODULES.find((m) => m.id === module)
  const content =
    MODULE_CONTENT[module] || { description: "Module details", sections: [] }

  if (!moduleData) {
    return <div className="p-8">Module not found</div>
  }

  return (
    <>
      <PortalHeader role="Admin" />

      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">

        {/* ✅ SIDEBAR */}
        <AdminSidebar />

        {/* ✅ MAIN CONTENT */}
        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">

          <ModuleDetailPage
            title={moduleData.label}
            description={content.description}
            breadcrumbs={[
              { label: "Admin", href: "/admin/admin-dashboard" },
              { label: moduleData.label },
            ]}
            backHref="/admin/admin-dashboard"
          >
            <div className="space-y-6">

              {module === "new-dealer-onboarding" && (
                <DealerOnboardingSection />
              )}

              {module === "training-meetings" && (
                <EventManagementSection />
              )}

              {module === "new-model-list" && (
                <NewModelListSection />
              )}

              {module === "marketing" && <MarketingSection />}

              {module === "labour-chart-list" && (
                <LabourChartSection />
              )}

              {module === "government-announcements" && (
                <GovernmentAnnouncementSection />
              )}
              {module === "spare-part-list" && (
              <SparePartListSection />
              )}

              {![
                "new-dealer-onboarding",
                "training-meetings",
                "new-model-list",
              ].includes(module) &&
                content.sections.map((section, idx) => (
                  <PlaceholderSection
                    key={idx}
                    title={section.title}
                    description={section.description}
                  />
                ))}
            </div>
          </ModuleDetailPage>

        </main>
      </div>
    </>
  )
}
