import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adminCards = [
  { id: 1, title: "New Dealer Onboarding", description: "Manage dealer registrations" },
  { id: 2, title: "Labour Chart List", description: "Service labor rates and times" },
  { id: 3, title: "Spare Part List", description: "Inventory management" },
  { id: 4, title: "New Model List", description: "Vehicle model information" },
  { id: 5, title: "Road Side Assistance Chart", description: "Emergency service rates" },
  { id: 6, title: "Warranty Dates", description: "Warranty management" },
  { id: 7, title: "Sales To Dealer", description: "Distribution tracking" },
  { id: 8, title: "HSRP Booking Confirmation", description: "Registration management" },
  { id: 9, title: "Service Training Modules", description: "Staff training programs" },
  { id: 10, title: "Regional Technician List", description: "Technician & complaints" },
  { id: 11, title: "Training and Meeting Info", description: "Event management" },
  { id: 12, title: "Government Announcements", description: "Regulatory updates" },
  { id: 13, title: "Spare Part Orders", description: "Order history & transfers" },
  { id: 14, title: "Recall Option", description: "Recall management" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage all dealer management functions</p>
      </div>

      {/* Labour Chart Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Labour Chart List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Standard Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>LC001</TableCell>
                <TableCell>Oil Change</TableCell>
                <TableCell>30 mins</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LC002</TableCell>
                <TableCell>Filter Replacement</TableCell>
                <TableCell>20 mins</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LC003</TableCell>
                <TableCell>Brake Service</TableCell>
                <TableCell>60 mins</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Spare Part Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Spare Part List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Part No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>SP-001</TableCell>
                <TableCell>Engine Oil Filter</TableCell>
                <TableCell>Filters</TableCell>
                <TableCell>₹450</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SP-002</TableCell>
                <TableCell>Air Filter</TableCell>
                <TableCell>Filters</TableCell>
                <TableCell>₹350</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SP-003</TableCell>
                <TableCell>Brake Pad Set</TableCell>
                <TableCell>Brakes</TableCell>
                <TableCell>₹1,200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card) => (
          <Card key={card.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{card.description}</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Open</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
