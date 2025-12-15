"use client"

import { SMGLogo } from "./logo"
import { Search } from "lucide-react"

interface TopNavigationProps {
  activeRole: string
  onRoleChange: (role: any) => void
}

const roles = [
  { id: "admin", label: "Admin" },
  { id: "dealer", label: "Dealer" },
  { id: "customer", label: "Customer" },
  { id: "technician", label: "Service Technician" },
  { id: "marketing", label: "Marketing" },
]

export default function TopNavigation({ activeRole, onRoleChange }: TopNavigationProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <SMGLogo className="hidden sm:block" />

        {/* Menu Items */}
        <div className="flex items-center gap-6 flex-1 justify-center md:justify-start md:ml-12">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`text-sm font-medium transition-all pb-1 border-b-2 ${
                activeRole === role.id
                  ? "text-primary border-primary font-semibold"
                  : "text-foreground/60 border-transparent hover:text-foreground"
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>

        {/* Search Icon */}
        <button className="p-2 hover:bg-secondary rounded-lg text-foreground/60 hover:text-foreground transition-colors">
          <Search size={20} />
        </button>
      </div>
    </nav>
  )
}
