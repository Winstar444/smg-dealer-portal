"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const SERVICE_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  "warranty-claim": {
    description:
      "Manage warranty claims with acceptance and rejection capabilities. Track claim history and view Excel reports.",
    sections: [
      { title: "Claim Summary", description: "Overview of pending and processed claims" },
      { title: "Key Actions", description: "Accept or reject warranty claims" },
      { title: "Claim History", description: "Data table and Excel export of warranty claims (Coming Soon)" },
    ],
  },
  "test-ride": {
    description: "Schedule and manage test rides for potential customers.",
    sections: [
      { title: "Test Ride Summary" },
      { title: "Key Actions", description: "Schedule new test rides" },
      { title: "Bookings", description: "Data table of scheduled test rides (Coming Soon)" },
    ],
  },
  "quotation-maker": {
    description: "Generate quotes for customers on vehicles, accessories, and services.",
    sections: [
      { title: "Quote Summary" },
      { title: "Key Actions", description: "Create new quotations" },
      { title: "Quote History", description: "Data table of generated quotes (Coming Soon)" },
    ],
  },
  "servicing-station": {
    description: "Manage service station operations and maintenance scheduling.",
    sections: [
      { title: "Station Overview" },
      { title: "Scheduling", description: "Schedule service appointments" },
      { title: "Operations", description: "Data table of service records (Coming Soon)" },
    ],
  },
  technicians: {
    description: "Manage technician roster and log customer complaints about service quality.",
    sections: [
      { title: "Technician Roster" },
      { title: "Complaint Logging", description: "Record and track technician performance issues" },
      { title: "Staff Records", description: "Data table of technicians (Coming Soon)" },
    ],
  },
  "accessories-price-list": {
    description: "View and manage accessory pricing for customer sales.",
    sections: [
      { title: "Pricing Summary" },
      { title: "Key Actions", description: "Update accessory prices" },
      { title: "Accessory Catalog", description: "Data table of available accessories (Coming Soon)" },
    ],
  },
  "merchandize-price-list": {
    description: "Manage merchandise pricing and availability.",
    sections: [
      { title: "Merchandise Summary" },
      { title: "Key Actions", description: "Update merchandise prices" },
      { title: "Merchandise Catalog", description: "Data table of merchandise items (Coming Soon)" },
    ],
  },
  "technician-data-update": {
    description: "Update technician profiles, certifications, and contact information.",
    sections: [
      { title: "Update Summary" },
      { title: "Key Actions", description: "Edit technician profiles and details" },
      { title: "Technician Database", description: "Data table of technician information (Coming Soon)" },
    ],
  },
  "pdi-inspection": {
    description: "Pre-Delivery Inspection sheet management for new vehicles.",
    sections: [
      { title: "PDI Summary" },
      { title: "Inspection Forms", description: "View and fill PDI inspection sheets" },
      { title: "PDI Records", description: "Data table of inspection history (Coming Soon)" },
    ],
  },
  "roadside-assistance": {
    description: "Manage roadside assistance requests and emergency response.",
    sections: [
      { title: "Active Requests" },
      { title: "Key Actions", description: "Dispatch assistance or request emergency support" },
      { title: "Request History", description: "Data table of roadside assistance calls (Coming Soon)" },
    ],
  },
  amc: {
    description: "Annual Maintenance Contract management and tracking.",
    sections: [
      { title: "AMC Overview" },
      { title: "Key Actions", description: "Register or renew AMCs" },
      { title: "AMC Database", description: "Data table of active contracts (Coming Soon)" },
    ],
  },
  "hsrp-booking": {
    description: "High Security Registration Plate booking and confirmation.",
    sections: [
      { title: "Booking Summary" },
      { title: "Key Actions", description: "Create and manage HSRP bookings" },
      { title: "Booking Records", description: "Data table of HSRP bookings (Coming Soon)" },
    ],
  },
  "training-modules": {
    description: "Access and track technician training modules.",
    sections: [
      { title: "Available Modules" },
      { title: "Key Actions", description: "Assign training to technicians" },
      { title: "Training Progress", description: "Data table of completions (Coming Soon)" },
    ],
  },
  "regional-technicians": {
    description: "View details of regional technicians in your area.",
    sections: [
      { title: "Regional Roster" },
      { title: "Contact Information" },
      { title: "Technician Details", description: "Data table with full technician information (Coming Soon)" },
    ],
  },
  "resale-price": {
    description: "View resale valuation and pricing for used vehicles.",
    sections: [
      { title: "Valuation Summary" },
      { title: "Key Actions", description: "Request vehicle valuations" },
      { title: "Valuation History", description: "Data table of appraisals (Coming Soon)" },
    ],
  },
  "lead-management": {
    description: "Track and manage sales leads and customer inquiries.",
    sections: [
      { title: "Active Leads" },
      { title: "Key Actions", description: "Update lead status and follow-ups" },
      { title: "Lead Pipeline", description: "Data table of all leads (Coming Soon)" },
    ],
  },
}

export default function DealerServicePage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("dealer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = DEALER_SECTIONS.services.find((m) => m.id === module)
  const content = SERVICE_CONTENT[module] || { description: "Service module details", sections: [] }

  if (!moduleData) {
    return <div className="p-8">Module not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader role="Dealer" currentRole={currentRole} onRoleChange={handleRoleChange} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <ModuleDetailPage
          title={moduleData.label}
          description={content.description}
          breadcrumbs={[
            { label: "Dealer", href: "/dealer-dashboard" },
            { label: "Services" },
            { label: moduleData.label },
          ]}
          backHref="/dealer-dashboard"
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
