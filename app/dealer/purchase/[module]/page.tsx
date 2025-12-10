"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const PURCHASE_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  direct: {
    description: "Direct purchase of vehicles from SMG manufacturing.",
    sections: [
      { title: "Purchase Orders" },
      { title: "Key Actions", description: "Create and submit purchase orders" },
      { title: "Order History", description: "Data table of direct purchases (Coming Soon)" },
    ],
  },
  "dealer-purchase": {
    description: "Purchase vehicles from other dealers and sub-dealers.",
    sections: [
      { title: "Dealer Marketplace" },
      { title: "Key Actions", description: "Browse and purchase from other dealers" },
      { title: "Purchase Records", description: "Data table of dealer purchases (Coming Soon)" },
    ],
  },
  accessories: {
    description: "Purchase accessories for inventory.",
    sections: [
      { title: "Accessory Procurement" },
      { title: "Key Actions", description: "Order accessories in bulk" },
      { title: "Purchase Orders", description: "Data table of accessory purchases (Coming Soon)" },
    ],
  },
  merchandize: {
    description: "Purchase branded merchandise and promotional items.",
    sections: [
      { title: "Merchandise Procurement" },
      { title: "Key Actions", description: "Order merchandise supplies" },
      { title: "Purchase Records", description: "Data table of merchandise purchases (Coming Soon)" },
    ],
  },
  recall: {
    description: "Process recall option purchases for recalled vehicles.",
    sections: [
      { title: "Recall Options" },
      { title: "Key Actions", description: "Purchase recall options" },
      { title: "Recall History", description: "Data table of recall purchases (Coming Soon)" },
    ],
  },
}

export default function DealerPurchasePage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("dealer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = DEALER_SECTIONS.purchase.find((m) => m.id === module)
  const content = PURCHASE_CONTENT[module] || { description: "Purchase module details", sections: [] }

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
            { label: "Purchase" },
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
