"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">

      {/* LEFT PANEL (28%) */}
      <div className="w-full md:w-[28%] flex items-center justify-center px-10">
        <div className="w-full max-w-sm text-center">

          {/* SMG LOGO */}
          <Image
            src="/images/smg-logo.png"
            alt="SMG Logo"
            width={140}
            height={140}
            className="mx-auto mb-6"
          />

          {/* Title */}
          <h2 className="text-3xl font-bold text-[#0A1E5A] mb-8">
            SMG Portal Login
          </h2>

          {/* FORM START */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("LOGIN CLICKED");
              // Add your login logic here (API call or redirect)
            }}
            className="w-full"
          >

            {/* Username */}
            <input
              type="text"
              placeholder="username"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-1"
            />

            {/* Forgot Password */}
            <Link
              href="/forgot-password"
              className="text-xs text-blue-600 mb-4 cursor-pointer hover:underline block text-left"
            >
              Forgot your password ?
            </Link>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0A1E5A] text-white py-2 rounded hover:bg-[#0A1E5A]/90"
            >
              LOGIN
            </button>
          </form>
          {/* FORM END */}

          {/* CREATE ACCOUNT */}
          <Link
            href="/customer-signup"
            className="text-sm text-blue-600 mt-4 cursor-pointer hover:underline block text-center"
          >
            Create Customer Account
          </Link>

        </div>
      </div>

      {/* RIGHT PANEL IMAGE (72%) */}
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
