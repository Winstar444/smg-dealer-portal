"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

interface Profile {
  full_name: string;
  email: string;
  phone: string;
  vehicle_number: string;
  address: string;
}

export default function CustomerProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    email: "",
    phone: "",
    vehicle_number: "",
    address: "",
  });
  

  // ---------------------------------------
  // FETCH PROFILE FROM SUPABASE (SOURCE OF TRUTH)
  // + STEP 1: SUPABASE CONNECTION TEST
  // ---------------------------------------
  useEffect(() => {
    // 🔍 STEP 1: SUPABASE CONNECTION TEST (TEMPORARY)
    supabase
      .from("customers")
      .select("email")
      .limit(1)
      .then((res) => {
        console.log("Supabase connection test:", res);
      });

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/customer-login");
      return;
    }

    const user = JSON.parse(storedUser);
    const email = user.email;


    if (!email) {
      router.push("/customer-login");
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("full_name, email, phone, vehicle_number, address")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Failed to fetch profile", error);
        alert("Unable to load profile");
        return;
      }

      setProfile({
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        vehicle_number: data.vehicle_number || "",
        address: data.address || "",
      });

      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  // ---------------------------------------
  // HANDLE INPUT CHANGE
  // ---------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------
  // UPDATE PROFILE IN SUPABASE
  // ---------------------------------------
  const handleSave = async () => {
    setSaving(true);

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Session expired");
      router.push("/customer-login");
      return;
    }

    const user = JSON.parse(storedUser);
    const email = user.email;


    const { error } = await supabase
      .from("customers")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        vehicle_number: profile.vehicle_number,
        address: profile.address,
      })
      .eq("email", email);

    if (error) {
      alert("Profile update failed");
      console.error(error);
    } else {
      alert("Profile updated successfully!");
    }

    setSaving(false);
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F6FA] to-white flex items-center justify-center px-4">
      <div className="rounded-lg p-8 w-full max-w-md shadow-xl bg-white">
        <h2 className="text-2xl font-bold text-[#1A2A5A] text-center mb-4">
          My Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <Input
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              value={profile.email}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone
            </label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Number
            </label>
            <Input
              name="vehicle_number"
              value={profile.vehicle_number}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <Input
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#1A2A5A] text-white mt-4"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/customer/dashboard")}
            className="text-sm text-[#1A2A5A] hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
