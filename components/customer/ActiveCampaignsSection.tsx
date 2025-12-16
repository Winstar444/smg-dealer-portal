"use client"

import { useEffect, useState } from "react"

interface Campaign {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
}

export default function ActiveCampaignsSection() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:4000/customer/marketing-campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#1A2A5A]">
        Active Campaigns
      </h3>

      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-500">
          No active campaigns at the moment
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="bg-white border rounded-xl p-6"
            >
              <h4 className="font-semibold text-[#1A2A5A] mb-1">
                {c.title}
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                {c.description || "No description provided"}
              </p>
              <p className="text-xs text-gray-500">
                Valid till: {c.end_date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
