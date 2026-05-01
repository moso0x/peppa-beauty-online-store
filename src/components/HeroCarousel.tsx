import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/* IMAGES */
import img1 from "@/assets/beauty/skin-1.jpg";
import img2 from "@/assets/beauty/skin-2.jpg";
import img3 from "@/assets/beauty/skin-3.jpg";

import  oldSpiceDeoImg from "@/assets/thumbnails/oldSpiceDeoImg.jpg";
import  curelHandCreamImg from "@/assets/thumbnails/curelHandCreamImg.jpeg";
import brushBuddiesImg from "@/assets/thumbnails/brushBuddiesImg3.jpg";
import proSilkLotionImg from "@/assets/thumbnails/proSilkLotionImg.jpg";
import spaFootCreamImg from "@/assets/thumbnails/spaFootCreamImg.jpg";
import speedStickLadiesImg from "@/assets/thumbnails/speedStickLadiesImg.jpg"
import speedStickMenImg from "@/assets/thumbnails/speedStickMenImg.jpg";



const slides = [img1, img2, img3];

const slidess = [oldSpiceDeoImg, curelHandCreamImg, brushBuddiesImg , proSilkLotionImg , spaFootCreamImg, speedStickLadiesImg , speedStickMenImg];

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
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-background">

      {/* 🌸 Soft Gradient Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-50px] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-60px] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >

          {/* Badge */}
          <span className="inline-block px-4 py-1 text-black rounded-full bg-secondary font0bold  text-sm tracking-wide">
           Luxurious Beauty & Skinccare Products
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl leading-tight tracking-tight text-foreground">
            <span className="block font-light italics">
              Enhance Your
            </span>
            <span className=" font-indie block font-semibold text-primary">
              Natural Glow
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Discover luxury skincare crafted to nourish, restore, and elevate your everyday beauty routine.
          </p>

          {/* CTA */}
          <div className="flex gap-4 items-center">
            <Link to="/shop">
              <Button className="px-8 py-6 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-xl transition-all">
                Shop Now
              </Button>
            </Link>

            <Link to="/shop">
              <button className="text-sm font-medium text-muted-foreground hover:text-primary transition">
                Explore Products →
              </button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT CAROUSEL */}
        <div className="relative w-full h-[600px] flex items-center">

          {/* MAIN IMAGE */}
          <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] shadow-xl border border-border bg-card">

            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={slides[current]}
                initial={{ opacity: 0, scale: 1.1, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.05, x: -40 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* FLOATING IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-10 -left-6 w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl border border-border bg-card"
          >
            <img
              src={slidess[(current + 1) % slides.length]}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* ARROWS */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 
              bg-background/80 backdrop-blur-md 
              border border-border
              p-3 rounded-full shadow-md 
              hover:scale-110 transition"
          >
            <ChevronLeft className="text-foreground" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 
              bg-background/80 backdrop-blur-md 
              border border-border
              p-3 rounded-full shadow-md 
              hover:scale-110 transition"
          >
            <ChevronRight className="text-foreground" />
          </button>

        </div>
      </div>
    </section>
  );
};