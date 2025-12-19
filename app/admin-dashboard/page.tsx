"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import PortalHeader from "@/components/portal-header";
import ModuleSection from "@/components/module-section";
import { ADMIN_MODULES } from "@/lib/portal-modules";

export default function AdminDashboard() {
  const router = useRouter();

  // 🔒 ADMIN PROTECTION (UNCHANGED)
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* 🔵 LEFT BLUE SIDEBAR */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-[#0A1E5A] text-white pt-16 border-r border-[#1E335E]">

        {/* Sidebar Title */}
        <div className="flex items-center px-6 h-14 text-lg font-semibold border-b border-[#1E335E]">
          Admin Panel
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-1">
          <a
            href="/admin/marketing"
            className="flex items-center px-6 h-14 text-lg cursor-pointer
                 border-l-4 border-white bg-[#243B6B] font-semibold
                 hover:bg-[#1E335E]"
          >
            Marketing
          </a>
        </nav>

      </aside>
      
      {/* 🔹 RIGHT SIDE CONTENT (UNCHANGED) */}
      <div className="flex-1">
        <PortalHeader role="Admin Dashboard" />

        <main className="ml-64 max-w-7xl mx-auto px-6 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A2A5A] mb-2">
              Admin Control Panel
            </h2>
            <p className="text-gray-600">
              Manage dealer operations, training, and system configurations
            </p>
          </div>

          {/* ✅ MODULE CARDS (NOT TOUCHED) */}
          <div className="space-y-8">
            <ModuleSection
              title="Administrative Modules"
              modules={ADMIN_MODULES}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
