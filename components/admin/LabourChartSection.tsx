"use client"

import { useEffect, useState } from "react"

interface LabourChart {
  id: string
  job_code: string
  job_description: string
  labour_cost: number
  category: string
}

export default function LabourChartSection() {
  const [labours, setLabours] = useState<LabourChart[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    job_code: "",
    job_description: "",
    category: "",
    labour_cost: "",
  })

  // =========================
  // FETCH LABOUR CHARTS
  // =========================
  const fetchLabours = async () => {
    const token = localStorage.getItem("admin-token")
    if (!token) {
      setError("Admin not logged in")
      return
    }

    try {
      setError("")
      const res = await fetch("http://localhost:4000/admin/labour-charts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to load labour charts")
      }

      const data = await res.json()
      setLabours(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message || "Failed to load labour charts")
    }
  }

  useEffect(() => {
    fetchLabours()
  }, [])

  // =========================
  // ADD LABOUR CHART
  // =========================
  const handleAdd = async () => {
    const token = localStorage.getItem("admin-token")
    if (!token) return

    if (
      !form.job_code ||
      !form.job_description ||
      !form.category ||
      !form.labour_cost
    ) {
      alert("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("http://localhost:4000/admin/labour-charts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_code: form.job_code,
          job_description: form.job_description,
          category: form.category,
          labour_cost: Number(form.labour_cost),
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to add labour chart")
      }

      setForm({
        job_code: "",
        job_description: "",
        category: "",
        labour_cost: "",
      })

      fetchLabours()
    } catch (err: any) {
      alert(err.message || "Error adding labour chart")
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // DELETE LABOUR CHART
  // =========================
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("admin-token")
    if (!token) return

    if (!confirm("Delete this labour chart?")) return

    try {
      const res = await fetch(
        `http://localhost:4000/admin/labour-charts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to delete")
      }

      fetchLabours()
    } catch (err: any) {
      alert(err.message || "Error deleting labour chart")
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="space-y-8">

      {/* ADD LABOUR */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Add New Labour Chart
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Job Code"
            value={form.job_code}
            onChange={(e) =>
              setForm({ ...form, job_code: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Job Description"
            value={form.job_description}
            onChange={(e) =>
              setForm({ ...form, job_description: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Labour Cost (₹)"
            value={form.labour_cost}
            onChange={(e) =>
              setForm({ ...form, labour_cost: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-[#1A2A5A] text-white rounded"
        >
          {loading ? "Saving..." : "Add Labour"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-600">{error}</p>}

      {/* LABOUR TABLE */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          Labour Chart List
        </h3>

        {labours.length === 0 ? (
          <p className="text-gray-500">No labour charts found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Job Code</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Cost (₹)</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {labours.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="p-2 border">{item.job_code}</td>
                    <td className="p-2 border">
                      {item.job_description}
                    </td>
                    <td className="p-2 border">{item.category}</td>
                    <td className="p-2 border">
                      ₹{item.labour_cost}
                    </td>
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
