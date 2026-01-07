"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomerDashboard() {
  const router = useRouter();

  // 🔐 AUTH CHECK (MINIMAL + FIXED)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/customer-login");
    }
  }, [router]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Customer Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your vehicle services and inquiries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Servicing Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Live Servicing Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Vehicle Received → In Service → Quality Check → Ready for Delivery
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Vehicle Received</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">In Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Quality Check</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm">Ready for Delivery</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Labour Charges */}
        <Card>
          <CardHeader>
            <CardTitle>Labour Charges Estimate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View estimated service charges
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Parts</span>
                <span className="font-semibold">₹2,500</span>
              </div>
              <div className="flex justify-between">
                <span>Labour</span>
                <span className="font-semibold">₹1,500</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Total</span>
                <span className="font-semibold">₹4,000</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* AMC Renewal */}
        <Card>
          <CardHeader>
            <CardTitle>AMC Renewal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Annual Maintenance Contract
            </p>
            <div className="text-sm space-y-2">
              <p>Current Plan: Gold</p>
              <p>Expiry: Feb 15, 2026</p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Renew AMC
            </Button>
          </CardContent>
        </Card>

        {/* Road Assistance */}
        <Card>
          <CardHeader>
            <CardTitle>Road Assistance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Emergency roadside support
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Call Now
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              View Information
            </Button>
          </CardContent>
        </Card>

        {/* Insurance & Finance */}
        <Card>
          <CardHeader>
            <CardTitle>Insurance & Finance Enquiry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Check insurance and finance options
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Raise Request
            </Button>
          </CardContent>
        </Card>

        {/* Charging Station */}
        <Card>
          <CardHeader>
            <CardTitle>Charging Station Enquiry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Find EV charging stations (Upcoming)
            </p>
            <Button className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* HSRP */}
        <Card>
          <CardHeader>
            <CardTitle>HSRP Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              High Security Registration Plate details
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Model & Accessories */}
        <Card>
          <CardHeader>
            <CardTitle>Model & Accessories Enquiry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Browse models and accessories
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Explore
            </Button>
          </CardContent>
        </Card>

        {/* Events */}
        <Card>
          <CardHeader>
            <CardTitle>Events Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upcoming events and promotions
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              View Events
            </Button>
          </CardContent>
        </Card>

        {/* Resale */}
        <Card>
          <CardHeader>
            <CardTitle>Resale Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get your vehicle resale valuation
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Request Valuation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
