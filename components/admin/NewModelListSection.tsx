"use client"

import { useEffect, useState } from "react"

interface Model {
  id: string
  model_name: string
  model_code: string
  price: number
}

export default function NewModelListPage() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    model_name: "",
    model_code: "",
    price: "",
  })

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null

  // ===============================
  // FETCH MODELS
  // ===============================
  const fetchModels = async () => {
    if (!token) {
      setError("Admin not logged in")
      return
    }

    const res = await fetch("http://localhost:4000/admin/models", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
      setError("Failed to fetch models")
      return
    }

    const data = await res.json()
    setModels(data)
  }

  useEffect(() => {
    fetchModels()
  }, [])

  // ===============================
  // ADD MODEL
  // ===============================
  const handleAdd = async () => {
    if (!token) return

    if (!form.model_name || !form.model_code || !form.price) {
      alert("All fields are required")
      return
    }

    setLoading(true)

    const res = await fetch("http://localhost:4000/admin/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model_name: form.model_name,
        model_code: form.model_code,
        price: Number(form.price),
      }),
    })

    if (!res.ok) {
      alert("Failed to add model")
      setLoading(false)
      return
    }

    setForm({ model_name: "", model_code: "", price: "" })
    fetchModels()
    setLoading(false)
  }

  // ===============================
  // DELETE MODEL
  // ===============================
  const handleDelete = async (id: string) => {
    if (!token) return
    if (!confirm("Delete this model?")) return

    await fetch(`http://localhost:4000/admin/models/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    fetchModels()
  }

  // ===============================
  // UI
  // ===============================
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">New Model List</h1>

      {/* ADD MODEL */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-lg font-semibold mb-4">Add New Model</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Model Name"
            value={form.model_name}
            onChange={(e) =>
              setForm({ ...form, model_name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            placeholder="Model Code"
            value={form.model_code}
            onChange={(e) =>
              setForm({ ...form, model_code: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            type="number"
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
          className="mt-4 px-5 py-2 bg-[#1A2A5A] text-white rounded"
        >
          {loading ? "Adding..." : "Add Model"}
        </button>
      </div>

      {/* MODEL TABLE */}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Model Name</th>
              <th className="border p-2">Model Code</th>
              <th className="border p-2">Price (₹)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.id}>
                <td className="border p-2">{m.model_name}</td>
                <td className="border p-2">{m.model_code}</td>
                <td className="border p-2">₹{m.price}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {models.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No models found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
