import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Lenis from "@studio-freight/lenis";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const Root = () => {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <App />
      
      {/* ✅ TOASTER MUST BE HERE */}
      <Toaster position="top-center" />
    </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);