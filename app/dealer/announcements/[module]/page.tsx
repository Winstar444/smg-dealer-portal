"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const ANNOUNCEMENTS_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  government: {
    description: "Stay updated with important government authority announcements and compliance requirements.",
    sections: [
      { title: "Active Announcements" },
      { title: "Key Actions", description: "Review and acknowledge announcements" },
      { title: "Announcement Archive", description: "Data table of past announcements (Coming Soon)" },
    ],
  },
}

export default function DealerAnnouncementsPage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("dealer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = DEALER_SECTIONS.announcements.find((m) => m.id === module)
  const content = ANNOUNCEMENTS_CONTENT[module] || { description: "Announcements module details", sections: [] }

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
            { label: "Announcements" },
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
