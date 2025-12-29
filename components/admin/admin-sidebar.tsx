"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[#0A1E5A] text-white border-r border-[#1E335E] z-50">

      {/* TITLE */}
      <div className="h-16 flex items-center px-6 text-lg font-semibold border-b border-[#1E335E]">
        Admin Panel
      </div>

      {/* PROFILE PREVIEW */}
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

      {/* NAV */}
      <nav className="mt-2">
        <Link
          href="/admin/profile"
          className={`block px-6 py-3 ${
            pathname === "/admin/profile"
              ? "bg-[#243B6B] border-l-4 border-white"
              : "hover:bg-[#1E335E]"
          }`}
        >
          Profile
        </Link>

        <Link
          href="/admin-dashboard"
          className={`block px-6 py-3 ${
            pathname === "/admin-dashboard"
              ? "bg-[#243B6B] border-l-4 border-white"
              : "hover:bg-[#1E335E]"
          }`}
        >
          Administrative Modules
        </Link>

        <Link
          href="/admin/marketing"
          className={`block px-6 py-3 ${
            pathname.startsWith("/admin/marketing")
              ? "bg-[#243B6B] border-l-4 border-white"
              : "hover:bg-[#1E335E]"
          }`}
        >
          Marketing
        </Link>
      </nav>
    </aside>
  );
}
