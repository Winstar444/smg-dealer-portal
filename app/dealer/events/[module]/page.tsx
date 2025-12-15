"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const EVENTS_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  "dealer-meetings": {
    description: "Schedule and track dealer meetings and company trips.",
    sections: [
      { title: "Events Calendar" },
      { title: "Key Actions", description: "RSVP or register for events" },
      { title: "Event Records", description: "Data table of meetings and trips (Coming Soon)" },
    ],
  },
  "technician-training": {
    description: "Track technician training programs and certifications.",
    sections: [
      { title: "Training Schedule" },
      { title: "Key Actions", description: "Register technicians for training" },
      { title: "Training Progress", description: "Data table of training records (Coming Soon)" },
    ],
  },
}

export default function DealerEventsPage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("dealer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = DEALER_SECTIONS.events.find((m) => m.id === module)
  const content = EVENTS_CONTENT[module] || { description: "Events module details", sections: [] }

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
            { label: "Events & Training" },
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
