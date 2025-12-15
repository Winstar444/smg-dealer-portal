import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MarketingDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Marketing Dashboard</h1>
        <p className="text-muted-foreground">Campaign management and budget tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Active Campaigns</p>
            <p className="text-4xl font-bold text-primary">3</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Monthly Budget</p>
            <p className="text-4xl font-bold text-primary">₹3,00,000</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Leads This Month</p>
            <p className="text-4xl font-bold text-primary">120</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>New Campaign Launch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Launch new marketing campaigns</p>
              <Button className="w-full bg-primary hover:bg-primary/90">Open</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Budget Approval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Request and approve budgets</p>
              <Button className="w-full bg-primary hover:bg-primary/90">Open</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Marketing Companies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Manage marketing partners</p>
              <Button className="w-full bg-primary hover:bg-primary/90">Open</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Campaign Details */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="pb-4 border-b border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Winter Sale Campaign</p>
                  <p className="text-xs text-muted-foreground">Dec 2025 - Jan 2026</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">Budget: ₹1,20,000 | Leads: 45</p>
            </div>

            <div className="pb-4 border-b border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Digital Marketing Initiative</p>
                  <p className="text-xs text-muted-foreground">Ongoing</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">Budget: ₹1,50,000 | Leads: 68</p>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Loyalty Program</p>
                  <p className="text-xs text-muted-foreground">Ongoing</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Planning</span>
              </div>
              <p className="text-sm text-muted-foreground">Budget: ₹30,000 | Leads: 7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
