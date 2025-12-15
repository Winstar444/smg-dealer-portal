"use client";

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

  // ===============================
  // FETCH LABOUR CHARTS
  // ===============================
  const fetchLabourCharts = async () => {
    try {
      const token = localStorage.getItem("admin_token");


      if (!token) {
        setError("Admin not logged in");
        return;
      }

      const res = await fetch(
        "http://localhost:4000/admin/labour-charts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch labour charts");
      }

      const data = await res.json();
      setLabourCharts(data);
    } catch (err) {
      console.error(err);
      setError("Error loading labour charts");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // ADD LABOUR CHART
  // ===============================
  const handleAddLabour = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "http://localhost:4000/admin/labour-charts",
        {
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
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add labour chart");
      }

      setJobCode("");
      setJobDescription("");
      setLabourCost("");
      setCategory("");

      fetchLabourCharts();
    } catch (err) {
      alert("Error adding labour chart");
    }
  };

  // ===============================
  // UPDATE LABOUR CHART
  // ===============================
  const handleUpdateLabour = async () => {
    if (!editingItem) return;

    try {
      const token = localStorage.getItem("admin_token");


      const res = await fetch(
        `http://localhost:4000/admin/labour-charts/${editingItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            job_code: editingItem.job_code,
            job_description: editingItem.job_description,
            labour_cost: editingItem.labour_cost,
            category: editingItem.category,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update labour chart");
      }

      setEditingItem(null);
      fetchLabourCharts();
    } catch (err) {
      alert("Error updating labour chart");
    }
  };

  // ===============================
  // DELETE LABOUR CHART
  // ===============================
  const handleDeleteLabour = async (id: number) => {
    if (!confirm("Are you sure you want to delete this labour chart?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `http://localhost:4000/admin/labour-charts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete labour chart");
      }

      fetchLabourCharts();
    } catch (err) {
      alert("Error deleting labour chart");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Labour Chart</h1>

      {/* ================= ADD FORM ================= */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-3">Add Labour Chart</h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            className="border p-2"
            placeholder="Job Code"
            value={jobCode}
            onChange={(e) => setJobCode(e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Labour Cost"
            type="number"
            value={labourCost}
            onChange={(e) => setLabourCost(e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button
          onClick={handleAddLabour}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Labour
        </button>
      </div>

      {/* ================= TABLE ================= */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Job Code</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Labour Cost</th>
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
                  <td className="border p-2 text-center">
                    <button
                      className="text-blue-600 mr-3"
                      onClick={() => setEditingItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDeleteLabour(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {labourCharts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No labour charts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-semibold mb-4">Edit Labour Chart</h2>

            <input
              className="border p-2 w-full mb-2"
              value={editingItem.job_code}
              onChange={(e) =>
                setEditingItem({ ...editingItem, job_code: e.target.value })
              }
            />
            <input
              className="border p-2 w-full mb-2"
              value={editingItem.job_description}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  job_description: e.target.value,
                })
              }
            />
            <input
              className="border p-2 w-full mb-2"
              type="number"
              value={editingItem.labour_cost}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  labour_cost: Number(e.target.value),
                })
              }
            />
            <input
              className="border p-2 w-full mb-4"
              value={editingItem.category}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  category: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLabour}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
