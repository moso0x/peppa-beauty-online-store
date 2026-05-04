import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/* IMAGES */
import img1 from "@/assets/beauty/skin-1.jpg";
import img2 from "@/assets/beauty/skin-2.jpg";
import img3 from "@/assets/beauty/skin-3.jpg";

import oldSpiceDeoImg from "@/assets/thumbnails/oldSpiceDeoImg.jpg";
import curelHandCreamImg from "@/assets/thumbnails/curelHandCreamImg.jpeg";
import brushBuddiesImg from "@/assets/thumbnails/brushBuddiesImg3.jpg";
import proSilkLotionImg from "@/assets/thumbnails/proSilkLotionImg.jpg";
import spaFootCreamImg from "@/assets/thumbnails/spaFootCreamImg.jpg";
// import speedStickLadiesImg from "@/assets/thumbnails/speedStickLadiesImg.jpg";
// import speedStickMenImg from "@/assets/thumbnails/speedStickMenImg.jpg";

const slides = [img1, img2, img3];
const slidess = [
  oldSpiceDeoImg,
  curelHandCreamImg,
  brushBuddiesImg,
  proSilkLotionImg,
  spaFootCreamImg,

];

const AUTO_PLAY_INTERVAL = 4200;

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [paused]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-50px] w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-120px] right-[-60px] w-[500px] h-[500px] bg-secondary/20 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 text-black rounded-full bg-secondary font-bold text-sm"
          >
            Luxurious Beauty & Skincare Products
          </motion.span>

          {/* Heading */}
          <motion.h1 className="text-4xl md:text-6xl leading-tight tracking-tight">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="block font-light italic"
            >
              Enhance Your
            </motion.span>

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.7 }}
              className="block font-semibold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent"
            >
              Natural Glow
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            Discover luxury skincare crafted to nourish, restore, and elevate your everyday beauty routine.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 items-center"
          >
            <Link to="/shop">
              <Button className="px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105 animate-[float_3s_ease-in-out_infinite]">
                Shop Now
              </Button>
            </Link>

            <Link to="/featuresSection">
              <button className="text-sm hover:text-primary transition">
                Explore Products →
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT CAROUSEL */}
        <div className="relative w-full h-[600px] flex items-center">
          {/* MAIN IMAGE */}
          <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] shadow-xl bg-card group">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={slides[current]}
                initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* PROGRESS BAR */}
            <motion.div
              key={current}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTO_PLAY_INTERVAL / 1000,
                ease: "linear",
              }}
              className="absolute bottom-0 left-0 h-1 bg-primary"
            />
          </div>

          {/* FLOATING PRODUCT */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 -left-6 w-44 h-44 rounded-2xl overflow-hidden shadow-2xl border bg-card hover:scale-110 transition"
          >
            <img
              src={slidess[current % slidess.length]}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* ARROWS */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md p-3 rounded-full shadow-md hover:scale-110 hover:bg-primary/20 transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md p-3 rounded-full shadow-md hover:scale-110 hover:bg-primary/20 transition"
          >
            <ChevronRight />
          </button>

          {/* DOTS */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
        `}
      </style>
    </section>
  );
};