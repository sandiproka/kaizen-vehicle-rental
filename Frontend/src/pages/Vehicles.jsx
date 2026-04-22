import { useState, useEffect } from "react";
import VehicleCard from "../components/vehicle/VehicleCard";

const Vehicles = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);


  const [type, setType] = useState("car");


  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/vehicles?type=${type}`
        );
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error();

        setVehicles(data);
      } catch (err) {
        console.error(err);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [type]);


  const filteredVehicles = Array.isArray(vehicles)
    ? vehicles.filter((vehicle) => {
        const matchesSearch = vehicle.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesBrand =
          brand === "All" || vehicle.brand === brand;

        const matchesPrice =
          priceRange === "All" ||
          (priceRange === "under2" && vehicle.price < 2000000) ||
          (priceRange === "2to3" &&
            vehicle.price >= 2000000 &&
            vehicle.price <= 3000000) ||
          (priceRange === "above3" && vehicle.price > 3000000);

        return matchesSearch && matchesBrand && matchesPrice;
      })
    : [];

  if (loading) {
    return (
      <div className="text-white p-10 text-center">
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen px-8 py-10">

      <h1 className="text-4xl font-bold mb-6">
        Explore {type === "car" ? "Cars" : "Bikes"}
      </h1>

      {/* 🔥 TYPE TOGGLE */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setType("car")}
          className={`px-4 py-2 rounded ${
            type === "car"
              ? "bg-amber-400 text-black"
              : "bg-zinc-800"
          }`}
        >
          Cars
        </button>

        <button
          onClick={() => setType("bike")}
          className={`px-4 py-2 rounded ${
            type === "bike"
              ? "bg-amber-400 text-black"
              : "bg-zinc-800"
          }`}
        >
          Bikes
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-10">


        <div className="md:col-span-1 bg-zinc-900 p-6 rounded-xl h-fit">

          <h2 className="text-xl font-semibold mb-6">Filters</h2>

          <div className="space-y-6 text-sm">

     
            <div>
              <label className="block mb-2 text-zinc-400">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-zinc-800 p-2 rounded"
              >
                <option>All</option>
                <option>Apollo</option>
                <option>Koenigsegg</option>
                <option>Pagani</option>
                <option>Nilu</option>
                <option>Nissan</option>
                <option>BMW</option>
                <option>Toyota</option>
                <option>Lamborghini</option>
                <option>Ducati</option>
                <option>Kawasaki</option>
                <option>Yamaha</option>
              </select>
            </div>

    
            <div>
              <label className="block mb-2 text-zinc-400">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-zinc-800 p-2 rounded"
              >
                <option value="All">All</option>
                <option value="under2">Under $2M</option>
                <option value="2to3">$2M - $3M</option>
                <option value="above3">Above $3M</option>
              </select>
            </div>

          </div>
        </div>

  
        <div className="md:col-span-3">

          <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 p-3 rounded bg-zinc-900 border border-zinc-800"
          />

          <p className="text-zinc-400 mb-6 text-sm">
            Showing {filteredVehicles.length} vehicles
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                id={vehicle.id}
                image={vehicle.image}
                name={vehicle.name}
                price={`$${vehicle.price?.toLocaleString()}`}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Vehicles;