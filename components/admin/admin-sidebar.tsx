"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const ADMIN_SECTIONS = [
  { label: "Dashboard", href: "/admin-dashboard" },
  { label: "Marketing", href: "/admin/marketing" },
  { label: "Labour Charts", href: "/admin/labour-charts" },
  { label: "Spare Parts", href: "/admin/spare-part-list" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#0A1E5A] text-white p-6">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-3">
        {ADMIN_SECTIONS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded ${
              pathname === item.href
                ? "bg-[#132E7A]"
                : "hover:bg-[#132E7A]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
