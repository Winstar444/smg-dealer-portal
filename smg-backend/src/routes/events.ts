import { Router, Request, Response } from "express"
import { createClient } from "@supabase/supabase-js"
import { adminAuth } from "../middleware/adminAuth"
import "dotenv/config"

const router = Router()

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ========================================
// GET UPCOMING EVENTS
// ========================================
router.get("/", adminAuth, async (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split("T")[0]

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", today)
      .order("event_date", { ascending: true })

    if (error) return res.status(500).json({ error: error.message })

    return res.json(data)
  } catch {
    return res.status(500).json({ error: "Server error" })
  }
})

// ========================================
// GET EVENT HISTORY (PAST EVENTS)
// ========================================
router.get("/history", adminAuth, async (_req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .lt("event_date", today)
      .order("event_date", { ascending: false })

    if (error) return res.status(500).json({ error: error.message })

    return res.json(data)
  } catch {
    return res.status(500).json({ error: "Server error" })
  }
})

// ========================================
// CREATE EVENT
// ========================================
router.post("/", adminAuth, async (req, res) => {
  try {
    const { title, event_date, event_time, address, description } = req.body

    if (!title || !event_date || !event_time || !address) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const { data, error } = await supabase
      .from("events")
      .insert([{ title, event_date, event_time, address, description }])
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })

    return res.status(201).json(data)
  } catch {
    return res.status(500).json({ error: "Server error" })
  }
})

// ========================================
// UPDATE EVENT
// ========================================
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from("events")
      .update(req.body)
      .eq("id", id)
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })

    return res.json(data)
  } catch {
    return res.status(500).json({ error: "Server error" })
  }
})

// ========================================
// DELETE EVENT
// ========================================
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)

    if (error) return res.status(500).json({ error: error.message })

    return res.json({ message: "Event deleted" })
  } catch {
    return res.status(500).json({ error: "Server error" })
  }
})

export default router
