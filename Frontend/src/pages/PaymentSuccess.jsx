import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const alreadySaved = localStorage.getItem("bookingDone");

    if (alreadySaved) return; // 🛑 prevent duplicate

    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (status === "Completed") {
      localStorage.setItem("bookingDone", "true");
      saveBooking();
    } else {
      toast.error("Payment not completed");
      navigate("/vehicles");
    }
  }, []);

  const saveBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId: localStorage.getItem("vehicleId"),
          startDate: localStorage.getItem("startDate"),
          endDate: localStorage.getItem("endDate"),
        }),
      });

      // ✅ CLEAR STORAGE
      localStorage.removeItem("vehicleId");
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");

      toast.success("Booking saved!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    }
  };

  return <div className="text-white p-10">Verifying Payment...</div>;
};

export default PaymentSuccess;