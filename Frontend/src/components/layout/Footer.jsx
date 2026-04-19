import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-zinc-400 pt-20 pb-10 px-8 border-t border-zinc-800">

      {/* Top */}
      <div className="grid md:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">
            KAIZEN
          </h2>
          <p className="text-sm leading-relaxed mb-6">
            Elevating your driving experience with a curated collection of luxury and exotic vehicles.
          </p>

          {/* Social */}
          <div className="flex gap-4 text-lg">
            <FaInstagram className="hover:text-amber-400 cursor-pointer transition" />
            <FaLinkedin className="hover:text-amber-400 cursor-pointer transition" />
            <FaFacebook className="hover:text-amber-400 cursor-pointer transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Vehicles", "Login"].map((item) => (
              <li
                key={item}
                className="relative w-fit cursor-pointer hover:text-amber-400 transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {["Sports Cars", "Luxury Sedans", "Hypercars", "Electric"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-amber-400 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">
            Get latest luxury deals and updates.
          </p>

          {/* Input */}
          <div className="flex items-center bg-zinc-900 rounded-lg overflow-hidden border border-zinc-700 focus-within:border-amber-400 transition">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 py-2 text-sm w-full outline-none"
            />
            <button className="bg-amber-400 text-black px-4 py-2 text-sm font-medium hover:bg-amber-300 transition">
              Subscribe
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-sm space-y-1">
            <p>Pokhara, Nepal</p>
            <p>sandip@kaizen.com</p>
            <p>+977 9806640377</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm text-zinc-500">
          © 2026 KAIZEN. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0 text-sm">
          <span className="hover:text-amber-400 cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-amber-400 cursor-pointer transition">Terms</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;