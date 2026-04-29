import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/* BEAUTY IMAGES (replace with real glowing skin images) */
import img1 from "@/assets/beauty/skin-1.jpg";
import img2 from "@/assets/beauty/skin-2.jpg";
import img3 from "@/assets/beauty/skin-3.jpg";

const slides = [img1, img2, img3];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full sm:py-16 h-[80vh] flex items-center overflow-hidden">

      {/* 🌸 FULL BACKGROUND (FADY PINK LUXURY) */}
      <div className="absolute inset-0 bg-gray-200 " />

      {/* soft glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(112, 87, 91, 0.4),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div className="text-left">

          <h1 className="text-4xl md:text-5xl font-bold text-white  leading-tight">
            Luxurious Beauty & <br />
            Skin Care Products
          </h1>

          <p className="mt-5 text-xl text-[#6B3B4A]">
            Discover premium skincare designed to enhance your natural glow,
            confidence, and beauty.
          </p>

          <Link to="/shop">
            <Button className="mt-8 px-8 py-4 rounded-full bg-[#C2185B] hover:bg-[#8E0E3C] text-white shadow-xl transition">
              Shop Now
            </Button>
          </Link>

        </div>

        {/* RIGHT IMAGE CAROUSEL */}
        <div className="relative w-full h-[520px]  overflow-hidden ">
            <div className="relative w-[85%] md:w-[70%] h-[420px] mx-auto overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={slides[current]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1 },
                    scale: { duration: 6, ease: "easeOut" }
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          {/* soft overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronRight />
          </button>

        </div>

      </div>
    </div>
  );
};