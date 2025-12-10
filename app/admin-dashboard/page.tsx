"use client"
import PortalHeader from "@/components/portal-header"
import ModuleSection from "@/components/module-section"
import { ADMIN_MODULES } from "@/lib/portal-modules"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader role="Admin Dashboard" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1A2A5A] mb-2">Admin Control Panel</h2>
          <p className="text-gray-600">Manage dealer operations, training, and system configurations</p>
        </div>

        {/* Modules Grid */}
        <div className="space-y-8">
          <ModuleSection title="Administrative Modules" modules={ADMIN_MODULES} />
        </div>
      </main>
    </div>
  )
}
