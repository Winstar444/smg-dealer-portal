"use client"

import { useEffect, useState } from "react"

interface Announcement {
  id: string
  title: string
  description: string
  created_at: string
}

export default function GovernmentAnnouncementSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
  })

  const [editingId, setEditingId] = useState<string | null>(null)

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null

  // =========================
  // FETCH ANNOUNCEMENTS
  // =========================
  const fetchAnnouncements = async () => {
    if (!token) return

    const res = await fetch(
      "http://localhost:4000/admin/government-announcements",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    const data = await res.json()
    setAnnouncements(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  // =========================
  // ADD / UPDATE ANNOUNCEMENT
  // =========================
  const handleSubmit = async () => {
    if (!token) return
    if (!form.title || !form.description) {
      alert("Title and description required")
      return
    }

    setLoading(true)

    const url = editingId
      ? `http://localhost:4000/admin/government-announcements/${editingId}`
      : "http://localhost:4000/admin/government-announcements"

    const method = editingId ? "PUT" : "POST"

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    setForm({ title: "", description: "" })
    setEditingId(null)
    fetchAnnouncements()
    setLoading(false)
  }

  // =========================
  // DELETE ANNOUNCEMENT
  // =========================
  const handleDelete = async (id: string) => {
    if (!token) return
    if (!confirm("Delete this announcement?")) return

    await fetch(
      `http://localhost:4000/admin/government-announcements/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    fetchAnnouncements()
  }

  // =========================
  // START EDIT
  // =========================
  const handleEdit = (a: Announcement) => {
    setEditingId(a.id)
    setForm({
      title: a.title,
      description: a.description,
    })
  }

  return (
    <div className="space-y-8">

      {/* ADD / EDIT ANNOUNCEMENT */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Announcement" : "Add Government Announcement"}
        </h3>

        <input
          className="border p-2 rounded w-full mb-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          className="border p-2 rounded w-full mb-3"
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-[#1A2A5A] text-white rounded"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update"
              : "Add"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null)
                setForm({ title: "", description: "" })
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ANNOUNCEMENT LIST */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Government Announcements
        </h3>

        {announcements.length === 0 && (
          <p className="text-gray-500">No announcements found</p>
        )}

        {announcements.map((a) => (
          <div
            key={a.id}
            className="border-b py-3 flex justify-between items-start"
          >
            <div>
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-gray-600">
                {a.description}
              </p>
            </div>

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => handleEdit(a)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
