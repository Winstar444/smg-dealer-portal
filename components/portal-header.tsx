"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortalHeaderProps {
  role: string;
}

export default function PortalHeader({ role }: PortalHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("admin-token");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 shadow-sm">

        {/* ✅ LOGO STARTS FROM VERY LEFT */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-serif font-bold text-[#1A2A5A]">
            SMG
          </h1>
          <div className="h-6 w-px bg-gray-300" />
          <span className="text-sm font-semibold text-gray-700 capitalize">
            {role}
          </span>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="gap-2 border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>

      </div>
    </header>
  );
}
