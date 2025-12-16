"use client"

import { useRouter } from "next/navigation"

export default function MarketingSection() {
  const router = useRouter()

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-[#1A2A5A]">
          Marketing Management
        </h3>
        <p className="text-gray-600 text-sm">
          Create campaigns and manage marketing partners
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* NEW CAMPAIGN */}
        <div
          onClick={() => router.push("/admin/marketing/new-campaign")}
          className="cursor-pointer bg-white border rounded-xl p-6 hover:shadow-md transition"
        >
          <h4 className="text-lg font-semibold text-[#1A2A5A] mb-2">
            New Campaign
          </h4>
          <p className="text-gray-600 text-sm">
            Create and manage active marketing campaigns
          </p>
        </div>

        {/* MARKETING COMPANIES */}
        <div
          onClick={() => router.push("/admin/marketing/companies")}
          className="cursor-pointer bg-white border rounded-xl p-6 hover:shadow-md transition"
        >
          <h4 className="text-lg font-semibold text-[#1A2A5A] mb-2">
            Marketing Companies
          </h4>
          <p className="text-gray-600 text-sm">
            Manage partner marketing agencies and vendors
          </p>
        </div>

      </div>
    </div>
  )
}
