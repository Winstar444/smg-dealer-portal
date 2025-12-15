"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    vehicle_number: "",
    address: "",
  });

  // -------------------------------
  // LOAD PROFILE FROM LOCALSTORAGE + DB
  // -------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/customer-login");
      return;
    }

    const user = JSON.parse(userData);

    // Set profile fields from backend login response
    setProfile({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || "",
      vehicle_number: user.vehicle_number || "",
      address: user.address || "",
    });

    setLoading(false);
  }, []);

  // -------------------------------
  // HANDLE INPUT CHANGE
  // -------------------------------
  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------------------
  // SAVE PROFILE CHANGES TO BACKEND
  // -------------------------------
  const handleSave = async () => {
    setSaving(true);

    const res = await fetch("http://localhost:4000/customer/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    const data = await res.json();

    if (res.ok) {
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(profile));

      alert("Profile updated successfully!");
    } else {
      alert(data.error || "Update failed");
    }

    setSaving(false);
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F6FA] to-white flex flex-col items-center justify-center px-4">
      <div className="rounded-lg p-8 w-full max-w-md shadow-xl bg-white">

        <h2 className="text-2xl font-bold text-[#1A2A5A] text-center mb-4">
          Customer Profile
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input name="email" value={profile.email} readOnly className="bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Number
            </label>
            <Input
              name="vehicle_number"
              value={profile.vehicle_number}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
          </div>

          <Button
            className="w-full bg-[#1A2A5A] text-white mt-4"
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>

        </div>

        <div className="mt-4 text-center">
          <button onClick={() => router.push("/customer-dashboard")} className="text-sm text-[#1A2A5A] hover:underline">
            Back to Dashboard
          </button>
        </div>

      </div>
    </main>
  );
}
