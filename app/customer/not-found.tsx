"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import CustomerPortalHeader from "@/components/customer-portal-header";
import CustomerSidebar from "@/components/CustomerSidebar";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/customer/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 FIXED HEADER */}
      <CustomerPortalHeader userName="Customer" />

      {/* 🔹 LAYOUT WRAPPER */}
      <div className="flex pt-16">
        
        {/* ✅ CUSTOMER SIDEBAR */}
        <CustomerSidebar />

        {/* ✅ MAIN (EMPTY – REDIRECT HAPPENS) */}
        <main className="flex-1 ml-64 px-6 py-8">
          {/* intentionally empty */}
        </main>
      </div>
    </div>
  );
}
