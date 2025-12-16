"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ModuleDetailPage from "@/components/module-detail-page"
import PlaceholderSection from "@/components/placeholder-section"
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules"
import PortalHeader from "@/components/portal-header"

interface LabourChart {
  job_code: string
  job_description: string
  labour_cost: number
  category: string
}

const SERVICE_CONTENT: Record<
  string,
  {
    description: string
    sections: Array<{ title: string; description?: string }>
  }
> = {
  "live-tracking": {
    description:
      "Track your vehicle servicing in real-time and receive service information updates.",
    sections: [
      { title: "Service Status", description: "Real-time tracking of your service appointment" },
      { title: "Technician Information", description: "Details about assigned technician" },
      { title: "Service History", description: "Data table of past services (Coming Soon)" },
    ],
  },
  "labour-estimate": {
    description: "View estimated labour charges for your vehicle service.",
    sections: [{ title: "Service Estimate" }]
  },
  "amc-renewal": {
    description: "Manage and renew your Annual Maintenance Contract.",
    sections: [
      { title: "AMC Status" },
      { title: "Renewal Options" },
      { title: "Coverage Details (Coming Soon)" },
    ],
  },
}

export default function CustomerServicePage() {
  const params = useParams()
  const module = params.module as string
  const router = useRouter()

  const [labours, setLabours] = useState<LabourChart[]>([])
  const [loading, setLoading] = useState(false)

  const moduleData = CUSTOMER_SECTIONS.service.find((m) => m.id === module)
  const content = SERVICE_CONTENT[module] || {
    description: "Service module details",
    sections: [],
  }

  // 🔥 FETCH LABOUR DATA ONLY FOR LABOUR ESTIMATE
  useEffect(() => {
    if (module === "labour-estimate") {
      fetchLabours()
    }
  }, [module])

  const fetchLabours = async () => {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:4000/customer/labour-charts")
      const data = await res.json()
      setLabours(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to load labour charts", err)
    } finally {
      setLoading(false)
    }
  }

  if (!moduleData) {
    return <div className="p-8">Module not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader role="customer" />

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
              <div key={idx}>
                <PlaceholderSection
                  title={section.title}
                  description={section.description}
                />

                {/* ✅ REAL LABOUR TABLE */}
                {module === "labour-estimate" && section.title === "Service Estimate" && (
                  <div className="bg-white border rounded-xl p-6 mt-4">
                    {loading ? (
                      <p>Loading...</p>
                    ) : labours.length === 0 ? (
                      <p className="text-gray-500">No labour data available</p>
                    ) : (
                      <table className="w-full border">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 border">Job Code</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Estimated Cost (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {labours.map((item, i) => (
                            <tr key={i} className="text-center">
                              <td className="p-2 border">{item.job_code}</td>
                              <td className="p-2 border">{item.job_description}</td>
                              <td className="p-2 border">{item.category}</td>
                              <td className="p-2 border">₹{item.labour_cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ModuleDetailPage>
      </main>
    </div>
  )
}
