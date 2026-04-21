import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <div className="bg-zinc-950 text-white min-h-screen flex flex-col">



      {/* MAIN */}
      <div className="flex-1 px-8 py-16 max-w-7xl mx-auto w-full">

        {/* TOP SMALL TEXT */}
        <p className="text-gray-400 mb-2">Kaizen</p>

        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-6">ABOUT US</h1>

        {/* BUTTON */}
        <div className="mb-10">
          <button className="bg-zinc-800 px-6 py-2 rounded-full text-sm">
            Learn More
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-400 text-sm">Who we are</p>
              <h2 className="text-2xl font-semibold">
                Reliable Vehicle Rental Service
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                We provide a seamless platform to rent vehicles quickly and efficiently.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Our Mission
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Our goal is to simplify vehicle booking with modern technology and secure payments.
              </p>
            </div>

            <button className="bg-zinc-800 px-6 py-2 rounded-full text-sm">
              Get Started
            </button>

            {/* ICONS (optional placeholders) */}
            <div className="flex gap-4 text-gray-500 text-xl mt-4">
              <span>📱</span>
              <span>⚙️</span>
              <span>🚗</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
                src="/bikes/bmw/45.jpg"
                alt="Car"
                className="w-full h-[300px] object-cover rounded"
              />
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 text-gray-400 text-sm">

          <div>
            <h3 className="text-white font-semibold mb-2">Fast Booking</h3>
            <p>Quick and easy vehicle reservation process.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Secure Payment</h3>
            <p>Integrated with safe and reliable payment systems.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Wide Selection</h3>
            <p>Choose from a variety of premium vehicles.</p>
          </div>

        </div>

      </div>



    </div>
  );
};

export default About;