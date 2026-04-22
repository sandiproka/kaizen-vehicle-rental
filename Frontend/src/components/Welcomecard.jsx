import { useRef, useEffect } from "react";

const Welcomecard = () => {
  const cardRef = useRef(null);
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  };

  useEffect(() => {
    const animate = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", `${currentX}px`);
        cardRef.current.style.setProperty("--y", `${currentY}px`);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl text-center py-20 px-6 overflow-hidden group"
    >

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 z-0"></div>

  
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 z-10"
        style={{
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--x) var(--y), white 0%, transparent 70%)",
          maskImage:
            "radial-gradient(220px circle at var(--x) var(--y), white 0%, transparent 70%)",
        }}
      >
        <img
          src="/cars/kog/kog1/4.webp"
          alt="car"
          className="w-full h-full object-cover opacity-100 scale-85"
        />
      </div>

  
      <div className="relative z-20">
        <h2 className="text-5xl font-light mb-4 text-zinc-200 tracking-wide">
          Welcome
        </h2>

        <div className="w-20 h-1 bg-amber-400 mx-auto mb-6 rounded"></div>

        <p className="max-w-3xl mx-auto text-zinc-400 text-lg leading-relaxed">
          KAIZEN is built on the philosophy of continuous improvement.
          We provide a seamless luxury vehicle marketplace experience,
          combining innovation, trust, and premium design.
        </p>
      </div>
    </div>
  );
};

export default Welcomecard;