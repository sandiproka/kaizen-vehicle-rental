import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../components/UI/BackButton";

// 🔥 YOUR ORIGINAL GALLERY (UNCHANGED)
const vehicleGallery = {
  "Apollo IE": [
    "/cars/apollo/IE/1.webp",
    "/cars/apollo/IE/2.jpg",
    "/cars/apollo/IE/3.webp",
    "/cars/apollo/IE/4.webp",
    "/cars/apollo/IE/5.jpg",
    "/cars/apollo/IE/6.webp",
  ],
  "Koenigsegg Jesko": [
    "/cars/kog/kog1/1.webp",
    "/cars/kog/kog1/2.webp",
    "/cars/kog/kog1/3.webp",
    "/cars/kog/kog1/4.webp",
    "/cars/kog/kog1/5.webp",
  ],
  "Pagani Huayra Codalunga": [
    "/cars/pagani/huayra/1.jpg",
    "/cars/pagani/huayra/2.webp",
    "/cars/pagani/huayra/3.webp",
  ],
  "Nilu 27": [
    "/cars/nilu/2.webp",
    "/cars/nilu/1.jpg",
    "/cars/nilu/3.webp",
    "/cars/nilu/4.webp",
  ],
  "Nissan Skyline GT-R R34": [
    "/cars/nissan/skyline/4.jpeg",
    "/cars/nissan/skyline/2.jpeg",
    "/cars/nissan/skyline/3.jpeg",
    "/cars/nissan/skyline/5.jpeg",
    "/cars/nissan/skyline/6.jpeg",
    "/cars/nissan/skyline/1.jpeg",
  ],
  "BMW M4 CLS": [
    "/cars/bmw/m4/4.webp",
    "/cars/bmw/m4/2.webp",
    "/cars/bmw/m4/3.webp",
    "/cars/bmw/m4/1.webp",
  ],
  "Toyota 2000GT": [
    "/cars/toyota/2000GT/2.webp",
    "/cars/toyota/2000GT/3.webp",
    "/cars/toyota/2000GT/4.webp",
    "/cars/toyota/2000GT/5.webp",
    "/cars/toyota/2000GT/1.jpg",
  ],
  "Lamborghini Diablo": [
    "/cars/lambo/diablo/2.jpeg",
    "/cars/lambo/diablo/3.jpeg",
    "/cars/lambo/diablo/1.jpeg",
  ],
};

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED FETCH LOGIC
useEffect(() => {
  const fetchVehicle = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/vehicles");
      const data = await res.json();

      const found = data.find((v) => v.id === Number(id));

      if (found) {
        setVehicle(found);
        setSelectedImage(found.images?.[0] || found.image);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 🔥 IMPORTANT
    }
  };

  fetchVehicle();
}, [id]);

if (loading) {
  return <div className="text-white p-10">Loading...</div>;
}

  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { vehicle } });
      return;
    }

    navigate("/payment", { state: { vehicle } });
  };

  const galleryImages =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : vehicleGallery[vehicle.name] || [vehicle.image];

  return (
    <div className="bg-zinc-950 text-white min-h-screen px-8 py-12">

      <div className="px-8 pt-6">
        <BackButton />
      </div>

      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div>
          <div
            className="rounded-xl overflow-hidden mb-4 cursor-zoom-in group"
            onClick={() => setIsOpen(true)}
          >
            <img
              src={selectedImage}
              alt={vehicle.name}
              className="w-full h-[420px] object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-20 object-cover rounded cursor-pointer border ${
                  selectedImage === img
                    ? "border-amber-400 scale-105"
                    : "border-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{vehicle.name}</h1>

          <p className="text-amber-400 text-2xl mb-6">
            ${vehicle.price?.toLocaleString()}
          </p>

          <p className="text-zinc-400 mb-8">
            {vehicle.description || "No description available."}
          </p>

          <button
            onClick={handleBookNow}
            className="bg-amber-400 text-black px-6 py-3 rounded font-semibold hover:bg-amber-300"
          >
            Book Now
          </button>
        </div>

      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[85%]"
          />
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;