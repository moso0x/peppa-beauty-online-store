import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

/* Images (unchanged) */
import featured_1 from "@/assets/featured/featured-1.jpg";
import featured_2 from "@/assets/featured/featured-2.jpg";
import featured_3 from "@/assets/featured/featured-3.jpg";
import featured_4 from "@/assets/featured/featured-4.jpg";
import featured_5 from "@/assets/featured/featured-5.jpg";
import featured_6 from "@/assets/featured/featured-6.jpg";
import featured_7 from "@/assets/featured/featured-7.jpg";
import featured_8 from "@/assets/featured/featured-8.jpg";
import featured_9 from "@/assets/featured/featured-9.jpg";
import featured_10 from "@/assets/featured/featured-10.jpg";
import featured_11 from "@/assets/featured/featured-11.jpg";
import featured_12 from "@/assets/featured/featured-12.jpg";
import featured_13 from "@/assets/featured/featured-13.jpg";
import featured_14 from "@/assets/featured/featured-14.jpg";
import featured_15 from "@/assets/featured/featured-15.jpg";
import featured_16 from "@/assets/featured/featured-16.jpg";
import featured_17 from "@/assets/featured/featured-17.jpg";
import featured_18 from "@/assets/featured/featured-18.jpg";
import featured_19 from "@/assets/featured/featured-19.jpeg";
import featured_20 from "@/assets/featured/featured-20.jpg";
import featured_21 from "@/assets/featured/featured-21.jpg";
import featured_22 from "@/assets/featured/featured-22.jpg";


// ... keep all your imports as-is

const featuredData = [
  {
    title: "Featured Beauty & Skincare Collections",
    images: [
       featured_11,
      featured_12,
      featured_13,
      featured_14,
      featured_15,
      featured_16,
      featured_17,
      featured_18,
      featured_19,
      featured_20,
      featured_21,
      featured_22,
      featured_1,
      featured_2,
      featured_3,
      featured_4,
      featured_5,
      featured_6,
      featured_7,
      featured_8,
      featured_9,
      featured_10,
     
    ],
    description:
      "Explore luxurious skincare essentials formulated to hydrate, nourish, protect and reveal naturally radiant glowing skin.",
    labels: [
      "Vitamin C Serum",
      "Hydrating Face Cream",
      "Glow Facial Oil",
      "Brightening Cleanser",
      "Rose Water Toner",
      "Night Repair Serum",
      "SPF Protection",
      "Body Butter",
    ],
  },
];

/* -----------------------------
MAIN COMPONENT
------------------------------*/

export default function FeaturedProductsCarousel() {
  return (
    <section className="relative w-full py-28 px-4 bg-gradient-to-b from-rose-50 via-pink-50 to-white overflow-hidden">

      {/* Soft glow background */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-300/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-300/20 blur-[120px] rounded-full" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <p className="uppercase tracking-[0.35em] text-sm text-rose-500 font-medium">
          Luxury Beauty Edit
        </p>

            <h2 className="font-indie text-5xl md:text-7xl font-semibold text-gray-900 italic leading-tight mt-4">
            Radiance, Beauty & Glow
            </h2>
        <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg leading-8">
          Discover curated skincare collections designed for hydration,
          restoration, and luminous beauty.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="w-44 h-[3px] rounded-full bg-gradient-to-r from-pink-400 to-rose-300" />
        </div>
      </motion.div>

      {/* CAROUSEL SECTION */}
      {featuredData.map((section, idx) => (
        <InfiniteCarousel key={idx} section={section} />
      ))}
    </section>
  );
}

/* -----------------------------
INFINITE CAROUSEL
------------------------------*/

function InfiniteCarousel({ section }: any) {
  // duplicate for infinite flow
  const loopImages = [...section.images, ...section.images];
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative max-w-7xl mx-auto">

      {/* INNER CARD WRAPPER */}
      <div className="rounded-[3rem] bg-white/70 backdrop-blur-xl border border-rose-100 shadow-2xl p-10 md:p-14 relative overflow-hidden">

        {/* Floating glow */}
        <div className="absolute -top-20 right-0 w-72 h-72 bg-pink-200/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/30 blur-[90px] rounded-full" />

        {/* TEXT */}
        <div className="text-center mb-12 relative z-10">
          <p className="text-rose-500 uppercase tracking-[0.3em] text-sm mb-3">
            Featured Collection
          </p>

          <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">
            {section.title}
          </h3>

          {/* <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {section.description}
          </p> */}
        </div>

        {/* INFINITE FLOW */}
        <div className="relative overflow-hidden">

       <motion.div
                className="flex gap-6 w-max"
                animate={paused ? { x: "0%" } : { x: ["0%", "-50%"] }}
                onHoverStart={() => setPaused(true)}
                onHoverEnd={() => setPaused(false)}
                transition={{
                    duration: 120,
                    ease: "linear",
                    repeat: Infinity,
                }}
                >
                            {loopImages.map((img: string, i: number) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="min-w-[260px] md:min-w-[300px] rounded-[2rem] overflow-hidden bg-white shadow-xl border border-rose-100"
              >
                <div className="relative">
                  <img
                    src={img}
                    className="h-56 w-72 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-1 rounded-full text-xs font-medium text-gray-700">
                    Glow Care
                  </div> */}
                </div>

                <div className="p-5">
                  <h4 className="font-semibold text-lg text-gray-900">
                    {section.labels[i % section.labels.length]}
                  </h4>
                  <p className="text-sm text-gray-500 mt-2 leading-6">
                    Hydration + glow-enhancing skincare formula.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-pink-100 to-rose-200 text-black p-10 rounded-[2.5rem] shadow-xl relative z-10">

          <div>
            <h4 className="text-3xl md:text-4xl italic text-black font-semibold">
             Pure Care. Real Glow.

            </h4>
            <p className="opacity-90 mt-2">
              Premium skincare curated for glowing, healthy skin.
            </p>
          </div>

          <Link
            to="/shop"
            className="bg-white text-rose-500 px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition"
          >
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}