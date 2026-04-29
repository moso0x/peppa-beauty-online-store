import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import toast from "react-hot-toast";

import cleanser from "@/assets/skincare/cleanser.jpg";
import vitaminC from "@/assets/skincare/vitamin-c-serum.jpg";
import moisturizer from "@/assets/skincare/moisturizer.jpg";
import sunscreen from "@/assets/skincare/sunscreen.jpg";
import toner from "@/assets/skincare/toner.jpg";
import faceMask from "@/assets/skincare/face-mask.jpg";
import eyeCream from "@/assets/skincare/eye-cream.jpg";
import bodyOil from "@/assets/skincare/body-oil.jpg";
import acneSerum from "@/assets/skincare/acne-serum.jpg";
import beautySet from "@/assets/skincare/beauty-set.jpg";

const features = [
  {
    title: "Hydrating Facial Cleanser",
    price: "From Ksh. 1,850",
    image: cleanser
  },
  {
    title: "Vitamin C Brightening Serum",
    price: "From Ksh. 3,200",
    image: vitaminC
  },
  {
    title: "Luxury Daily Moisturizer",
    price: "From Ksh. 2,950",
    image: moisturizer
  },
  {
    title: "SPF 50 Radiance Sunscreen",
    price: "From Ksh. 2,600",
    image: sunscreen
  },
  {
    title: "Rose Water Balancing Toner",
    price: "From Ksh. 1,650",
    image: toner
  },
  {
    title: "Glow Renewal Face Mask",
    price: "From Ksh. 2,300",
    image: faceMask
  },
  {
    title: "Revitalizing Eye Cream",
    price: "From Ksh. 3,450",
    image: eyeCream
  },
  {
    title: "Nourishing Body Oil",
    price: "From Ksh. 2,100",
    image: bodyOil
  },
  {
    title: "Clarifying Acne Treatment Serum",
    price: "From Ksh. 2,850",
    image: acneSerum
  },
  {
    title: "Luxury Skincare Gift Set",
    price: "From Ksh. 5,800",
    image: beautySet
  }
];

export const FeaturesSection = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const handleWishlistToggle = (title: string) => {
    setWishlist((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );

    toast.success(
      wishlist.includes(title)
        ? "Removed from wishlist"
        : "Added to wishlist ❤️"
    );
  };

  const handleShare = (title: string) => {
    const shareUrl = `${window.location.origin}/product/${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;

    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard 📋");
  };

  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">

        {/* Intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Luxury Beauty & Skincare Essentials
          </h2>

          <p className="text-muted-foreground  max-w-3xl mx-auto">
            Discover premium skincare formulated to hydrate, nourish, protect,
            and enhance your natural glow — from cleansers and serums to
            moisturizers, sunscreens and curated beauty collections.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const shortDescription =
              feature.price.split(" ").slice(0, 3).join(" ") + "...";

            const slug = feature.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");

            return (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12
                }}
                className="rounded-xl overflow-hidden bg-white shadow-xl text-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
              >
                <div className="relative">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-34 object-cover transition-transform duration-500 hover:scale-110"
                  />

                  {/* Wishlist + Share */}
                  <div className="absolute top-2 right-2 flex gap-2">

                    <button
                      onClick={() => handleWishlistToggle(feature.title)}
                      className="p-1.5 rounded-full text-2xl bg-white/80 hover:bg-white shadow-md transition"
                    >
                      <Heart
                        size={16}
                        className={
                          wishlist.includes(feature.title)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-700"
                        }
                      />
                    </button>

                    <button
                      onClick={() => handleShare(feature.title)}
                      className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md transition"
                    >
                      <Share2
                        size={16}
                        className="text-gray-700"
                      />
                    </button>

                  </div>
                </div>

                <div className="p-3 text-center hover:bg-gray-50 transition-colors duration-300">
                  <h3 className="text-base font-semibold mb-1 text-primary">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-muted-foreground mb-2">
                    {shortDescription}
                  </p>

                  <Link to={`/product/${slug}`}>
                    <button
                      className="text-xs font-medium text-rose-600 border border-rose-600 rounded-full px-3 py-1
                      hover:bg-rose-600 hover:text-white transition-all duration-300"
                    >
                      Shop Now
                    </button>
                  </Link>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};