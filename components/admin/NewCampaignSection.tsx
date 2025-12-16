"use client"

import { useState } from "react"

export default function NewCampaignSection() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  })
const handleCreate = async () => {
  const token = localStorage.getItem("admin-token")
  if (!token) {
    alert("Admin not logged in")
    return
  }

  if (!form.title || !form.startDate || !form.endDate) {
    alert("Title, start date and end date are required")
    return
  }

  const res = await fetch(
    "http://localhost:4000/admin/marketing-campaigns",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        start_date: form.startDate,
        end_date: form.endDate,
      }),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    alert(err.error || "Failed to create campaign")
    return
  }

  alert("Campaign created successfully")

  setForm({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  })
}


  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h3 className="text-xl font-semibold text-[#1A2A5A]">
          Create New Campaign
        </h3>
        <p className="text-gray-600 text-sm">
          Define campaign details and active duration
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border rounded-xl p-6 space-y-4">

        <input
          className="w-full border p-2 rounded"
          placeholder="Campaign Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Campaign Description (optional)"
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={form.startDate}
            onChange={(e) =>
              setForm({ ...form, startDate: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            value={form.endDate}
            onChange={(e) =>
              setForm({ ...form, endDate: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-[#0A1E5A] text-white rounded"
        >
          Create Campaign
        </button>
      </div>
    </div>
  )
}
