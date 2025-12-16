"use client"

import PortalHeader from "@/components/portal-header"
import MarketingCompaniesSection from "@/components/admin/MarketingCompaniesSection"

export default function AdminMarketingCompaniesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader role="Admin" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <MarketingCompaniesSection />
      </main>
    </div>
  )
}
