import { Router, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import { adminAuth } from "../middleware/adminAuth";
import crypto from "crypto";

const router = Router();

// ----------------------------------------
// Supabase Admin Client (Service Role)
// ----------------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ========================================
// ADMIN LOGIN
// ========================================
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .single();

    if (profileError || !profile) {
      return res.status(403).json({ error: "Not an admin account" });
    }

    return res.status(200).json({
      message: "Admin login successful",
      user: profile,
      session: data.session,
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ========================================
// DEALER ONBOARDING (ADMIN ONLY)
// ========================================

// ✅ CREATE DEALER
router.post("/dealers", adminAuth, async (req: Request, res: Response) => {
  try {
    const { dealer_name, email, phone, location, city, state } = req.body;

    if (!dealer_name || !email) {
      return res.status(400).json({ error: "Dealer name and email required" });
    }

    // 🔐 Generate random password
    const password = crypto.randomBytes(6).toString("hex");

    // 1️⃣ Create Auth User
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !authUser.user) {
      return res.status(400).json({ error: authError?.message });
    }

    // 2️⃣ Insert Dealer Profile
    const { error: profileError } = await supabase
      .from("dealer_profiles")
      .insert({
        user_id: authUser.user.id,
        dealer_name,
        email,
        phone,
        location,
        city,
        state,
      });

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(201).json({
      message: "Dealer created successfully",
      dealer: {
        dealer_name,
        email,
        phone,
        location,
        city,
        state,
        password, // ⚠️ show once only
      },
    });
  } catch (err) {
    console.error("Create dealer error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET ALL DEALERS
router.get("/dealers", adminAuth, async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("dealer_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Fetch dealers error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ DELETE DEALER (STEP 4.2)
router.delete("/dealers/:id", adminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find dealer profile
    const { data: dealer, error } = await supabase
      .from("dealer_profiles")
      .select("user_id")
      .eq("id", id)
      .single();

    if (error || !dealer) {
      return res.status(404).json({ error: "Dealer not found" });
    }

    // 2️⃣ Delete auth user
    await supabase.auth.admin.deleteUser(dealer.user_id);

    // 3️⃣ Delete dealer profile
    await supabase
      .from("dealer_profiles")
      .delete()
      .eq("id", id);

    return res.status(200).json({ message: "Dealer deleted successfully" });
  } catch (err) {
    console.error("Delete dealer error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ========================================
// LABOUR CHARTS (ADMIN ONLY)
// ========================================

router.get("/labour-charts", adminAuth, async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("labour_charts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Fetch labour charts error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/labour-charts", adminAuth, async (req, res) => {
  try {
    const { job_code, job_description, labour_cost, category } = req.body;

    if (!job_code || !job_description || !labour_cost) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("labour_charts")
      .insert([{ job_code, job_description, labour_cost, category }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error("Create labour chart error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/labour-charts/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("labour_charts")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Update labour chart error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/labour-charts/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("labour_charts")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res
      .status(200)
      .json({ message: "Labour chart deleted successfully" });
  } catch (err) {
    console.error("Delete labour chart error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// ========================================
// SPARE PARTS (ADMIN ONLY)
// ========================================

// GET ALL SPARE PARTS
router.post("/spare-parts", adminAuth, async (req, res) => {
  try {
    const { part_no, part_name, part_type, price } = req.body;

    if (!part_no || !part_name || !part_type || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("spare_parts")
      .insert([{ part_no, part_name, part_type, price }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error("Create spare part error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// CREATE SPARE PART
router.post("/spare-parts", adminAuth, async (req, res) => {
  try {
    const { part_code, part_name, price, category } = req.body;

    if (!part_code || !part_name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("spare_parts")
      .insert([{ part_code, part_name, price, category }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error("Create spare part error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE SPARE PART
router.put("/spare-parts/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("spare_parts")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Update spare part error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE SPARE PART
router.delete("/spare-parts/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("spare_parts")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Spare part deleted successfully" });
  } catch (err) {
    console.error("Delete spare part error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// upcoming events
router.get("/events", adminAuth, async (_req, res) => {
  const today = new Date().toISOString().split("T")[0]
  const time = new Date().toTimeString().slice(0, 5)

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .or(`event_date.gt.${today},and(event_date.eq.${today},event_time.gt.${time})`)
    .order("event_date", { ascending: true })
    .order("event_time", { ascending: true })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// event History
router.get("/events/history", adminAuth, async (_req, res) => {
  const today = new Date().toISOString().split("T")[0]
  const time = new Date().toTimeString().slice(0, 5)

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .or(`event_date.lt.${today},and(event_date.eq.${today},event_time.lt.${time})`)
    .order("event_date", { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.post("/events", adminAuth, async (req, res) => {
  const { title, event_date, event_time, address, description } = req.body

  if (!title || !event_date || !event_time || !address) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { error } = await supabase.from("events").insert({
    title,
    event_date,
    event_time,
    address,
    description,
  })

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: "Event added" })
})

export default router;
