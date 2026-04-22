import express from "express";

const router = express.Router();


router.post("/khalti/initiate", async (req, res) => {
  try {
    const { amount, vehicleId } = req.body;

    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: "http://localhost:5173/payment-success",
          website_url: "http://localhost:5173",
          amount: amount,
          purchase_order_id: vehicleId,
          purchase_order_name: "Vehicle Booking",
        }),
      }
    );

    const data = await response.json();

    console.log("Khalti response:", data);

    res.json(data);
  } catch (err) {
    console.error("Khalti error:", err);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});



router.post("/khalti/verify", async (req, res) => {
  try {
    const { pidx } = req.body;

    const response = await fetch("https://a.khalti.com/api/v2/epayment/lookup/", {
      method: "POST",
      headers: {
        Authorization: "Key YOUR_SECRET_KEY",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

export default router;