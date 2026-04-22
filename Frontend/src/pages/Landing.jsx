import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WelcomeCard from "../components/Welcomecard";
import VehicleCard from "../components/vehicle/VehicleCard";
import FeaturedCard from "../components/vehicle/FeaturedCard";
import GridBackground from "../components/UI/GridBackground";
// import carImage from "../assets/cars/nilu27/1.jpg";



const Landing = () => {
  return (


    <div className="relative bg-zinc-950 text-white overflow-hidden">

      <GridBackground />




      <section className="relative h-[80vh] flex items-center justify-center pt-[-40px]">

  
          <div className="absolute inset-0">
            
            <img
              src="/cars/apollo/IE/5.jpg"
              alt="car"
              className="w-full h-full object-cover"
            />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
          </div>

     
          <div className="relative text-center z-10 px-6 animate-fadeIn -mt-24">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
              Drive <span className="text-amber-400">Luxury</span>
            </h1>

            <p className="text-white-400 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
              Discover premium vehicles tailored for performance,
              style, and excellence.
            </p>

            <button className="bg-amber-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-amber-500 transition duration-300 hover:scale-105 shadow-lg">
              Explore Vehicles
            </button>
          </div>

        </section>


      <section className="px-8 py-20 border-t border-zinc-800">
        <div className="grid md:grid-cols-2 gap-16 items-center">


          <div>
            <h2 className="text-5xl font-extrabold mb-6">
              Elevate Your <span className="text-amber-400">Drive</span>
            </h2>

            <p className="text-zinc-400 leading-relaxed text-lg">
              Discover a curated collection of luxury and exotic vehicles
              crafted for performance, prestige, and perfection.
              KAIZEN connects elite vendors with passionate drivers.
            </p>
          </div>

  
          <div className="space-y-8">

   
            <div className="h-24 rounded-xl overflow-hidden relative group">
              <img
                src="/cars/apollo/IE/6.webp"
                alt="car"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

   
            <div className="h-24 rounded-xl overflow-hidden relative w-3/4 ml-auto group">
              <img
                src="/cars/apollo/IE/4.webp"
                alt="car"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

          </div>

        </div>
      </section>





   
      <section className="px-8 py-24">
        <WelcomeCard />
      </section>





   
        <section className="px-8 py-20">

       
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-semibold text-white">HOT DEALS</h2>
            <button className="text-amber-400 hover:underline">
              View More →
            </button>
          </div>

      
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            <VehicleCard
              image="/cars/apollo/IE/6.webp"
              name="Apollo IE"
              price="$2,700,000"
            />

            <VehicleCard
              image="/cars/kog/kog1/1.webp"
              name="Koenigsegg Jesko"
              price="$3,000,000"
            />

            <VehicleCard
              image="/cars/pagani/huayra/1.jpg" 
              name="Pagani Huayra Codalunga"
              price="$2,900,000"
            />

            <VehicleCard
              image="/cars/nilu/2.webp"
              name="Nilu 27"
              price="$2,500,000"
            />

          </div>

        </section>




<section className="px-8 py-24">


  <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">
    <span className="text-white">FEATURED </span>
    <span className="text-amber-400">VEHICLES</span>
  </h2>


  <div className="grid md:grid-cols-3 gap-8 bg-white/5 on hover">

  
    <div className="md:col-span-2">
      <FeaturedCard
        image="/cars/toyota/2000GT/2.webp"
        name="Toyota 2000GT"
        price="$8,000,000"
        large
      />
    </div>

   
    <div className="flex flex-col gap-8">

      <FeaturedCard
        image="/cars/nissan/skyline/4.jpeg"
        name="Nissan Skyline GT-R R34"
        price="$450,000"
      />

      <FeaturedCard
        image="/cars/bmw/m4/4.webp"
        name="BMW M4 CLS"
        price="$320,000"
      />

    </div>

  </div>

</section>




      {/* CTA SECTION */}
      <section className="px-8 pb-28">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8">

          <h2 className="text-5xl font-light text-zinc-200">
            Ready To Experience Luxury?
          </h2>

          <button className="bg-amber-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-amber-500 transition duration-300">
            Browse Collection
          </button>

        </div>
      </section>



      {/* <Footer /> */}

    </div>
  );
};

export default Landing;