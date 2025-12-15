import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ServiceTechnicianDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Service Technician Dashboard</h1>
        <p className="text-muted-foreground">Manage service operations and customer feedback</p>
      </div>

      {/* Technician Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-semibold">Rajesh Kumar</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Employee ID</p>
                <p className="font-semibold">TEC-001</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-semibold">Service</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-semibold">5 Years</p>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technician</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Rajesh Kumar</TableCell>
                <TableCell>TEC-001</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Priya Singh</TableCell>
                <TableCell>TEC-002</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Incoming Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint Incoming</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>CMP-001</TableCell>
                <TableCell>Amit Patel</TableCell>
                <TableCell>Engine noise</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">In Progress</span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">High</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CMP-002</TableCell>
                <TableCell>Maya Dutta</TableCell>
                <TableCell>Brake issue</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Resolved</span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">High</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Going To Site */}
      <Card>
        <CardHeader>
          <CardTitle>Going To The Site</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary rounded">
              <div>
                <p className="font-medium">Site Visit - Zone A</p>
                <p className="text-xs text-muted-foreground">10:30 AM</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded">
              <div>
                <p className="font-medium">Customer Follow-up - Zone B</p>
                <p className="text-xs text-muted-foreground">2:00 PM</p>
              </div>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">En Route</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded">
              <div>
                <p className="font-medium">Service Inspection - Zone A</p>
                <p className="text-xs text-muted-foreground">4:00 PM</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Feedback Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input type="text" placeholder="Customer Name" className="w-full px-3 py-2 border border-border rounded" />
            <textarea placeholder="Feedback..." rows={3} className="w-full px-3 py-2 border border-border rounded" />
            <Button className="w-full bg-primary hover:bg-primary/90">Submit</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rating (1-5)</label>
              <select className="w-full px-3 py-2 border border-border rounded mt-1">
                <option>Select rating...</option>
                <option>1 - Poor</option>
                <option>2 - Fair</option>
                <option>3 - Good</option>
                <option>4 - Very Good</option>
                <option>5 - Excellent</option>
              </select>
            </div>
            <textarea placeholder="Comments..." rows={3} className="w-full px-3 py-2 border border-border rounded" />
            <Button className="w-full bg-primary hover:bg-primary/90">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
