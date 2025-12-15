"use client"

import { useEffect, useState } from "react"

interface EventItem {
  id: string
  title: string
  event_date: string
  event_time: string
  address: string
  description?: string
}

export default function EventManagementSection() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [history, setHistory] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    event_date: "",
    event_time: "",
    address: "",
    description: "",
  })

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null

  // ===============================
  // FETCH UPCOMING EVENTS
  // ===============================
  const fetchEvents = async () => {
    if (!token) return

    try {
      const res = await fetch("http://localhost:4000/admin/events", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        console.error("Failed to fetch events")
        setEvents([])
        return
      }

      const data = await res.json()
      setEvents(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setEvents([])
    }
  }

  // ===============================
  // FETCH EVENT HISTORY
  // ===============================
  const fetchHistory = async () => {
    if (!token) return

    try {
      const res = await fetch("http://localhost:4000/admin/events/history", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        console.error("Failed to fetch history")
        setHistory([])
        return
      }

      const data = await res.json()
      setHistory(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setHistory([])
    }
  }

  useEffect(() => {
    fetchEvents()
    fetchHistory()
  }, [])

  // ===============================
  // ADD EVENT
  // ===============================
  const handleAdd = async () => {
    if (!token) {
      alert("Admin not logged in")
      return
    }

    if (!form.title || !form.event_date || !form.event_time || !form.address) {
      alert("All required fields must be filled")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:4000/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(err.error || "Failed to add event")
        return
      }

      // reset form
      setForm({
        title: "",
        event_date: "",
        event_time: "",
        address: "",
        description: "",
      })

      // 🔥 refresh lists
      await fetchEvents()
      await fetchHistory()
    } catch (err) {
      console.error(err)
      alert("Server error while adding event")
    } finally {
      setLoading(false)
    }
  }

  // ===============================
  // DELETE EVENT
  // ===============================
  const handleDelete = async (id: string) => {
    if (!token) return
    if (!confirm("Delete this event?")) return

    try {
      const res = await fetch(`http://localhost:4000/admin/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        alert("Failed to delete event")
        return
      }

      await fetchEvents()
      await fetchHistory()
    } catch (err) {
      console.error(err)
    }
  }

  // ===============================
  // UI (UNCHANGED)
  // ===============================
  return (
    <div className="space-y-8">

      {/* ADD EVENT */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Add Upcoming Event</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={form.event_date}
            onChange={(e) =>
              setForm({ ...form, event_date: e.target.value })
            }
          />
          <input
            type="time"
            className="border p-2 rounded"
            value={form.event_time}
            onChange={(e) =>
              setForm({ ...form, event_time: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        <textarea
          className="border p-2 rounded w-full mt-4"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={handleAdd}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-[#1A2A5A] text-white rounded"
        >
          {loading ? "Saving..." : "Add Event"}
        </button>
      </div>

      {/* UPCOMING EVENTS */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>

        {events.length === 0 && (
          <p className="text-gray-500">No upcoming events</p>
        )}

        {events.map((e) => (
          <div key={e.id} className="border-b py-3 flex justify-between">
            <div>
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-gray-600">
                {e.event_date} · {e.event_time} · {e.address}
              </p>
            </div>

            <button
              onClick={() => handleDelete(e.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* EVENT HISTORY */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Event History</h3>

        {history.length === 0 && (
          <p className="text-gray-500">No past events</p>
        )}

        {history.map((e) => (
          <div key={e.id} className="border-b py-2 text-sm text-gray-600">
            {e.title} — {e.event_date}
          </div>
        ))}
      </div>
    </div>
  )
}
