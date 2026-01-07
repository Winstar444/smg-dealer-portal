"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import ActiveCampaignsSection from "@/components/customer/ActiveCampaignsSection"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import PortalHeader from "@/components/portal-header"
import CustomerSidebar from "@/components/CustomerSidebar"
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules"

const MARKETING_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  "new-campaign": {
    description:
      "View and explore current marketing campaigns and promotional offers.",
    sections: [
      { title: "Active Campaigns", description: "Currently running campaigns" },
      { title: "Campaign Summary", description: "Campaign details and offers" },
    ],
  },

  "budget-approval": {
    description:
      "Request and manage marketing budget approvals for campaigns.",
    sections: [
      { title: "Budget Overview" },
      {
        title: "Approval Requests",
        description: "Pending budget requests",
      },
      {
        title: "Budget History",
        description: "Data table of approvals (Coming Soon)",
      },
    ],
  },

  companies: {
    description:
      "Directory of marketing partner companies and agencies.",
    sections: [
      { title: "Partner Directory" },
      {
        title: "Company Profiles",
        description: "Detailed information on partners",
      },
      {
        title: "Company List",
        description: "Data table of marketing companies (Coming Soon)",
      },
    ],
  },
}

export default function CustomerMarketingPage() {
  const params = useParams()
  const module = params.module as string

  const [currentRole] = useState<"admin" | "dealer" | "customer">("customer")
  const router = useRouter()

  const handleRoleChange = (role: "admin" | "dealer" | "customer") => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = CUSTOMER_SECTIONS.marketing.find(
    (m) => m.id === module
  )

  const content =
    MARKETING_CONTENT[module] || {
      description: "Marketing module details",
      sections: [],
    }

  if (!moduleData) {
    return <div className="p-8">Module not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 FIXED HEADER */}
      <PortalHeader
        role="Customer"
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
      />

      {/* 🔹 LAYOUT WRAPPER */}
      <div className="flex pt-16">
        
        {/* ✅ CUSTOMER SIDEBAR (PERSISTENT) */}
        <CustomerSidebar />

        {/* ✅ MAIN CONTENT (ONLY THIS CHANGES) */}
        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">
          <ModuleDetailPage
            title={moduleData.label}
            description={content.description}
            breadcrumbs={[
              { label: "Customer", href: "/customer/dashboard" },
              { label: "Marketing" },
              { label: moduleData.label },
            ]}
            backHref="/customer/dashboard"
          >
            <div className="space-y-6">

              {/* ✅ REAL DATA COMPONENTS */}
              {module === "new-campaign" && <ActiveCampaignsSection />}

              {/* ✅ PLACEHOLDERS (UNCHANGED) */}
              {module !== "new-campaign" &&
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
    </div>
  )
}
