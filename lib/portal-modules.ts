export const ADMIN_MODULES = [
  {
    id: "new-dealer-onboarding",
    label: "New Dealer Onboarding",
    route: "/admin/new-dealer-onboarding",
  },

  // ❌ WRONG (kept as-is per your instruction)
  // This points to CUSTOMER route, do not use this going forward
  {
    id: "new-campaign",
    label: "New Campaign (OLD – DO NOT USE)",
    route: "/customer/marketing/new-campaign",
  },

  // ✅ CORRECT ADMIN ENTRY (ADDED)
  {
    id: "admin-new-campaign",
    label: "New Campaign",
    route: "/admin/marketing/new-campaign",
  },

  {
    id: "labour-chart-list",
    label: "Labour Chart List",
    route: "/admin/labour-chart-list",
  },

  {
    id: "spare-part-list",
    label: "Spare Part List",
    route: "/admin/spare-part-list",
  },

  {
    id: "marketing",
    label: "Marketing",
    route: "/admin/marketing",
  },

  {
    id: "new-model-list",
    label: "New Model List",
    route: "/admin/new-model-list",
  },

  {
    id: "roadside-assistance-chart",
    label: "Road Side Assistance Chart",
    route: "/admin/roadside-assistance-chart",
  },

  {
    id: "warranty-dates",
    label: "Warranty Dates",
    route: "/admin/warranty-dates",
  },

  {
    id: "sales-to-dealer",
    label: "Sales To Dealer",
    route: "/admin/sales-to-dealer",
  },

  {
    id: "hsrp-booking-confirmation",
    label: "HSRP Booking Confirmation",
    route: "/admin/hsrp-booking-confirmation",
  },

  {
    id: "service-training-modules",
    label: "Service Training Modules",
    route: "/admin/service-training-modules",
  },

  {
    id: "regional-technicians",
    label: "Regional Technician List",
    route: "/admin/regional-technicians",
  },

  {
    id: "training-meetings",
    label: "Training and Meeting Information",
    route: "/admin/training-meetings",
  },

  {
    id: "government-announcements",
    label: "Government Officials Announcements",
    route: "/admin/government-announcements",
  },

  {
    id: "spare-part-orders",
    label: "Spare Part Order Receiving",
    route: "/admin/spare-part-orders",
  },

  {
    id: "recall",
    label: "Recall Option",
    route: "/admin/recall",
  },
]

