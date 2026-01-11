"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ HARD ADMIN LOGIN (OPTIONAL)
 if (email === "admin@smg.com" && password === "Admin@123") {
  localStorage.setItem("role", "admin");
  localStorage.setItem("access_token", "demo-admin-token"); // 👈 ADD THIS
  router.push("/admin/profile");
  return;
}

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SAVE SESSION
      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      // ✅ ROLE-BASED REDIRECT (FIXED PATHS)
  // ✅ ROLE-BASED REDIRECT (FINAL FIX)
if (data.user.role === "dealer") {
  router.push("/dealer-dashboard");
} else if (data.user.role === "admin") {
  router.push("/admin/profile");
} else {
  router.push("/dashboard"); // ✅ CUSTOMER DASHBOARD (REAL PATH)
}

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
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
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              required
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-1"
              required
            />

            <Link
              href="/forgot-password"
              className="text-xs text-blue-600 mb-4 hover:underline block text-left"
            >
              Forgot your password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A1E5A] text-white py-2 rounded hover:bg-[#0A1E5A]/90 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "LOGIN"}
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
