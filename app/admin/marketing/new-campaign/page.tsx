"use client"

import PortalHeader from "@/components/portal-header"
import NewCampaignSection from "@/components/admin/NewCampaignSection"

export default function NewCampaignPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader role="Admin" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <NewCampaignSection />
      </main>
    </div>
  )
}
