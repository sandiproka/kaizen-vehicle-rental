import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import BackButton from "../components/UI/BackButton";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const vehicle = location.state?.vehicle;

  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    card: "",
    expiry: "",
    cvv: "",
  });

  // ✅ NEW DATE STATE
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  if (!vehicle) {
    return <div className="text-white p-10">No vehicle selected</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // ✅ UPDATED VALIDATION
    if (
      !form.name ||
      !form.card ||
      !form.expiry ||
      !form.cvv ||
      !dates.startDate ||
      !dates.endDate
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    if (!vehicle?.id) {
      toast.error("Vehicle ID missing ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          startDate: dates.startDate,
          endDate: dates.endDate,
        }),
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      toast.success("Payment successful!");

      setTimeout(() => {
        navigate("/profile");
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen px-8 py-12">

      <div className="px-8 pt-6">
        <BackButton />
      </div>

      <h1 className="text-4xl font-bold mb-10 text-center">
        Secure Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* VEHICLE */}
        <div className="bg-zinc-900 p-6 rounded-xl">

          <img
            src={vehicle.image || vehicle.images?.[0]}
            className="w-full h-60 object-cover rounded mb-4"
          />

          <h2 className="text-2xl font-semibold">
            {vehicle.name}
          </h2>

          <p className="text-amber-400 text-xl">
            ${vehicle.price?.toLocaleString()}
          </p>

        </div>

        {/* FORM */}
        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 bg-zinc-800 rounded"
          />

          <input
            value={form.email}
            disabled
            className="w-full p-3 bg-zinc-800 rounded"
          />

          {/* ✅ NEW DATE INPUTS */}
          <input
            type="date"
            value={dates.startDate}
            onChange={(e) =>
              setDates({ ...dates, startDate: e.target.value })
            }
            className="w-full p-3 bg-zinc-800 rounded"
          />

          <input
            type="date"
            value={dates.endDate}
            onChange={(e) =>
              setDates({ ...dates, endDate: e.target.value })
            }
            className="w-full p-3 bg-zinc-800 rounded"
          />

          <input
            name="card"
            placeholder="Card Number"
            onChange={handleChange}
            className="w-full p-3 bg-zinc-800 rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="expiry"
              placeholder="MM/YY"
              onChange={handleChange}
              className="p-3 bg-zinc-800 rounded"
            />
            <input
              name="cvv"
              placeholder="CVV"
              onChange={handleChange}
              className="p-3 bg-zinc-800 rounded"
            />
          </div>

          {/* ✅ LOADING TEXT */}
          {loading && (
            <p className="text-center text-amber-400 animate-pulse">
              Processing payment...
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-amber-400 text-black py-3 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Payment;