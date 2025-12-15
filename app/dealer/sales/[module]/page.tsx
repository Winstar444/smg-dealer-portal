"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { DEALER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import { useState } from "react"

const SALES_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  corporate: {
    description: "Manage corporate vehicle orders and bulk sales to corporate clients.",
    sections: [
      { title: "Corporate Orders", description: "Track active corporate orders" },
      { title: "Key Actions", description: "Create or update corporate orders" },
      { title: "Order Records", description: "Data table of corporate sales (Coming Soon)" },
    ],
  },
  retail: {
    description: "Manage retail vehicle sales directly to customers.",
    sections: [
      { title: "Sales Summary" },
      { title: "Key Actions", description: "Record new retail sales" },
      { title: "Sales History", description: "Data table of retail transactions (Coming Soon)" },
    ],
  },
  "dealer-to-dealer": {
    description: "Manage sub-dealer and inter-dealer vehicle sales.",
    sections: [
      { title: "D2D Transactions" },
      { title: "Key Actions", description: "Process dealer-to-dealer sales" },
      { title: "Transaction Records", description: "Data table of D2D sales (Coming Soon)" },
    ],
  },
  accessories: {
    description: "Sell accessories to customers and sub-dealers.",
    sections: [
      { title: "Accessory Sales" },
      { title: "Key Actions", description: "Record accessory transactions" },
      { title: "Sales Records", description: "Data table of accessory sales (Coming Soon)" },
    ],
  },
  merchandize: {
    description: "Sell branded merchandise and promotional items.",
    sections: [
      { title: "Merchandise Sales" },
      { title: "Key Actions", description: "Record merchandise transactions" },
      { title: "Sales Records", description: "Data table of merchandise sales (Coming Soon)" },
    ],
  },
}

export default function DealerSalesPage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] = useState<"admin" | "dealer" | "customer">("dealer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = DEALER_SECTIONS.sales.find((m) => m.id === module)
  const content = SALES_CONTENT[module] || { description: "Sales module details", sections: [] }

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
            { label: "Sales" },
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
