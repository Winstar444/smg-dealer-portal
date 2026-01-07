"use client"

import { useParams, useRouter } from "next/navigation"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"
import CustomerSidebar from "@/components/CustomerSidebar"
import { useState } from "react"

const TECHNICIAN_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  details: {
    description: "View detailed information about assigned service technicians.",
    sections: [
      {
        title: "Technician Profile",
        description: "Details and qualifications",
      },
      { title: "Contact Information" },
      {
        title: "Technician Records",
        description:
          "Data table of technician details (Coming Soon)",
      },
    ],
  },
  complaints: {
    description: "Review and respond to incoming service complaints.",
    sections: [
      {
        title: "Complaint Dashboard",
        description: "Overview of incoming complaints",
      },
      {
        title: "Complaint Details",
        description: "View complaint specifics",
      },
      {
        title: "Complaint History",
        description:
          "Data table of all complaints (Coming Soon)",
      },
    ],
  },
  "site-visits": {
    description:
      "Track technician site visits and on-site service activities.",
    sections: [
      {
        title: "Visit Schedule",
        description: "Upcoming site visits",
      },
      {
        title: "Visit Status",
        description: "Current and completed visits",
      },
      {
        title: "Visit History",
        description:
          "Data table of site visits (Coming Soon)",
      },
    ],
  },
  "feedback-form": {
    description:
      "Provide feedback on technician performance and service quality.",
    sections: [
      {
        title: "Feedback Form",
        description: "Submit feedback on service",
      },
      {
        title: "Rating Options",
        description: "Rate various service aspects",
      },
      {
        title: "Submission History",
        description:
          "Data table of feedback (Coming Soon)",
      },
    ],
  },
  "satisfaction-form": {
    description:
      "Complete customer satisfaction survey after service completion.",
    sections: [
      {
        title: "Satisfaction Survey",
        description: "Rate your satisfaction",
      },
      {
        title: "Feedback Items",
        description: "Specific areas to evaluate",
      },
      {
        title: "Survey History",
        description:
          "Data table of responses (Coming Soon)",
      },
    ],
  },
}

export default function CustomerTechnicianPage() {
  const params = useParams()
  const module = params.module as string
  const [currentRole] =
    useState<"admin" | "dealer" | "customer">("customer")
  const router = useRouter()

  const handleRoleChange = (
    role: "admin" | "dealer" | "customer"
  ) => {
    router.push(`/${role}-dashboard`)
  }

  const moduleData = CUSTOMER_SECTIONS.technician.find(
    (m) => m.id === module
  )
  const content =
    TECHNICIAN_CONTENT[module] || {
      description: "Technician tools details",
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

      {/* 🔹 LAYOUT WRAPPER (THIS WAS MISSING) */}
      <div className="flex pt-16">
        
        {/* ✅ CUSTOMER SIDEBAR */}
        <CustomerSidebar />

        {/* ✅ MAIN CONTENT */}
        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">
          <ModuleDetailPage
            title={moduleData.label}
            description={content.description}
            breadcrumbs={[
              { label: "Customer", href: "/customer/dashboard" },
              { label: "Service Technician Tools" },
              { label: moduleData.label },
            ]}
            backHref="/customer/dashboard"
          >
            <div className="space-y-6">
              {content.sections.map((section, idx) => (
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