export const DEALER_SECTIONS = {
  services: [
    { id: "warranty-claim", label: "Warranty Claim", route: "/dealer/services/warranty-claim" },
    { id: "test-ride", label: "Test Ride", route: "/dealer/services/test-ride" },
    { id: "quotation-maker", label: "Quotation Maker", route: "/dealer/services/quotation-maker" },
    { id: "servicing-station", label: "Servicing Station", route: "/dealer/services/servicing-station" },
    { id: "technicians", label: "Technician List", route: "/dealer/services/technicians" },
    { id: "accessories-price", label: "Accessories Price List", route: "/dealer/services/accessories-price-list" },
    { id: "merchandize-price", label: "Merchandizes Price List", route: "/dealer/services/merchandize-price-list" },
    { id: "technician-data", label: "Technician Data Update", route: "/dealer/services/technician-data-update" },
    { id: "pdi-inspection", label: "PDI Inspection Sheet", route: "/dealer/services/pdi-inspection" },
    { id: "roadside-assistance", label: "Road Side Assistance", route: "/dealer/services/roadside-assistance" },
    { id: "amc", label: "AMC", route: "/dealer/services/amc" },
    { id: "hsrp-booking", label: "HSRP Booking", route: "/dealer/services/hsrp-booking" },
    { id: "training", label: "Service Training Modules", route: "/dealer/services/training-modules" },
    { id: "regional-technicians", label: "Regional Technician Details", route: "/dealer/services/regional-technicians" },
    { id: "resale-price", label: "Resale Price", route: "/dealer/services/resale-price" },
    { id: "lead-management", label: "Lead Management", route: "/dealer/services/lead-management" },
  ],
  sales: [
    { id: "corporate", label: "Corporate Sales", route: "/dealer/sales/corporate" },
    { id: "retail", label: "Retail Sales", route: "/dealer/sales/retail" },
    { id: "dealer-to-dealer", label: "Dealer To Dealer Sales", route: "/dealer/sales/dealer-to-dealer" },
    { id: "accessories", label: "Accessories", route: "/dealer/sales/accessories" },
    { id: "merchandize", label: "Merchandizes", route: "/dealer/sales/merchandize" },
  ],
  purchase: [
    { id: "direct", label: "Direct Purchase", route: "/dealer/purchase/direct" },
    { id: "dealer-purchase", label: "Dealer Purchase", route: "/dealer/purchase/dealer-purchase" },
    { id: "accessories", label: "Accessories", route: "/dealer/purchase/accessories" },
    { id: "merchandize", label: "Merchandizes", route: "/dealer/purchase/merchandize" },
    { id: "recall", label: "Recall Option", route: "/dealer/purchase/recall" },
  ],
  spare_parts: [
    { id: "purchase", label: "Spare Parts Purchase", route: "/dealer/spare-parts/purchase" },
    { id: "sales", label: "Spare Part Sales", route: "/dealer/spare-parts/sales" },
    { id: "price-list", label: "Spare Part Price List", route: "/dealer/spare-parts/price-list" },
    { id: "ordering", label: "Spare Part Ordering", route: "/dealer/spare-parts/ordering" },
  ],
  feedback: [{ id: "customer", label: "Customer Feedback Form", route: "/dealer/feedback/customer" }],
  events: [
    { id: "dealer-meetings", label: "Dealer Meetings and Trips", route: "/dealer/events/dealer-meetings" },
    { id: "technician-training", label: "Technician Training", route: "/dealer/events/technician-training" },
  ],
  announcements: [
    { id: "government", label: "Government Authorities Announcements", route: "/dealer/announcements/government" },
  ],
}

export const CUSTOMER_SECTIONS = {
  service: [
    { id: "live-tracking", label: "Live Servicing Tracking", route: "/customer/service/live-tracking" },
    { id: "labour-estimate", label: "Labour Charges Estimate", route: "/customer/service/labour-estimate" },
    { id: "amc-renewal", label: "AMC Renewal", route: "/customer/service/amc-renewal" },
    { id: "road-assistance", label: "Road Assistance", route: "/customer/service/road-assistance" },
    { id: "insurance-finance", label: "Insurance And Finance Enquiry", route: "/customer/service/insurance-finance" },
    { id: "charging-station", label: "Charging Station Enquiry", route: "/customer/service/charging-station" },
    { id: "hsrp-info", label: "HSRP Information", route: "/customer/service/hsrp-info" },
    { id: "product-enquiry", label: "Product Enquiry", route: "/customer/service/product-enquiry" },
    { id: "events", label: "Events Information", route: "/customer/service/events" },
    { id: "resale-request", label: "Resale Request", route: "/customer/service/resale-request" },
  ],
  technician: [
    { id: "details", label: "Technician Details", route: "/customer/technician/details" },
    { id: "complaints", label: "Complaint Incoming", route: "/customer/technician/complaints" },
    { id: "site-visits", label: "Going To the Site", route: "/customer/technician/site-visits" },
    { id: "feedback-form", label: "Customer Feedback Form", route: "/customer/technician/feedback-form" },
    { id: "satisfaction-form", label: "Customer Satisfaction Form", route: "/customer/technician/satisfaction-form" },
  ],
  marketing: [
    { id: "new-campaign", label: "New Campaign Launch", route: "/customer/marketing/new-campaign" },
    { id: "budget-approval", label: "Budget Approval", route: "/customer/marketing/budget-approval" },
    { id: "companies", label: "Marketing Companies", route: "/customer/marketing/companies" },
  ],
}
