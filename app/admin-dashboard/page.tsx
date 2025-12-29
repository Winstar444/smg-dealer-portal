"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import PortalHeader from "@/components/portal-header";
import ModuleSection from "@/components/module-section";
import { ADMIN_MODULES } from "@/lib/portal-modules";

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();

  // 🔒 ADMIN PROTECTION
useEffect(() => {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    router.push("/login");
    return;
  }
}, [router]);


  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* 🔵 LEFT BLUE SIDEBAR */}
   <aside className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[#0A1E5A] text-white border-r border-[#1E335E] z-40">

        {/* Sidebar Title */}
        <div className="flex items-center px-6 h-14 text-lg font-semibold border-b border-[#1E335E]">
          Admin Panel
        </div>

        {/* 👤 ADMIN PROFILE */}
        <div className="px-6 py-4 border-b border-[#1E335E]">
          <div className="flex items-center gap-3">
            <img
              src="/images/admin-avatar.png"
              alt="Admin"
              className="w-10 h-10 rounded-full border border-blue-300"
            />
            <div className="text-sm">
              <p className="font-semibold">Admin Name</p>
              <p className="text-blue-200 text-xs">admin@smg.com</p>
              <span className="inline-block mt-1 px-2 py-[2px] text-[10px] bg-[#243B6B] rounded">
                ADMIN
              </span>
            </div>
          </div>
        </div>

        {/* 🔗 SIDEBAR LINKS */}
        <nav className="mt-1">

          {/* PROFILE */}
          <Link
            href="/admin/profile"
            className={`flex items-center px-6 h-14 text-lg cursor-pointer
              ${pathname === "/admin/profile"
                ? "bg-[#243B6B] border-l-4 border-white font-semibold"
                : "hover:bg-[#1E335E]"}`}
          >
            Profile
          </Link>

          {/* ✅ ADMINISTRATIVE MODULES */}
          <Link
            href="/admin-dashboard"
            className={`flex items-center px-6 h-14 text-lg cursor-pointer
              ${pathname === "/admin-dashboard"
                ? "bg-[#243B6B] border-l-4 border-white font-semibold"
                : "hover:bg-[#1E335E]"}`}
          >
            Administrative Modules
          </Link>

          {/* MARKETING */}
          <Link
            href="/admin/marketing"
            className={`flex items-center px-6 h-14 text-lg cursor-pointer
              ${pathname === "/admin/marketing"
                ? "bg-[#243B6B] border-l-4 border-white font-semibold"
                : "hover:bg-[#1E335E]"}`}
          >
            Marketing
          </Link>

        </nav>
      </aside>

      {/* 🔹 RIGHT CONTENT */}
      <div className="flex-1">
        <PortalHeader role="Admin Dashboard" />

        <main className="ml-64 max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A2A5A] mb-2">
              Admin Control Panel
            </h2>
            <p className="text-gray-600">
              Manage dealer operations, training, and system configurations
            </p>
          </div>

          <ModuleSection
            title="Administrative Modules"
            modules={ADMIN_MODULES}
          />
        </main>
      </div>
    </div>
  );
}
