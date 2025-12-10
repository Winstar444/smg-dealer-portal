"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const SPARE_PARTS_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  purchase: {
    description: "Purchase spare parts for service inventory.",
    sections: [
      { title: "Procurement Summary" },
      { title: "Key Actions", description: "Create part purchase orders" },
      { title: "Purchase Orders", description: "Data table of part purchases (Coming Soon)" },
    ],
  },
  sales: {
    description: "Sell spare parts to customers and other dealers.",
    sections: [
      { title: "Sales Summary" },
      { title: "Key Actions", description: "Record spare part sales" },
      { title: "Sales History", description: "Data table of part sales (Coming Soon)" },
    ],
  },
  "price-list": {
    description: "View and manage spare part pricing.",
    sections: [
      { title: "Pricing Summary" },
      { title: "Key Actions", description: "Update part prices" },
      { title: "Parts Catalog", description: "Data table of spare parts and pricing (Coming Soon)" },
    ],
  },
  ordering: {
    description: "Place orders for spare parts from suppliers.",
    sections: [
      { title: "Order Summary" },
      { title: "Key Actions", description: "Submit new part orders" },
      { title: "Order Tracking", description: "Data table of active orders (Coming Soon)" },
    ],
  },
}

export default function DealerSparepartsPage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("dealer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = DEALER_SECTIONS.spare_parts.find((m) => m.id === module)
  const content = SPARE_PARTS_CONTENT[module] || { description: "Spare parts module details", sections: [] }

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
            { label: "Spare Parts" },
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
