"use client"

import { useState } from "react"
import TopNavigation from "./top-navigation"
import SearchBar from "./search-bar"
import AdminDashboard from "./dashboards/admin-dashboard"
import DealerDashboard from "./dashboards/dealer-dashboard"
import CustomerDashboard from "./dashboards/customer-dashboard"
import ServiceTechnicianDashboard from "./dashboards/service-technician-dashboard"
import MarketingDashboard from "./dashboards/marketing-dashboard"
import Footer from "./footer"

type Role = "admin" | "dealer" | "customer" | "technician" | "marketing"

export default function DashboardLayout() {
  const [activeRole, setActiveRole] = useState<Role>("admin")

  const renderDashboard = () => {
    switch (activeRole) {
      case "admin":
        return <AdminDashboard />
      case "dealer":
        return <DealerDashboard />
      case "customer":
        return <CustomerDashboard />
      case "technician":
        return <ServiceTechnicianDashboard />
      case "marketing":
        return <MarketingDashboard />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Top Navigation */}
      <TopNavigation activeRole={activeRole} onRoleChange={setActiveRole} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Search Bar */}
        <SearchBar />

        {/* Content */}
        <div className="mt-8">{renderDashboard()}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
