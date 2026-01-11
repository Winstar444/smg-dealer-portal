"use client";

import { useRouter } from "next/navigation";

import PortalHeader from "@/components/portal-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminProfilePage() {
  const router = useRouter();

  // Guard moved to app/admin/layout.tsx

  return (
    <div className="min-h-screen bg-[#F4F6FA]">

      {/* ✅ HEADER — FULL WIDTH (NO ml-64) */}
      <PortalHeader role="Admin Profile" />

      <div className="flex">

        {/* 🔵 FIXED SIDEBAR */}
        <AdminSidebar />

        {/* 🔹 CONTENT AREA (SHIFTED) */}
        <main className="flex-1 ml-64 max-w-7xl mx-auto px-6 py-8">

          {/* PAGE TITLE */}
          <h2 className="text-2xl font-bold text-[#1A2A5A] mb-6">
            Admin Profile
          </h2>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* LEFT PROFILE CARD */}
            <div className="lg:col-span-1 bg-[#0A1E5A] text-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-lg font-semibold mb-4">
                  Admin
                </div>

                <h3 className="text-lg font-semibold">Admin Name</h3>
                <p className="text-blue-200 text-sm">admin@smg.com</p>

                <span className="mt-3 inline-block px-4 py-1 text-xs bg-white text-[#0A1E5A] rounded-full font-semibold">
                  SYSTEM ADMIN
                </span>
              </div>

              <div className="mt-8 text-sm space-y-4">
                <div className="flex justify-between">
                  <span className="text-blue-200">Location</span>
                  <span>SMG Head Office</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Phone</span>
                  <span>+91 XXXXXXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Role</span>
                  <span>Admin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Joined</span>
                  <span>Jan 2024</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-3 space-y-6">

              {/* TODAY’S WORK */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h4 className="text-lg font-semibold text-[#1A2A5A] mb-4">
                  Today’s Work
                </h4>

                <ul className="text-sm text-gray-700 space-y-3">
                  <li className="flex justify-between">
                    <span>Dealer onboardings pending</span>
                    <span className="font-semibold text-[#1A2A5A]">2</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Campaigns created</span>
                    <span className="font-semibold text-[#1A2A5A]">1</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Labour charts updated</span>
                    <span className="font-semibold text-[#1A2A5A]">3</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Spare parts reviewed</span>
                    <span className="font-semibold text-[#1A2A5A]">Yes</span>
                  </li>
                </ul>
              </div>

              {/* WORK FROM OTHER PORTALS */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h4 className="text-lg font-semibold text-[#1A2A5A] mb-4">
                  Work from Other Portals
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-[#F4F6FA] rounded-xl">
                    <p className="font-semibold text-[#1A2A5A]">Dealers</p>
                    <p className="text-gray-600 mt-1">
                      4 active · 1 new request
                    </p>
                  </div>

                  <div className="p-4 bg-[#F4F6FA] rounded-xl">
                    <p className="font-semibold text-[#1A2A5A]">Customers</p>
                    <p className="text-gray-600 mt-1">
                      12 service requests today
                    </p>
                  </div>

                  <div className="p-4 bg-[#F4F6FA] rounded-xl">
                    <p className="font-semibold text-[#1A2A5A]">Marketing</p>
                    <p className="text-gray-600 mt-1">
                      3 active campaigns running
                    </p>
                  </div>

                  <div className="p-4 bg-[#F4F6FA] rounded-xl">
                    <p className="font-semibold text-[#1A2A5A]">Events</p>
                    <p className="text-gray-600 mt-1">
                      1 upcoming training
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
