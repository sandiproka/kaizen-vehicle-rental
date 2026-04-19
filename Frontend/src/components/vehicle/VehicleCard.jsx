import { Link } from "react-router-dom";

const VehicleCard = ({ id, image, name, price }) => {
  return (
    <Link to={`/vehicle/${id}`}>

      <div className="group cursor-pointer">

        <div className="relative rounded-2xl overflow-hidden bg-zinc-900 transform transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl border border-zinc-800 group-hover:border-amber-400/40">

          {/* ✅ FIXED IMAGE */}
          <img
            src={image}
            onError={(e) => {
              e.target.src = "/fallback.jpg"; // optional
            }}
            className="h-40 w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-500"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-5 w-full z-10">

            <h3 className="text-white text-lg font-semibold">
              {name}
            </h3>

            <p className="text-amber-400 mt-1 text-sm">
              {price}
            </p>

          </div>

        </div>

      </div>

    </Link>
  );
};

export default VehicleCard;