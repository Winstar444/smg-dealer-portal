import { Request, Response, NextFunction } from "express"
import { createClient } from "@supabase/supabase-js"
import "dotenv/config"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const demoTokenFromCookie = req.cookies?.admin_token

    // ----------------------------------
    // ✅ DEMO ADMIN BYPASS (FRONTEND DEMO)
    // ----------------------------------
    if (
      authHeader === "Bearer demo-admin-token" ||
      demoTokenFromCookie === "demo-admin-token"
    ) {
      return next()
    }

    // ----------------------------------
    // ❌ REAL AUTH REQUIRES HEADER
    // ----------------------------------
    if (!authHeader) {
      return res.status(401).json({ error: "Missing authorization header" })
    }

    const token = authHeader.replace("Bearer ", "")

    // VERIFY USER WITH SUPABASE
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" })
    }

    // CHECK ADMIN ROLE
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", data.user.id)
      .single()

    if (profileError || profile?.role !== "admin") {
      return res.status(403).json({ error: "Admin access only" })
    }

    next()
  } catch (err) {
    console.error("Admin auth error:", err)
    return res.status(500).json({ error: "Authentication failed" })
  }
}
