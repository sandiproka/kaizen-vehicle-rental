import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  console.log("USER:", user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center border-b border-zinc-800 relative z-50">
      
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-amber-400 cursor-pointer"
      >
        KAIZEN
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">

        <Link to="/" className="hover:text-amber-400">
          Home
        </Link>

        <Link to="/about" className="hover:text-amber-400">
          About
        </Link>

        <Link to="/vehicles" className="hover:text-amber-400">
          Vehicles
        </Link>

        {/* ✅ DASHBOARD (ONLY NORMAL USER) */}
        {user && user.role === "user" && (
          <Link to="/dashboard" className="hover:text-amber-400">
            Dashboard
          </Link>
        )}

        {/* ✅ ADMIN ONLY */}
        {user && user.role === "admin" && (
          <Link to="/admin" className="hover:text-amber-400">
            Admin
          </Link>
        )}

        {/* 🔐 AUTH SECTION */}
        {loading ? (
          <div className="w-24 h-8 bg-zinc-800 rounded animate-pulse"></div>
        ) : user ? (
          <div className="relative">

            {/* USER BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="bg-amber-400 text-black px-4 py-2 rounded text-sm hover:bg-amber-300 transition"
            >
              {user.email || "User"}
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded shadow-lg z-50">

                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-zinc-800"
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-zinc-800"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-800"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          <Link
            to="/login"
            className="bg-amber-400 text-black px-4 py-2 rounded text-sm hover:bg-amber-300 transition"
          >
            Login
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;