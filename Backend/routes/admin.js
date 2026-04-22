import express from "express";
import db from "../db/db.js";

const router = express.Router();


router.get("/stats", async (req, res) => {
  try {
    const users = await db.query("SELECT COUNT(*) FROM users");
    const vehicles = await db.query("SELECT COUNT(*) FROM vehicles");
    const bookings = await db.query("SELECT COUNT(*) FROM bookings");

    res.json({
      users: users.rows[0].count,
      vehicles: vehicles.rows[0].count,
      bookings: bookings.rows[0].count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

export default router;