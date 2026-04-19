import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Admin = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    description: "",
    images: [],
  });

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [stats, setStats] = useState(null);

  // 📊 STATS
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => toast.error("Failed to load stats"));
  }, []);

  // 🔥 LOAD IMAGES
  const imageModules = import.meta.glob("/public/cars/**/*.{jpg,jpeg,png,webp}", {
    eager: true,
  });

  const imagePaths = Object.keys(imageModules).map((path) =>
    path.replace("/public/cars/", "")
  );

  const groupedImages = imagePaths.reduce((acc, path) => {
    const [brand] = path.split("/");
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push("/cars/" + path);
    return acc;
  }, {});

  // 🚗 FETCH VEHICLES
const fetchVehicles = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/vehicles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid response");
    }

    setVehicles(data);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load vehicles");
    setVehicles([]); // prevents crash
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchVehicles();
  }, []);

  const toggleImage = (img) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.includes(img)
        ? prev.images.filter((i) => i !== img)
        : [...prev.images, img],
    }));
  };

  // ✅ FIXED SUBMIT
  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.brand) {
      return toast.error("Fill all fields");
    }

    setAdding(true);

    const payload = {
      name: form.name,
      price: form.price,
      brand: form.brand,
      description: form.description,
      image: form.images[0],
      images: form.images,
    };

    try {
      await fetch(
        editingId
          ? `http://localhost:5000/api/vehicles/${editingId}`
          : "http://localhost:5000/api/vehicles",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      toast.success(editingId ? "Updated ✏️" : "Added 🚗");

      fetchVehicles();

      setForm({
        name: "",
        price: "",
        brand: "",
        description: "",
        images: [],
      });

      setEditingId(null);
    } catch {
      toast.error("Failed");
    } finally {
      setAdding(false);
    }
  };

  const deleteVehicle = async (id) => {
    await fetch(`http://localhost:5000/api/vehicles/${id}`, {
      method: "DELETE",
    });
    fetchVehicles();
  };

  const chartData = stats
    ? [
        { name: "Users", value: stats.users },
        { name: "Vehicles", value: stats.vehicles },
        { name: "Bookings", value: stats.bookings },
      ]
    : [];

    if (loading) {
  return <div className="text-white p-10">Loading admin...</div>;
}

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

      {/* STATS */}
      {stats && (
        <div className="mb-10">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {chartData.map((item) => (
              <div key={item.name} className="bg-zinc-900 p-4 rounded text-center">
                <p>{item.name}</p>
                <h2 className="text-xl">{item.value}</h2>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="bg-zinc-900 p-6 rounded space-y-4">

          <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Vehicle" : "Add Vehicle"}
        </h2>

         <input
          placeholder="Vehicle Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 bg-zinc-800 rounded text-white"
        />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full p-3 bg-zinc-800 rounded text-white"
      />

      <input
        placeholder="Brand"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
        className="w-full p-3 bg-zinc-800 rounded text-white"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-3 bg-zinc-800 rounded text-white"
      />

          {/* IMAGE SELECTOR */}
          {Object.keys(groupedImages).map((brand) => (
            <div key={brand}>
              <p className="text-amber-400">{brand}</p>
              <div className="grid grid-cols-4 gap-2">
                {groupedImages[brand].map((img) => (
                  <img key={img} src={img}
                    onClick={() => toggleImage(img)}
                    className={`h-20 cursor-pointer ${
                      form.images.includes(img) ? "border-2 border-amber-400" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* LIST */}
        <div>
          
          {Array.isArray(vehicles) && vehicles.map((v) => (
            <div key={v.id} className="flex justify-between bg-zinc-900 p-3 mb-2">
              <div className="flex gap-4">
                <img src={v.image} className="w-20" />
                <div>
                  <p>{v.name}</p>
                  <p>${v.price}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => {
                  setEditingId(v.id);
                  setForm({
                    name: v.name,
                    price: v.price,
                    brand: v.brand,
                    description: v.description || "",
                    images: v.images || [v.image],
                  });
                }}>Edit</button>

                <button onClick={() => deleteVehicle(v.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Admin;