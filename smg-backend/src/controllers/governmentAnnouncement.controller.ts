import { Request, Response } from "express"
import { supabase } from "../utils/supabaseClient"
// GET all announcements (latest first)

export const getGovernmentAnnouncements = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("government_announcements")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json(data)
}

// ADD new announcement
export const addGovernmentAnnouncement = async (req: Request, res: Response) => {
  const { title, description } = req.body

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" })
  }

  const { data, error } = await supabase
    .from("government_announcements")
    .insert([{ title, description }])
    .select()
    .single()

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.status(201).json(data)
}

// UPDATE announcement
export const updateGovernmentAnnouncement = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description } = req.body

  const { error } = await supabase
    .from("government_announcements")
    .update({ title, description })
    .eq("id", id)

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json({ message: "Announcement updated" })
}

// DELETE announcement
export const deleteGovernmentAnnouncement = async (req: Request, res: Response) => {
  const { id } = req.params

  const { error } = await supabase
    .from("government_announcements")
    .delete()
    .eq("id", id)

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json({ message: "Announcement deleted" })
}
