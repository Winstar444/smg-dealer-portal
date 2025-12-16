"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import CustomerPortalHeader from "@/components/customer-portal-header";
import ModuleSection from "@/components/module-section";
import CustomerSidebar from "@/components/customer-sidebar";
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules";

const SECTION_OPTIONS = [
  { id: "service", label: "Service" },
  { id: "technician", label: "Service Technician Tools" },
  { id: "marketing", label: "Marketing" },
  { id: "profile", label: "My Profile" },
];

interface ServiceRequest {
  id: string;
  service_type: string;
  vehicle_number: string;
  description?: string;
  status: string;
  created_at: string;
}

function getStatusClass(status: string) {
  switch (status) {
    case "pending": return "text-yellow-600 font-semibold";
    case "accepted": return "text-blue-600 font-semibold";
    case "in-progress": return "text-indigo-600 font-semibold";
    case "completed": return "text-green-600 font-semibold";
    case "cancelled": return "text-red-600 font-semibold";
    default: return "text-gray-600";
  }
}

export default function CustomerDashboard() {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("service");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    full_name: "Demo Customer",
    email: "demo@customer.com",
    phone: "9999999999",
    vehicle_number: "DL01AB1234",
    address: "New Delhi, India",
  });

  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  const [showBookForm, setShowBookForm] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [description, setDescription] = useState("");

  // 🔐 AUTH PROTECTION + MOCK DATA
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/customer/login");
      return;
    }

    // MOCK REQUESTS
    setRequests([
      {
        id: "1",
        service_type: "General Service",
        vehicle_number: "DL01AB1234",
        status: "pending",
        created_at: new Date().toISOString(),
        description: "Brake issue",
      },
      {
        id: "2",
        service_type: "Battery Check",
        vehicle_number: "DL01AB1234",
        status: "completed",
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);
  }, []);

  const handleServiceBooking = () => {
    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      service_type: serviceType,
      vehicle_number: vehicleNumber,
      description,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    setShowBookForm(false);

    setServiceType("");
    setVehicleNumber("");
    setDescription("");

    alert("Service booked successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerPortalHeader
        userName={profile.full_name}
        userEmail={profile.email}
      />

      <CustomerSidebar
        sections={SECTION_OPTIONS}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="max-w-6xl mx-auto px-6 py-8">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 inline-flex items-center gap-2 px-3 py-2 bg-white border rounded"
        >
          <Menu className="w-5 h-5" />
          Sections
        </button>

        <h2 className="text-3xl font-semibold mb-6">Customer Dashboard</h2>

        {activeSection === "service" && (
          <>
            <button
              onClick={() => setShowBookForm(true)}
              className="mb-4 px-4 py-2 bg-[#1A2A5A] text-white rounded"
            >
              + Book New Service
            </button>

            <ModuleSection title="Service" modules={CUSTOMER_SECTIONS.service} />

            <div className="mt-8 space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="p-4 bg-white rounded shadow">
                    <p><b>Service:</b> {req.service_type}</p>
                    <p><b>Vehicle:</b> {req.vehicle_number}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span className={getStatusClass(req.status)}>
                        {req.status}
                      </span>
                    </p>
                    <p><b>Date:</b> {req.created_at.slice(0, 10)}</p>
                    {req.description && <p><b>Description:</b> {req.description}</p>}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeSection === "technician" && (
          <ModuleSection title="Service Technician Tools" modules={CUSTOMER_SECTIONS.technician} />
        )}

        {activeSection === "marketing" && (
          <ModuleSection title="Marketing" modules={CUSTOMER_SECTIONS.marketing} />
        )}

        {activeSection === "profile" && (
          <div className="bg-white p-6 rounded shadow space-y-2">
            <p><b>Name:</b> {profile.full_name}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Phone:</b> {profile.phone}</p>
            <p><b>Vehicle:</b> {profile.vehicle_number}</p>
            <p><b>Address:</b> {profile.address}</p>
          </div>
        )}
      </main>

      {showBookForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Book Service</h3>

            <input
              placeholder="Service Type"
              className="w-full border p-2 mb-3"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            />

            <input
              placeholder="Vehicle Number"
              className="w-full border p-2 mb-3"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowBookForm(false)}>Cancel</button>
              <button
                onClick={handleServiceBooking}
                className="bg-[#1A2A5A] text-white px-4 py-2 rounded"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
