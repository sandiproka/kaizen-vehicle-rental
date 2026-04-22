import { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Account created!");

    navigate("/login");

  } catch (err) {
    toast.error("Signup failed");
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-10 rounded-2xl w-[380px] border border-zinc-800 shadow-xl"
      >

        <h2 className="text-3xl font-semibold mb-2 text-center">
          Create Account
        </h2>

        <p className="text-gray-400 text-sm text-center mb-6">
          Join KAIZEN marketplace
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 bg-[#1a1a1a] border border-gray-700 rounded focus:border-amber-400 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-[#1a1a1a] border border-gray-700 rounded focus:border-amber-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded focus:border-amber-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-gray-400 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button className="w-full bg-amber-400 text-black py-3 rounded font-semibold hover:bg-amber-300 transition">
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;