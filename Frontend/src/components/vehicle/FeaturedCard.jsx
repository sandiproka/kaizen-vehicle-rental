const FeaturedCard = ({ image, name, price, large }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        large ? "h-[420px]" : "h-[200px]"
      }`}
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 z-10">
        <h3
          className={`text-white ${
            large ? "text-3xl font-semibold" : "text-lg font-medium"
          }`}
        >
          {name}
        </h3>

        <p className="text-amber-400 mt-1">{price}</p>
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5"></div>
    </div>
  );
};

export default FeaturedCard;