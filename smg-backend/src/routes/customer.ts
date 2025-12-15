import { Router, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const router = Router();

// Supabase Admin Client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --------------------------------------------
// UPDATE CUSTOMER PROFILE
// --------------------------------------------
router.post("/update-profile", async (req: Request, res: Response) => {
  try {
    const { email, full_name, phone, vehicle_number, address } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name,
        phone,
        vehicle_number,
        address,
        updated_at: new Date()
      })
      .eq("email", email);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: "Profile updated successfully" });

  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// --------------------------------------------
// GET CUSTOMER SERVICE REQUESTS
// --------------------------------------------
router.get("/my-requests/:user_id", async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from("service_requests")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// --------------------------------------------
// ⭐ GET CUSTOMER PROFILE (Step 11 API)
// --------------------------------------------
router.get("/profile/:user_id", async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (error) return res.status(400).json({ error: error.message });

    return res.json(data);

  } catch (err) {
    console.error("Profile fetch error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
