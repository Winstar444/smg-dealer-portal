"use client"

import { useState } from "react"

interface Company {
  id: number
  name: string
  contactPerson: string
  email: string
  phone: string
}

export default function MarketingCompaniesSection() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
  })

  // ADD COMPANY (frontend only for now)
  const handleAddCompany = () => {
    if (!form.name || !form.contactPerson || !form.email) {
      alert("All required fields must be filled")
      return
    }

    setLoading(true)

    const newCompany: Company = {
      id: Date.now(),
      name: form.name,
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
    }

    setCompanies((prev) => [newCompany, ...prev])

    setForm({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
    })

    setLoading(false)
  }

  // DELETE COMPANY
  const handleDelete = (id: number) => {
    if (!confirm("Remove this marketing company?")) return
    setCompanies((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h3 className="text-xl font-semibold text-[#1A2A5A]">
          Marketing Companies
        </h3>
        <p className="text-gray-600 text-sm">
          Manage external marketing agencies and vendors
        </p>
      </div>

      {/* ADD COMPANY FORM */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h4 className="font-semibold text-[#1A2A5A]">
          Add Marketing Company
        </h4>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Company Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Contact Person"
            value={form.contactPerson}
            onChange={(e) =>
              setForm({ ...form, contactPerson: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleAddCompany}
          disabled={loading}
          className="px-4 py-2 bg-[#0A1E5A] text-white rounded"
        >
          {loading ? "Saving..." : "Add Company"}
        </button>
      </div>

      {/* COMPANIES LIST */}
      <div className="bg-white border rounded-xl p-6">
        <h4 className="font-semibold text-[#1A2A5A] mb-4">
          Registered Marketing Companies
        </h4>

        {companies.length === 0 ? (
          <p className="text-gray-500">No companies added yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Company</th>
                  <th className="p-2 border">Contact</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id} className="text-center">
                    <td className="p-2 border">{c.name}</td>
                    <td className="p-2 border">{c.contactPerson}</td>
                    <td className="p-2 border">{c.email}</td>
                    <td className="p-2 border">{c.phone || "-"}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(c.id)}
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
