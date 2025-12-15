"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"

import CustomerPortalHeader from "@/components/customer-portal-header"
import ModuleSection from "@/components/module-section"
import CustomerSidebar from "@/components/customer-sidebar"
import { CUSTOMER_SECTIONS } from "@/lib/portal-modules"

const SECTION_OPTIONS = [
  { id: "service", label: "Service" },
  { id: "technician", label: "Service Technician Tools" },
  { id: "marketing", label: "Marketing" },
  { id: "profile", label: "My Profile" },
]

interface ServiceRequest {
  id: string;
  user_id: string;
  service_type: string;
  vehicle_number: string;
  description?: string;
  status: string;
  created_at: string;
}

// ⭐ Step 12.2 — Status Color UI Function
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
  const router = useRouter()

  const [activeSection, setActiveSection] = useState("service")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ⭐ Step 11.2 — Profile State
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    vehicle_number: "",
    address: "",
  })

  // ⭐ Step 8 — Service Requests
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)

  // ⭐ Step 9.2 — Book Service States
  const [showBookForm, setShowBookForm] = useState(false)
  const [serviceType, setServiceType] = useState("")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [description, setDescription] = useState("")

  // 🔐 AUTH PROTECTION + Fetch Profile + Fetch Requests
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/customer-login")
      return
    }

    const user = JSON.parse(userData)

    setEmail(user.email)
    setUserName(user.full_name)

    // ⭐ Fetch Profile
    fetch(`http://localhost:4000/customer/profile/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setProfile(data)
      })

    // ⭐ Fetch Requests
    fetch(`http://localhost:4000/customer/my-requests/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data)
        setLoading(false)
      })
  }, [])

  // ⭐ Booking Service
  const handleServiceBooking = async () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}")

    const res = await fetch("http://localhost:4000/service/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userData.id,
        service_type: serviceType,
        vehicle_number: vehicleNumber,
        description,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      alert("Service booked successfully!")
      setRequests((prev) => [data.newRequest, ...prev])
      setShowBookForm(false)
    } else {
      alert(data.error || "Booking failed")
    }
  }

  if (!email) return null

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)" }}>
      <CustomerPortalHeader userName={userName} userEmail={email} />

      <CustomerSidebar
        sections={SECTION_OPTIONS}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="max-w-6xl px-6 py-8">
        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg"
        >
          <Menu className="w-5 h-5" />
          <span>Sections</span>
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#1A2A5A] mb-2">Customer Dashboard</h2>
          <p className="text-gray-600">Track services, view information, and manage your account</p>
        </div>

        <div className="space-y-12">

          {/* ⭐ SERVICE SECTION */}
          {activeSection === "service" && (
            <>
              <button
                onClick={() => setShowBookForm(true)}
                className="mb-4 px-4 py-2 bg-[#1A2A5A] text-white rounded-md"
              >
                + Book New Service
              </button>

              <ModuleSection title="Service" modules={CUSTOMER_SECTIONS.service} />

              {/* ⭐ Service Request History */}
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-[#1A2A5A] mb-4">
                  My Service Requests
                </h3>

                {loading ? (
                  <p>Loading...</p>
                ) : requests.length === 0 ? (
                  <p>No requests found.</p>
                ) : (
                  <div className="space-y-4">
                    {requests.map((req) => (
                      <div key={req.id} className="p-4 bg-white rounded shadow-md">
                        <p><strong>Service:</strong> {req.service_type}</p>
                        <p><strong>Vehicle:</strong> {req.vehicle_number}</p>

                        {/* ⭐ Step 12.2 — Status Color Applied */}
                        <p>
                          <strong>Status:</strong>{" "}
                          <span className={getStatusClass(req.status)}>
                            {req.status}
                          </span>
                        </p>

                        <p><strong>Date:</strong> {req.created_at.slice(0, 10)}</p>
                        {req.description && <p><strong>Description:</strong> {req.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Technician */}
          {activeSection === "technician" && (
            <ModuleSection title="Service Technician Tools" modules={CUSTOMER_SECTIONS.technician} />
          )}

          {/* Marketing */}
          {activeSection === "marketing" && (
            <ModuleSection title="Marketing" modules={CUSTOMER_SECTIONS.marketing} />
          )}

          {/* ⭐ PROFILE SECTION */}
          {activeSection === "profile" && (
            <div className="bg-white p-6 rounded shadow-md space-y-4">
              <h3 className="text-2xl font-semibold text-[#1A2A5A] mb-4">My Profile</h3>

              <p><strong>Name:</strong> {profile.full_name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Vehicle Number:</strong> {profile.vehicle_number}</p>
              <p><strong>Address:</strong> {profile.address}</p>
            </div>
          )}

        </div>
      </main>

      {/* BOOK SERVICE MODAL */}
      {showBookForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">

            <h3 className="text-xl font-semibold mb-4">Book a Service</h3>

            <label className="block mb-2 text-sm">Service Type</label>
            <input
              className="w-full border p-2 rounded mb-4"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            />

            <label className="block mb-2 text-sm">Vehicle Number</label>
            <input
              className="w-full border p-2 rounded mb-4"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />

            <label className="block mb-2 text-sm">Description</label>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowBookForm(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-[#1A2A5A] text-white rounded"
                onClick={handleServiceBooking}
              >
                Book Service
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

// Status UI is now:
// 🟡 pending

// 🔵 accepted

// 🟣 in-progress

// 🟢 completed

// 🔴 cancelled