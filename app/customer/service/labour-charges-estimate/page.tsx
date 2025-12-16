"use client"

import { useEffect, useState } from "react"

interface LabourChart {
  job_code: string
  job_description: string
  labour_cost: number
  category: string
}

export default function LabourChargesEstimatePage() {
  const [labours, setLabours] = useState<LabourChart[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLabours()
  }, [])

  const fetchLabours = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/customer/labour-charts"
      )

      const data = await res.json()
      setLabours(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to load labour charts")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Labour Charges Estimate
      </h1>

      <p className="text-gray-600">
        View estimated labour charges for your vehicle service.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : labours.length === 0 ? (
        <p className="text-gray-500">No labour data available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border bg-white rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Job Code</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Estimated Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              {labours.map((item, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{item.job_code}</td>
                  <td className="p-2 border">
                    {item.job_description}
                  </td>
                  <td className="p-2 border">{item.category}</td>
                  <td className="p-2 border">
                    ₹{item.labour_cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
