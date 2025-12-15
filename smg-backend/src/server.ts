import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import customerRoutes from "./routes/customer";
import serviceRoutes from "./routes/service";
import adminRoutes from "./routes/admin";
import eventRoutes from "./routes/events"

const app = express();

// ================================
// MIDDLEWARE
// ================================
app.use(
  cors({
    origin: "http://localhost:3000", // frontend
    credentials: true,
  })
);

app.use(express.json());

// ================================
// HEALTH CHECK
// ================================
app.get("/", (_req, res) => {
  res.send("SMG Backend is running 🚀");
});

// ================================
// ROUTES
// ================================
app.use("/admin", adminRoutes);        // Admin (login, labour charts, dealers)
app.use("/admin/events", eventRoutes); // Admin (events)
app.use("/auth", authRoutes);          // Auth (signup/login)
app.use("/customer", customerRoutes);  // Customer profile
app.use("/service", serviceRoutes);    // Service requests

// ================================
// SERVER START
// ================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
