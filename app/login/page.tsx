"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    // ✅ ADMIN LOGIN (REAL CREDENTIALS)
    if (username === "admin@smg.com" && password === "Admin@123") {
     localStorage.setItem("admin_token", "demo-admin-token")
localStorage.setItem("role", "admin")

      // 👇 DEFAULT LANDING = PROFILE
      router.push("/admin/profile");
      return;
    }

    // ✅ CUSTOMER LOGIN (DEFAULT)
    localStorage.setItem("role", "customer");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex">

      {/* LEFT PANEL */}
      <div className="w-full md:w-[28%] flex items-center justify-center px-10">
        <div className="w-full max-w-sm text-center">

          <Image
            src="/images/smg-logo.png"
            alt="SMG Logo"
            width={140}
            height={140}
            className="mx-auto mb-6"
          />

          <h2 className="text-3xl font-bold text-[#0A1E5A] mb-8">
            SMG Portal Login
          </h2>

          <form onSubmit={handleLogin} className="w-full">

            <input
              type="text"
              placeholder="email / username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-1"
            />

            <Link
              href="/forgot-password"
              className="text-xs text-blue-600 mb-4 hover:underline block text-left"
            >
              Forgot your password ?
            </Link>

            <button
              type="submit"
              className="w-full bg-[#0A1E5A] text-white py-2 rounded hover:bg-[#0A1E5A]/90"
            >
              LOGIN
            </button>
          </form>

          <Link
            href="/customer-signup"
            className="text-sm text-blue-600 mt-4 hover:underline block"
          >
            Create Customer Account
          </Link>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block w-[72%] relative">
        <Image
          src="/images/login-image.jpg"
          alt="Login Background"
          fill
          className="object-cover"
          priority
        />
      </div>

    </div>
  );
}
