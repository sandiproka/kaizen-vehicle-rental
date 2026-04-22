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
  });

  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  if (!vehicle) {
    return <div className="text-white p-10">No vehicle selected</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleCardPayment = async () => {
    if (
      !form.name ||
      !dates.startDate ||
      !dates.endDate
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/bookings", {
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

      toast.success("Payment successful!");
      navigate("/profile");
    } catch {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };


  const handleKhalti = async () => {
    if (!dates.startDate || !dates.endDate) {
      toast.error("Select rental dates first");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/payment/khalti/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000,
            vehicleId: vehicle.id,
          }),
        }
      );

      const data = await res.json();

      if (!data.payment_url) {
        toast.error("Khalti failed");
        return;
      }

    
      localStorage.setItem("vehicleId", vehicle.id);
      localStorage.setItem("startDate", dates.startDate);
      localStorage.setItem("endDate", dates.endDate);

   
      localStorage.removeItem("bookingDone");

      window.location.href = data.payment_url;
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
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
        <div className="bg-zinc-900 p-6 rounded-xl">
          <img
            src={vehicle.image || vehicle.images?.[0]}
            className="w-full h-60 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-semibold">{vehicle.name}</h2>
          <p className="text-amber-400 text-xl">
            ${vehicle.price?.toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setMethod("card")}
              className={`px-4 py-2 rounded ${
                method === "card" ? "bg-amber-400 text-black" : "bg-zinc-800"
              }`}
            >
              Card
            </button>

            <button
              onClick={() => setMethod("khalti")}
              className={`px-4 py-2 rounded ${
                method === "khalti" ? "bg-purple-600" : "bg-zinc-800"
              }`}
            >
              Khalti
            </button>
          </div>

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

          <input
            type="date"
            onChange={(e) =>
              setDates({ ...dates, startDate: e.target.value })
            }
            className="w-full p-3 bg-zinc-800 rounded"
          />

          <input
            type="date"
            onChange={(e) =>
              setDates({ ...dates, endDate: e.target.value })
            }
            className="w-full p-3 bg-zinc-800 rounded"
          />

          <button
            onClick={method === "card" ? handleCardPayment : handleKhalti}
            className="w-full bg-amber-400 text-black py-3 rounded"
          >
            {method === "card" ? "Pay Now" : "Pay with Khalti"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;