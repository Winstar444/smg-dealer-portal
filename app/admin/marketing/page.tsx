"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PortalHeader from "@/components/portal-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminMarketingPage() {
  const router = useRouter();

  // 🔒 ADMIN PROTECTION
  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F4F6FA]">

      {/* HEADER */}
      <PortalHeader role="Admin Marketing" />

      <div className="flex">

        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">

          <h2 className="text-2xl font-bold text-[#1A2A5A] mb-6">
            Marketing
          </h2>

          <p className="text-gray-600 mb-8">
            Manage campaigns and companies
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Link
              href="/admin/marketing/companies"
              className="block bg-white rounded-2xl shadow p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-[#1A2A5A]">
                Companies
              </h3>
              <p className="text-gray-600 mt-2">
                View and manage companies
              </p>
            </Link>

            <Link
              href="/admin/marketing/new-campaign"
              className="block bg-white rounded-2xl shadow p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-[#1A2A5A]">
                New Campaign
              </h3>
              <p className="text-gray-600 mt-2">
                Create a new marketing campaign
              </p>
            </Link>

          </div>

        </main>
      </div>
    </div>
  );
}
