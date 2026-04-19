import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setBookings(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  // 🔥 CALCULATIONS
  const today = new Date();

  const totalBookings = bookings.length;

  const activeRentals = bookings.filter((b) => {
    const start = new Date(b.start_date);
    const end = new Date(b.end_date);
    return today >= start && today <= end;
  }).length;

  const upcomingRentals = bookings.filter((b) => {
    const start = new Date(b.start_date);
    return start > today;
  }).length;

  // 🔥 RECENT BOOKINGS
  const recent = bookings.slice(0, 4);

  return (
    <div className="bg-zinc-950 text-white min-h-screen px-8 py-10">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">
        Welcome, {user?.email}
      </h1>
      <p className="text-zinc-400 mb-10">
        Here’s your rental activity
      </p>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400">Total Bookings</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalBookings}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400">Active Rentals</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {activeRentals}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-400">Upcoming Rentals</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            {upcomingRentals}
          </h2>
        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <h2 className="text-2xl font-semibold mb-4">
        Recent Bookings
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {recent.map((b) => (
          <div
            key={b.id}
            className="bg-zinc-900 p-4 rounded-xl flex gap-4"
          >
            <img
              src={b.image}
              className="w-32 h-24 object-cover rounded"
            />

            <div>
              <h3 className="font-semibold">{b.name}</h3>
              <p className="text-amber-400">
                ${b.price?.toLocaleString()}
              </p>

              <p className="text-sm text-zinc-400">
                {new Date(b.start_date).toLocaleDateString()} →{" "}
                {new Date(b.end_date).toLocaleDateString()}
              </p>

              {/* STATUS */}
              <p className="text-xs mt-1">
                {new Date(b.start_date) <= today &&
                new Date(b.end_date) >= today ? (
                  <span className="text-green-400">Active</span>
                ) : new Date(b.start_date) > today ? (
                  <span className="text-yellow-400">Upcoming</span>
                ) : (
                  <span className="text-zinc-500">Completed</span>
                )}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-2xl font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/vehicles")}
          className="bg-amber-400 text-black px-6 py-3 rounded"
        >
          Browse Vehicles
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="bg-zinc-800 px-6 py-3 rounded"
        >
          View Profile
        </button>

      </div>

    </div>
  );
};

export default Dashboard;