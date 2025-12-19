"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // save token in browser
      localStorage.setItem("token", data.session.access_token);

      // save basic user info
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");
      router.push("/customer/dashboard");
    } else {
      alert(data.error || "Login failed");
    }
  }; // ✅ THIS WAS MISSING

  return (
    <div className="min-h-screen w-full flex">

      {/* LEFT SECTION */}
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
            Customer Login
          </h2>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4 w-full text-left">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#0A1E5A] text-white py-2 rounded hover:bg-[#0A1E5A]/90"
            >
              LOGIN
            </button>
          </form>

          <Link
            href="/customer-signup"
            className="text-sm text-blue-600 mt-4 cursor-pointer hover:underline block text-center"
          >
            Create Customer Account
          </Link>

        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
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
