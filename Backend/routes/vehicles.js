import express from "express";
import db from "../db/db.js";

const router = express.Router();

// ✅ GET all vehicles (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM vehicles ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

// ✅ ADD vehicle
router.post("/", async (req, res) => {
  try {
    const { name, price, brand, image, images, description } = req.body;

    await db.query(
      `INSERT INTO vehicles(name, price, brand, image, images, description)
       VALUES($1,$2,$3,$4,$5,$6)`,
      [
        name,
        price,
        brand,
        image,
        images || [],
        description || "",
      ]
    );

    res.json({ message: "Vehicle added" });
  } catch (err) {
    console.error("❌ ADD ERROR:", err);
    res.status(500).json({ error: "Failed to add vehicle" });
  }
});

// ✅ UPDATE vehicle
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, brand, image, images, description } = req.body;

    await db.query(
      `UPDATE vehicles 
       SET name=$1, price=$2, brand=$3, image=$4, images=$5, description=$6
       WHERE id=$7`,
      [
        name,
        price,
        brand,
        image,
        images || [],
        description || "",
        id,
      ]
    );

    res.json({ message: "Vehicle updated" });
  } catch (err) {
    console.error("❌ UPDATE ERROR:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// ✅ DELETE vehicle
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM vehicles WHERE id=$1", [id]);

    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;