import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (!Array.isArray(data)) {
          setBookings([]);
        } else {
          setBookings(data);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);


  const deleteBooking = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen px-8 py-12">

      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      <div className="mb-10">
        <p className="text-zinc-400">User</p>
        <p className="text-xl font-semibold">
          {user?.email || "User"}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Booking History
      </h2>

  
      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-zinc-400">No bookings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {bookings.map((b) => (
            
            <div
              key={b.id}
              className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
            >

             
              <img
                src={b.image || "/cars/apollo/IE/1.webp"}
                alt={b.name}
                className="h-40 w-full object-cover rounded mb-3"
              />

             
              <h3 className="font-semibold text-lg">
                {b.name}
              </h3>

              
              <p className="text-amber-400">
                ${b.price?.toLocaleString()}
              </p>

              
              <p className="text-zinc-400 text-sm mt-1">
                {b.start_date
                  ? new Date(b.start_date).toLocaleDateString()
                  : "N/A"} 
                {" → "}
                {b.end_date
                  ? new Date(b.end_date).toLocaleDateString()
                  : "N/A"}
              </p>

             
              <p className="text-xs text-zinc-500 mt-1">
                Booked on: {new Date(b.created_at).toLocaleString()}
              </p>

              
              <button
                onClick={() => deleteBooking(b.id)}
                className="text-red-400 text-sm mt-3 hover:underline"
              >
                Cancel Booking
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Profile;