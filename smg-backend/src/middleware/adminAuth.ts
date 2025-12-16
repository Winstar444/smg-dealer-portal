import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing authorization header" });
    }

    // ✅ STEP 3 — DEMO BYPASS (TEMPORARY)
    // Allows frontend demo token to pass without real Supabase auth
    if (authHeader === "Bearer demo-admin-token") {
      return next();
    }

    // ⬇️ EXISTING REAL AUTH LOGIC (UNCHANGED)
    const token = authHeader.replace("Bearer ", "");

    // VERIFY USER WITH SUPABASE
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // CHECK ADMIN ROLE
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      return res.status(403).json({ error: "Admin access only" });
    }

    // AUTH PASSED
    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    return res.status(500).json({ error: "Authentication failed" });
  }
};
