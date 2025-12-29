"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import PortalHeader from "@/components/portal-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import MarketingCompaniesSection from "@/components/admin/MarketingCompaniesSection";

export default function AdminMarketingCompaniesPage() {
  const router = useRouter();

  // 🔒 ADMIN PROTECTION
  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ✅ HEADER (FULL WIDTH, ABOVE SIDEBAR) */}
      <PortalHeader role="Admin Marketing" />

      <div className="flex">

        {/* 🔵 LEFT SIDEBAR */}
        <AdminSidebar />

        {/* 🔹 CONTENT AREA */}
        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">
          <MarketingCompaniesSection />
        </main>

      </div>
    </div>
  );
}
