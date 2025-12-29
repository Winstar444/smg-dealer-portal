"use client";

import PortalHeader from "@/components/portal-header";
import { useEffect, useState } from "react";

interface LabourChart {
  id: number;
  job_code: string;
  job_description: string;
  labour_cost: number;
  category: string;
}

export default function LabourChartsPage() {

  const [labourCharts, setLabourCharts] = useState<LabourChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ADD FORM STATES
  const [jobCode, setJobCode] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [labourCost, setLabourCost] = useState("");
  const [category, setCategory] = useState("");

  // EDIT STATE
  const [editingItem, setEditingItem] = useState<LabourChart | null>(null);

  useEffect(() => {
    fetchLabourCharts();
  }, []);

  const fetchLabourCharts = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      if (!token) return;

      const res = await fetch("http://localhost:4000/admin/labour-charts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch labour charts");

      const data = await res.json();
      setLabourCharts(data);
    } catch {
      setError("Error loading labour charts");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLabour = async () => {
    try {
      const token = localStorage.getItem("admin-token");

      await fetch("http://localhost:4000/admin/labour-charts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_code: jobCode,
          job_description: jobDescription,
          labour_cost: Number(labourCost),
          category,
        }),
      });

      setJobCode("");
      setJobDescription("");
      setLabourCost("");
      setCategory("");
      fetchLabourCharts();
    } catch {
      alert("Error adding labour chart");
    }
  };

  const handleUpdateLabour = async () => {
    if (!editingItem) return;

    const token = localStorage.getItem("admin-token");

    await fetch(
      `http://localhost:4000/admin/labour-charts/${editingItem.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingItem),
      }
    );

    setEditingItem(null);
    fetchLabourCharts();
  };

  const handleDeleteLabour = async (id: number) => {
    if (!confirm("Delete this labour chart?")) return;

    const token = localStorage.getItem("admin-token");

    await fetch(`http://localhost:4000/admin/labour-charts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchLabourCharts();
  };

  return (
    <>
      {/* ✅ HEADER FIRST */}
      <PortalHeader role="Labour Charts" />

      <div className="flex min-h-[calc(100vh-4rem)] bg-[#F4F6FA]">

        {/* 🔵 SIDEBAR */}
        <aside className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[#0A1E5A] text-white border-r border-[#1E335E] z-40">

          <div className="px-6 h-14 flex items-center font-semibold border-b border-[#1E335E]">
            Admin Panel
          </div>

          <div className="px-6 py-4 border-b border-[#1E335E]">
            <p className="font-semibold">Admin Name</p>
            <p className="text-xs text-blue-200">admin@smg.com</p>
          </div>

          <nav className="mt-2">
            <a href="/admin/profile" className="block px-6 py-3 hover:bg-[#1E335E]">
              Profile
            </a>
            <a href="/admin-dashboard" className="block px-6 py-3 hover:bg-[#1E335E]">
              Administrative Modules
            </a>
            <a
              href="/admin/labour-charts"
              className="block px-6 py-3 bg-[#243B6B] font-semibold"
            >
              Labour Charts
            </a>
          </nav>
        </aside>

        {/* 🔹 MAIN CONTENT */}
        <main className="flex-1 ml-64 p-6">

          <h1 className="text-2xl font-bold mb-6">Labour Chart</h1>

          {/* ADD FORM */}
          <div className="mb-6 border p-4 rounded bg-white">
            <h2 className="font-semibold mb-3">Add Labour Chart</h2>

            <div className="grid grid-cols-4 gap-4">
              <input className="border p-2" placeholder="Job Code" value={jobCode} onChange={(e) => setJobCode(e.target.value)} />
              <input className="border p-2" placeholder="Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
              <input className="border p-2" placeholder="Labour Cost" type="number" value={labourCost} onChange={(e) => setLabourCost(e.target.value)} />
              <input className="border p-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <button onClick={handleAddLabour} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
              Add Labour
            </button>
          </div>

          {/* TABLE */}
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && (
            <table className="w-full border bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Job Code</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Cost</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {labourCharts.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.job_code}</td>
                    <td className="border p-2">{item.job_description}</td>
                    <td className="border p-2">₹{item.labour_cost}</td>
                    <td className="border p-2">{item.category}</td>
                    <td className="border p-2">
                      <button onClick={() => setEditingItem(item)} className="text-blue-600 mr-2">Edit</button>
                      <button onClick={() => handleDeleteLabour(item.id)} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </>
  );
}
