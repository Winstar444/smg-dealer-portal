"use client"

import PortalHeader from "@/components/portal-header"
import NewCampaignSection from "@/components/admin/NewCampaignSection"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function NewCampaignPage() {
  return (
    <>
      {/* HEADER */}
      <PortalHeader role="Admin" />

      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">

        {/* 🔵 LEFT SIDEBAR */}
        <AdminSidebar />

        {/* 🔹 RIGHT CONTENT */}
        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">
          <NewCampaignSection />
        </main>

      </div>
    </>
  )
}
