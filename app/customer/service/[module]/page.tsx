"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ModuleDetailPage from "@/components/module-detail-page";
import PlaceholderSection from "@/components/placeholder-section";
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules";
import PortalHeader from "@/components/portal-header";
import CustomerSidebar from "@/components/CustomerSidebar";

interface LabourChart {
  job_code: string;
  job_description: string;
  labour_cost: number;
  category: string;
}

interface SectionConfig {
  title: string;
  description?: string;
}

interface ServiceContentConfig {
  description: string;
  sections: SectionConfig[];
}

const SERVICE_CONTENT: Record<string, ServiceContentConfig> = {
  "live-tracking": {
    description: "Track your vehicle servicing in real-time.",
    sections: [
      { title: "Service Status" },
      { title: "Technician Information" },
      { title: "Service History (Coming Soon)" },
    ],
  },

  "labour-estimate": {
    description: "View estimated labour charges for your vehicle service.",
    sections: [{ title: "Service Estimate" }],
  },

  "amc-renewal": {
    description: "Manage and renew your Annual Maintenance Contract.",
    sections: [
      { title: "AMC Status" },
      { title: "Renewal Options" },
      { title: "Coverage Details (Coming Soon)" },
    ],
  },

  "road-assistance": {
    description: "Get immediate help for vehicle breakdowns and emergencies.",
    sections: [
      { title: "Request Road Assistance" },
      { title: "Assistance Status" },
    ],
  },

  "insurance-finance": {
    description: "Insurance and finance related enquiries.",
    sections: [
      { title: "Insurance Enquiry" },
      { title: "Finance Options" },
    ],
  },

  "charging-station": {
    description: "Find EV charging stations and related information.",
    sections: [
      { title: "Nearby Charging Stations" },
      { title: "Charging Plans (Coming Soon)" },
    ],
  },

  "hsrp-info": {
    description: "High Security Registration Plate information.",
    sections: [
      { title: "HSRP Status" },
      { title: "Apply for HSRP" },
    ],
  },

  "product-enquiry": {
    description: "Enquire about products and accessories.",
    sections: [
      { title: "Available Products" },
      { title: "Submit Enquiry" },
    ],
  },

  events: {
    description: "Upcoming events and promotional activities.",
    sections: [
      { title: "Upcoming Events" },
      { title: "Past Events" },
    ],
  },

  "resale-request": {
    description: "Request resale valuation for your vehicle.",
    sections: [
      { title: "Submit Resale Request" },
      { title: "Request History" },
    ],
  },
};

export default function CustomerServicePage() {
  const params = useParams<{ module?: string }>();

  // ✅ SAFELY NORMALIZE MODULE
  const module = typeof params.module === "string" ? params.module : "";

  const [labours, setLabours] = useState<LabourChart[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const moduleData = CUSTOMER_SECTIONS.service.find(
    (m) => m.id === module
  );
  const content = SERVICE_CONTENT[module];

  useEffect(() => {
    if (module === "labour-estimate") {
      fetchLabours();
    }
  }, [module]);

  const fetchLabours = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/customer/labour-charts");
      const data = await res.json();
      setLabours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load labour charts", err);
    } finally {
      setLoading(false);
    }
  };

  if (!module || !moduleData || !content) {
    return <div className="p-8">Module not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader role="customer" />

      <div className="flex pt-16">
        <CustomerSidebar />

        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">
          <ModuleDetailPage
            title={moduleData.label}
            description={content.description}
            breadcrumbs={[
              { label: "Customer", href: "/dashboard" },
              { label: "Service" },
              { label: moduleData.label },
            ]}
            backHref="/dashboard"
          >
            <div className="space-y-6">
              {content.sections.map((section, idx) => (
                <div key={idx}>
                  {/* ❌ Hide only labour placeholder */}
                  {!(
                    module === "labour-estimate" &&
                    section.title === "Service Estimate"
                  ) && (
                    <PlaceholderSection
                      title={section.title}
                      description={section.description}
                    />
                  )}

                  {/* ✅ Labour table */}
                  {module === "labour-estimate" &&
                    section.title === "Service Estimate" && (
                      <div className="bg-white border rounded-xl p-6">
                        {loading ? (
                          <p>Loading...</p>
                        ) : labours.length === 0 ? (
                          <p className="text-gray-500">
                            No labour data available
                          </p>
                        ) : (
                          <table className="w-full border">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2 border">Job Code</th>
                                <th className="p-2 border">Description</th>
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border">
                                  Estimated Cost (₹)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {labours.map((item, i) => (
                                <tr key={i} className="text-center">
                                  <td className="p-2 border">
                                    {item.job_code}
                                  </td>
                                  <td className="p-2 border">
                                    {item.job_description}
                                  </td>
                                  <td className="p-2 border">
                                    {item.category}
                                  </td>
                                  <td className="p-2 border">
                                    ₹{item.labour_cost}
                                  </td>
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
    </div>
  );
}
