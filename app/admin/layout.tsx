"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Single canonical guard for all /admin routes
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (role !== "admin") {
      // Redirect to the admin login page
      router.push("/admin-login");
    }
  }, [router]);

  return <>{children}</>;
}
