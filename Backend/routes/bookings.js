import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import db from "../db/db.js";

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;

  console.log("BODY:", req.body); // 🔥 DEBUG

  if (!vehicleId || !startDate || !endDate) {
    return res.status(400).json({
      message: "vehicleId, startDate and endDate are required",
    });
  }

  try {

    const vehicleCheck = await db.query(
      "SELECT id FROM vehicles WHERE id=$1",
      [vehicleId]
    );

    if (vehicleCheck.rowCount === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

  
    const result = await db.query(
      `INSERT INTO bookings (user_id, vehicle_id, start_date, end_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, vehicleId, startDate, endDate]
    );

    console.log("✅ INSERTED:", result.rows[0]);

    res.json({
      message: "Booking saved",
      booking: result.rows[0],
    });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ message: "Error saving booking" });
  }
});



router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
      b.id,
      b.start_date,
      b.end_date,
      b.created_at,
      v.name,
      v.price,
      v.image
   FROM bookings b
   JOIN vehicles v ON b.vehicle_id = v.id
   WHERE b.user_id = $1
   ORDER BY b.created_at DESC`,
      [req.user.id]
    );

    console.log("📦 BOOKINGS FETCHED:", result.rows);

    res.json(result.rows);

  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});



router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM bookings WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("🗑️ BOOKING DELETED:", result.rows[0]);

    res.json({ message: "Booking deleted" });

  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;