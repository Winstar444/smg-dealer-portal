"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const SERVICE_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  "live-tracking": {
    description: "Track your vehicle servicing in real-time and receive service information updates.",
    sections: [
      { title: "Service Status", description: "Real-time tracking of your service appointment" },
      { title: "Technician Information", description: "Details about assigned technician" },
      { title: "Service History", description: "Data table of past services (Coming Soon)" },
    ],
  },
  "labour-estimate": {
    description: "View estimated labour charges for your vehicle service.",
    sections: [
      { title: "Service Estimate" },
      { title: "Labor Breakdown", description: "Detailed breakdown of labour charges" },
      { title: "Estimate History", description: "Data table of previous estimates (Coming Soon)" },
    ],
  },
  "amc-renewal": {
    description: "Manage and renew your Annual Maintenance Contract.",
    sections: [
      { title: "AMC Status", description: "Current AMC status and coverage" },
      { title: "Renewal Options", description: "Available renewal plans" },
      { title: "Coverage Details", description: "Data table of AMC terms (Coming Soon)" },
    ],
  },
  "road-assistance": {
    description: "Call for roadside assistance and track emergency support requests.",
    sections: [
      { title: "Quick Call", description: "Emergency assistance button" },
      { title: "Active Requests", description: "Status of current assistance requests" },
      { title: "Request History", description: "Data table of past calls (Coming Soon)" },
    ],
  },
  "insurance-finance": {
    description: "Inquire about insurance and financing options for your vehicle.",
    sections: [
      { title: "Insurance Information" },
      { title: "Finance Options", description: "Available financing plans" },
      { title: "Inquiry Records", description: "Data table of inquiries (Coming Soon)" },
    ],
  },
  "charging-station": {
    description: "Upcoming feature: Find and locate EV charging stations.",
    sections: [
      { title: "Charging Network (Coming Soon)" },
      { title: "Station Locator", description: "Find nearby charging stations" },
      { title: "Reservation System", description: "Data table of available stations (Coming Soon)" },
    ],
  },
  "hsrp-info": {
    description: "View information about your High Security Registration Plate.",
    sections: [
      { title: "HSRP Status", description: "Current status and details" },
      { title: "Application Details" },
      { title: "HSRP Records", description: "Data table of plate information (Coming Soon)" },
    ],
  },
  "product-enquiry": {
    description: "Inquire about vehicle models, spare parts, accessories, and merchandise.",
    sections: [
      { title: "Model Information" },
      { title: "Parts & Accessories", description: "Browse and inquire about parts" },
      { title: "Inquiry Status", description: "Data table of inquiries (Coming Soon)" },
    ],
  },
  events: {
    description: "Stay updated with upcoming SMG events and activities.",
    sections: [
      { title: "Upcoming Events" },
      { title: "Registration", description: "Register for events" },
      { title: "Event Calendar", description: "Data table of all events (Coming Soon)" },
    ],
  },
  "resale-request": {
    description: "Request resale valuation and buyback options for your vehicle.",
    sections: [
      { title: "Valuation Request", description: "Submit vehicle for valuation" },
      { title: "Offer Details", description: "View buyback offers" },
      { title: "Request History", description: "Data table of valuations (Coming Soon)" },
    ],
  },
}

export default function CustomerServicePage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("customer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = CUSTOMER_SECTIONS.service.find((m) => m.id === module)
  const content = SERVICE_CONTENT[module] || { description: "Service module details", sections: [] }

  if (!moduleData) {
    return <div className="p-8">Module not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader role="Customer" currentRole={currentRole} onRoleChange={handleRoleChange} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <ModuleDetailPage
          title={moduleData.label}
          description={content.description}
          breadcrumbs={[
            { label: "Customer", href: "/customer-dashboard" },
            { label: "Service" },
            { label: moduleData.label },
          ]}
          backHref="/customer-dashboard"
        >
          <div className="space-y-6">
            {content.sections.map((section, idx) => (
              <PlaceholderSection key={idx} title={section.title} description={section.description} />
            ))}
          </div>
        </ModuleDetailPage>
      </main>
    </div>
  )
}
