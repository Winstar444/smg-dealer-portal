"use client"

import { useEffect, useState } from "react"

interface SparePart {
  id: string
  part_no: string
  part_name: string
  part_type: string
  price: number
}

export default function SparePartListSection() {
  const [parts, setParts] = useState<SparePart[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    part_no: "",
    part_name: "",
    part_type: "",
    price: "",
  })

  // =========================
  // FETCH SPARE PARTS
  // =========================
  const fetchSpareParts = async () => {
    const token = localStorage.getItem("admin-token")
    if (!token) {
      setError("Admin not logged in")
      return
    }

    try {
      setError("")
      const res = await fetch(
        "http://localhost:4000/admin/spare-parts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to load spare parts")
      }

      const data = await res.json()
      setParts(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message || "Failed to load spare parts")
    }
  }

  useEffect(() => {
    fetchSpareParts()
  }, [])

  // =========================
  // ADD SPARE PART
  // =========================
  const handleAdd = async () => {
    const token = localStorage.getItem("admin-token")
    if (!token) return

    if (
      !form.part_no ||
      !form.part_name ||
      !form.part_type ||
      !form.price
    ) {
      alert("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        "http://localhost:4000/admin/spare-parts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            part_no: form.part_no,
            part_name: form.part_name,
            part_type: form.part_type,
            price: Number(form.price),
          }),
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to add spare part")
      }

      setForm({
        part_no: "",
        part_name: "",
        part_type: "",
        price: "",
      })

      fetchSpareParts()
    } catch (err: any) {
      alert(err.message || "Error adding spare part")
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // DELETE SPARE PART
  // =========================
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("admin-token")
    if (!token) return

    if (!confirm("Delete this spare part?")) return

    try {
      const res = await fetch(
        `http://localhost:4000/admin/spare-parts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to delete spare part")
      }

      fetchSpareParts()
    } catch (err: any) {
      alert(err.message || "Error deleting spare part")
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="space-y-8">

      {/* ADD SPARE PART */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Add New Spare Part
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Part No"
            value={form.part_no}
            onChange={(e) =>
              setForm({ ...form, part_no: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Part Name"
            value={form.part_name}
            onChange={(e) =>
              setForm({ ...form, part_name: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Part Type"
            value={form.part_type}
            onChange={(e) =>
              setForm({ ...form, part_type: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-[#1A2A5A] text-white rounded"
        >
          {loading ? "Saving..." : "Add Spare Part"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-600">{error}</p>}

      {/* SPARE PART TABLE */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Spare Part List
        </h3>

        {parts.length === 0 ? (
          <p className="text-gray-500">No spare parts found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Part No</th>
                  <th className="p-2 border">Part Name</th>
                  <th className="p-2 border">Part Type</th>
                  <th className="p-2 border">Price (₹)</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="p-2 border">{item.part_no}</td>
                    <td className="p-2 border">{item.part_name}</td>
                    <td className="p-2 border">{item.part_type}</td>
                    <td className="p-2 border">₹{item.price}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
