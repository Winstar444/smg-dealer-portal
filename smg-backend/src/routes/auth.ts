import "dotenv/config";
import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// ----------------------------------------------------
// SUPABASE ADMIN CLIENT (Service Role Key)
// ----------------------------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ----------------------------------------------------
// CUSTOMER SIGNUP (UNCHANGED)
// ----------------------------------------------------
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, full_name, phone, vehicle_number, address } =
      req.body;

    // 1️⃣ Create user in Auth
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !authUser.user) {
      return res.status(400).json({ error: authError?.message });
    }

    const user_id = authUser.user.id;

    // 2️⃣ Insert into profiles table
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        user_id,
        email,
        full_name,
        phone,
        vehicle_number,
        address,
        role: "customer", // default
      },
    ]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: "Customer account created successfully",
      user_id,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------------------------------
// LOGIN (CUSTOMER / DEALER / ADMIN)
// ----------------------------------------------------
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Authenticate user
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !loginData.user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = loginData.user;

    // 2️⃣ Fetch profile STRICTLY by user_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile) {
      return res.status(403).json({ error: "Profile not found" });
    }

    // 🔍 DEBUG LOG (KEEP FOR NOW)
    console.log(
      "LOGIN PROFILE:",
      profile.email,
      "ROLE:",
      profile.role
    );

    // 3️⃣ Return user + role (NO OVERRIDES)
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        full_name: profile.full_name,
        role: profile.role, // 🔥 DEALER / CUSTOMER / ADMIN
      },
      session: loginData.session,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------------------------------
// EXPORT ROUTER
// ----------------------------------------------------
export default router;
