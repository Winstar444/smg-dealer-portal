"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface LabourItem {
  id: number;
  job_description: string;
  labour_cost: number;
}

export default function LabourChargesEstimatePage() {
  const [labourList, setLabourList] = useState<LabourItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabourCharges = async () => {
      const { data, error } = await supabase
        .from("labour_charts")
        .select("id, job_description, labour_cost")
        .order("job_description", { ascending: true });

      if (error) {
        console.error("Error fetching labour data:", error);
      } else {
        setLabourList(data || []);
      }

      setLoading(false);
    };

    fetchLabourCharges();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#1A2A5A] mb-2">
        Labour Charges Estimate
      </h1>
      <p className="text-gray-600 mb-6">
        View estimated labour charges for your vehicle service.
      </p>

      {/* Service Estimate Section */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">
          Service Estimate
        </h2>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        )}

        {/* Labour List */}
        {!loading && labourList.length > 0 && (
          <div className="space-y-3">
            {labourList.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded border"
              >
                <span className="text-gray-800">
                  {item.job_description}
                </span>
                <span className="font-semibold text-gray-900">
                  ₹{item.labour_cost}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && labourList.length === 0 && (
          <p className="text-gray-500 text-sm">
            No labour charges available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
