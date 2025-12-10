"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const FEEDBACK_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  customer: {
    description: "Collect and manage customer feedback for service quality improvement.",
    sections: [
      { title: "Feedback Summary" },
      { title: "Key Actions", description: "View and respond to customer feedback" },
      { title: "Feedback Records", description: "Data table of all feedback (Coming Soon)" },
    ],
  },
}

export default function DealerFeedbackPage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("dealer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = DEALER_SECTIONS.feedback.find((m) => m.id === module)
  const content = FEEDBACK_CONTENT[module] || { description: "Feedback module details", sections: [] }

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
            { label: "Feedback" },
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
