"use client"

import { useEffect, useState } from "react"

interface SparePart {
  id: string
  part_no: string
  part_name: string
  part_type: string
  price: number
}

export default function SparePartListPage() {
  const [parts, setParts] = useState<SparePart[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    part_no: "",
    part_name: "",
    part_type: "",
    price: "",
  })

  // ================================
  // FETCH SPARE PARTS (GET)
  // ================================
  const fetchParts = async () => {
    try {
      setError("")
      const token = localStorage.getItem("admin_token")

      if (!token) {
        setError("Admin not logged in")
        return
      }

      const res = await fetch("http://localhost:4000/admin/spare-parts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch spare parts")
      }

      const data = await res.json()
      setParts(data)
    } catch (err) {
      setError("Failed to load spare parts")
    }
  }

  useEffect(() => {
    fetchParts()
  }, [])

  // ================================
  // ADD SPARE PART (POST)
  // ================================
  const handleAdd = async () => {
    const token = localStorage.getItem("admin_token")
    if (!token) return

    if (!form.part_no || !form.part_name || !form.part_type || !form.price) {
      alert("All fields are required")
      return
    }

    try {
      setLoading(true)
      setError("")

      const res = await fetch("http://localhost:4000/admin/spare-parts", {
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
      })

      if (!res.ok) {
        throw new Error("Add failed")
      }

      // reset form
      setForm({
        part_no: "",
        part_name: "",
        part_type: "",
        price: "",
      })

      fetchParts()
    } catch (err) {
      alert("Failed to add spare part")
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // DELETE SPARE PART (DELETE)
  // ================================
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this spare part?")) return

    const token = localStorage.getItem("admin_token")
    if (!token) return

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
        throw new Error("Delete failed")
      }

      fetchParts()
    } catch (err) {
      alert("Failed to delete spare part")
    }
  }

  // ================================
  // UI
  // ================================
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Spare Part List</h1>

      {/* ADD SPARE PART */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-lg font-semibold mb-4">Add New Spare Part</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

          {/* PART TYPE DROPDOWN */}
          <select
            className="border p-2 rounded"
            value={form.part_type}
            onChange={(e) =>
              setForm({ ...form, part_type: e.target.value })
            }
          >
            <option value="">Select Part Type</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Body">Body</option>
            <option value="Consumable">Consumable</option>
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Price (₹)"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={loading}
          className="mt-4 px-5 py-2 bg-[#1A2A5A] text-white rounded"
        >
          {loading ? "Adding..." : "Add Spare Part"}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* TABLE */}
      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Part No</th>
              <th className="border p-2">Part Name</th>
              <th className="border p-2">Part Type</th>
              <th className="border p-2">Price (₹)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.part_no}</td>
                <td className="border p-2">{p.part_name}</td>
                <td className="border p-2">{p.part_type}</td>
                <td className="border p-2">₹{p.price}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {parts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No spare parts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
