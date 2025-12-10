import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const serviceCards = [
  { title: "Warranty Claim", desc: "Acceptance and Rejection" },
  { title: "Test Ride", desc: "Schedule and manage" },
  { title: "Quotation Maker", desc: "Generate quotes" },
  { title: "Servicing Station", desc: "Service centers" },
  { title: "Technician List & Complaints", desc: "Staff management" },
  { title: "Accessories Price List", desc: "Accessory pricing" },
  { title: "Merchandizes Price List", desc: "Merchandise pricing" },
  { title: "Technician Data Update", desc: "Update records" },
  { title: "PDI Inspection Sheet", desc: "Pre-delivery inspection" },
  { title: "Road Side Assistance", desc: "Emergency support" },
  { title: "AMC", desc: "Annual Maintenance Contract" },
  { title: "HSRP Booking", desc: "Registration service" },
  { title: "Service Training", desc: "Training programs" },
  { title: "Regional Technician Details", desc: "Technician info" },
  { title: "Resale Price", desc: "Vehicle valuation" },
  { title: "Lead Management", desc: "Sales leads" },
]

const salesCards = [
  { title: "Corporate Sales", desc: "Corporate Orders" },
  { title: "Retail Sales", desc: "To Customer" },
  { title: "Dealer To Dealer", desc: "Sub Dealer" },
  { title: "Accessories", desc: "Accessory sales" },
  { title: "Merchandizes", desc: "Merchandise sales" },
]

const purchaseCards = [
  { title: "Direct Purchase", desc: "From manufacturer" },
  { title: "Dealer Purchase", desc: "Dealer inventory" },
  { title: "Accessories", desc: "Accessory purchase" },
  { title: "Merchandizes", desc: "Merchandise purchase" },
  { title: "Recall Option", desc: "Recall management" },
]

const sparePartCards = [
  { title: "Spare Parts Purchase", desc: "Order parts" },
  { title: "Spare Part Sales", desc: "Sell parts" },
  { title: "Spare Part Price List", desc: "View pricing" },
  { title: "Spare Part Ordering", desc: "Place orders" },
]

export default function DealerDashboard() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dealer Dashboard</h1>
        <p className="text-muted-foreground">Manage all dealer operations</p>
      </div>

      {/* Services Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceCards.map((card, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{card.desc}</p>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Warranty Claim Table */}
      <Card>
        <CardHeader>
          <CardTitle>Warranty Claim History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>WC-001</TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Accepted</span>
                </TableCell>
                <TableCell>₹5,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>WC-002</TableCell>
                <TableCell>Sarah Johnson</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Pending</span>
                </TableCell>
                <TableCell>₹3,500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline">
              View Details
            </Button>
            <Button size="sm" variant="outline">
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Sales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {salesCards.map((card, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{card.desc}</p>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Purchase Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Purchase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchaseCards.map((card, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{card.desc}</p>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Spare Parts Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Spare Parts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sparePartCards.map((card, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{card.desc}</p>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Feedback</h2>
        <Card>
          <CardHeader>
            <CardTitle>Customer Feedback Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="px-3 py-2 border border-border rounded" />
              <input type="email" placeholder="Email" className="px-3 py-2 border border-border rounded" />
            </div>
            <textarea
              placeholder="Your comments..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded"
            />
            <Button className="bg-primary hover:bg-primary/90">Submit Feedback</Button>
          </CardContent>
        </Card>
      </section>

      {/* Events & Training */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Events & Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Dealer Meetings and Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Upcoming events</p>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                View Events
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Technician Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Training programs</p>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                View Programs
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Announcements */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Announcements</h2>
        <Card>
          <CardHeader>
            <CardTitle>Government Authorities Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="pb-3 border-b border-border">
                <p className="text-xs text-muted-foreground">Dec 1, 2025</p>
                <p className="font-medium">New Emission Standards Effective</p>
              </div>
              <div className="pb-3 border-b border-border">
                <p className="text-xs text-muted-foreground">Nov 28, 2025</p>
                <p className="font-medium">Safety Compliance Update</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nov 25, 2025</p>
                <p className="font-medium">Warranty Extension Guidelines</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
