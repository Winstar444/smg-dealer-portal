"use client"

import { useEffect, useState } from "react"

interface Dealer {
  id: string
  dealer_name: string
  email: string
  phone?: string
  location?: string
  city?: string
  state?: string
}

export default function DealerOnboardingSection() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordShown, setPasswordShown] = useState<string | null>(null)

  const [form, setForm] = useState({
    dealer_name: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    state: "",
  })

  // ================================
  // FETCH DEALERS
  // ================================
  const fetchDealers = async () => {
    try {
      setError("")
      const token = localStorage.getItem("admin_token")
      if (!token) {
        setError("Admin not logged in")
        return
      }

      const res = await fetch("http://localhost:4000/admin/dealers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Fetch failed")
      }

      const data = await res.json()
      setDealers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError("Failed to load dealers")
      setDealers([])
    }
  }

  useEffect(() => {
    fetchDealers()
  }, [])

  // ================================
  // ADD DEALER
  // ================================
  const handleSubmit = async () => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      alert("Admin not logged in")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:4000/admin/dealers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Failed to create dealer")
        return
      }

      // show password once
      setPasswordShown(data.dealer.password)

      setForm({
        dealer_name: "",
        email: "",
        phone: "",
        location: "",
        city: "",
        state: "",
      })

      fetchDealers()
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // DELETE DEALER
  // ================================
  const handleDelete = async (dealerId: string) => {
    if (!confirm("Are you sure you want to delete this dealer?")) return

    const token = localStorage.getItem("admin_token")
    if (!token) return

    try {
      const res = await fetch(
        `http://localhost:4000/admin/dealers/${dealerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error("Delete failed")
      }

      fetchDealers()
    } catch {
      alert("Failed to delete dealer")
    }
  }

  // ================================
  // UI
  // ================================
  return (
    <div className="space-y-8">
      {/* ADD DEALER */}
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg font-semibold text-[#1A2A5A] mb-4">
          Add New Dealer
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["dealer_name", "email", "phone", "location", "city", "state"].map(
            (field) => (
              <input
                key={field}
                className="border p-2 rounded"
                placeholder={field.replace("_", " ").toUpperCase()}
                value={(form as any)[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
              />
            )
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 px-5 py-2 bg-[#1A2A5A] text-white rounded"
        >
          {loading ? "Creating..." : "Add Dealer"}
        </button>

        {passwordShown && (
          <div className="mt-4 bg-green-50 border border-green-300 p-3 rounded">
            <strong>Generated Password:</strong>{" "}
            <span className="font-mono">{passwordShown}</span>
          </div>
        )}
      </div>

      {/* DEALER LIST */}
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg font-semibold text-[#1A2A5A] mb-4">
          Dealer List
        </h3>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {dealers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No dealers found
                  </td>
                </tr>
              )}

              {dealers.map((d) => (
                <tr key={d.id}>
                  <td className="border p-2">{d.dealer_name}</td>
                  <td className="border p-2">{d.email}</td>
                  <td className="border p-2">{d.phone || "-"}</td>
                  <td className="border p-2">{d.location || "-"}</td>
                  <td className="border p-2 text-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-yellow-400 rounded">
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                      onClick={() => handleDelete(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
