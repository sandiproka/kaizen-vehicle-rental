import { useEffect, useRef } from "react";

const GridBackground = () => {
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ref.current.style.setProperty("--x", `${x}px`);
      ref.current.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(circle at var(--x) var(--y), white 120px, transparent 250px)",
        WebkitMaskImage:
          "radial-gradient(circle at var(--x) var(--y), white 120px, transparent 250px)",
      }}
    />
  );
};

export default GridBackground;