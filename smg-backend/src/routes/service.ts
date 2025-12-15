import { Router, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ---------------------------------------------
// CREATE NEW SERVICE REQUEST
// ---------------------------------------------
router.post("/book", async (req: Request, res: Response) => {
  try {
    const { user_id, service_type, vehicle_number, description } = req.body;

    if (!user_id || !service_type || !vehicle_number) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("service_requests")
      .insert([
        {
          user_id,
          service_type,
          vehicle_number,
          description,
          status: "pending"
        }
      ])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ message: "Service booked", newRequest: data });

  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// ---------------------------------------------
// CANCEL SERVICE REQUEST
// ---------------------------------------------
router.post("/cancel", async (req: Request, res: Response) => {
  try {
    const { request_id } = req.body;

    if (!request_id) {
      return res.status(400).json({ error: "Request ID required" });
    }

    const { error } = await supabase
      .from("service_requests")
      .update({ status: "cancelled" })
      .eq("id", request_id);

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ message: "Service cancelled" });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------------------------
// ⭐ STEP 12.1 — UPDATE SERVICE STATUS (Dealer/Admin)
// ---------------------------------------------
router.post("/update-status", async (req: Request, res: Response) => {
  try {
    const { request_id, status } = req.body;

    if (!request_id || !status) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { error } = await supabase
      .from("service_requests")
      .update({ status })
      .eq("id", request_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: "Status updated successfully" });

  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

export default router;
