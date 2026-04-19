import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";
import vehicleRoutes from "./routes/vehicles.js";
import path from "path";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from "./routes/payment.js";
import dotenv from "dotenv";
dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/payment", paymentRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});