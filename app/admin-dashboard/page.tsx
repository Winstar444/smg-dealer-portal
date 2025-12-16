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
      <aside className="w-64 min-h-screen bg-[#0A1E5A] text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-3">
          <a
  href="/admin/marketing"
  className="block px-4 py-2 rounded hover:bg-[#132E7A]"
>
  Marketing
</a>


          <a
            href="/admin-dashboard"
            className="block px-4 py-2 rounded hover:bg-[#132E7A]"
          >
          </a>
        </nav>
      </aside>

      {/* 🔹 RIGHT SIDE CONTENT (UNCHANGED) */}
      <div className="flex-1">
        <PortalHeader role="Admin Dashboard" />

        <main className="max-w-7xl mx-auto px-6 py-8">
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
