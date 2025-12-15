"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CustomerSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicle_number: "",
    address: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone,
        vehicle_number: formData.vehicle_number,
        address: formData.address,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setShowSuccess(true);
      setTimeout(() => router.push("/customer-login"), 2000);
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">

      {/* LEFT SECTION — WHITE LIKE LOGIN */}
      <div className="w-full md:w-[28%] flex items-center justify-center px-10">
        <div className="w-full max-w-sm text-center">

          {/* LOGO */}
          <h1 className="text-4xl font-serif font-bold text-[#1A2A5A] mb-6">
            SMG
          </h1>

          <h2 className="text-3xl font-bold text-[#1A2A5A] mb-2">
            Customer Sign Up
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Create your account to get started.
          </p>

          {/* SUCCESS MESSAGE */}
          {showSuccess ? (
            <div className="bg-green-100 border border-green-300 p-3 rounded-md text-green-700">
              Account created successfully! Redirecting…
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4 text-left">

              <Input
                name="full_name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />

              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />

              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />

              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />

              <Input
                name="vehicle_number"
                placeholder="Vehicle Number (optional)"
                onChange={handleChange}
              />

              <Input
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />

              <Button
                type="submit"
                className="w-full bg-[#1A2A5A] hover:bg-[#0F1A3A] text-white"
              >
                Create Account
              </Button>
            </form>
          )}

          {/* BACK TO LOGIN */}
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/customer-login")}
              className="text-sm text-[#1A2A5A] hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:block w-[72%] relative">
        <Image
          src="/images/login-image.jpg"
          alt="Signup Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
