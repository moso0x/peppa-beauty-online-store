import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";



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

const features = [
  { title: "Brush Buddies Charcoal Activated Toothpaste", price: "Starting From Ksh. 1,850", image: featured_10 },
  { title: "Curel Hand cream Handbag Size", price: "Starting From Ksh. 850.00", image: featured_11},
  { title: "Dermasil Face Cream", price: "Starting From Ksh. 1,400", image: featured_12 },
  { title: "Old Spice Pure Sport Deoderant Travel size", price: "Starting From Ksh. 1,050", image: featured_13},
  { title: "Pro Silk Body Lotion Aloe Vera", price: "Starting From Ksh. 1,400", image: featured_14 },
  { title: "SPA Scentials Foot Cream", price: " Starting From Ksh. 2,300", image: featured_15 },
  { title: "SPA Scentials Foot Scrub", price: " Starting From Ksh. 3,450", image: featured_16 },
  { title: "Speed Stick for Ladies", price: " Starting From Ksh. 2,100", image: featured_17 },
  { title: "SPA Luxury Lotion", price: "Starting From Ksh. 2,850", image: featured_18},
  { title: "Speed Stick Irish Spring for Men", price: " Starting From Ksh. 5,800", image: featured_19},
    { title: "Yardly of London Charcoal Activated for Acne", price: "Starting From Ksh. 5,800", image: featured_20 }
];

export const FeaturesSection = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (title: string) => {
    setWishlist((prev) =>
      prev.includes(title)
        ? prev.filter((i) => i !== title)
        : [...prev, title]
    );

    toast.success(
      wishlist.includes(title)
        ? "Removed from wishlist"
        : "Added to wishlist 💖"
    );
  };

  const share = (title: string) => {
    const url = `${window.location.origin}/product/${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;

    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  return (
    <section className="py-20 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl italic md:text-5xl font-semibold">
            Luxury Beauty & Skincare Essentials
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-[hsl(var(--muted-foreground))] leading-7">
            Discover premium skincare designed to hydrate, nourish, protect and enhance your natural glow.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

          {features.map((item, i) => {
            const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="
                  rounded-2xl overflow-hidden
                  bg-[hsl(var(--card))]
                  border border-[hsl(var(--border))]
                  shadow-[var(--shadow-md)]
                  hover:shadow-[var(--shadow-lg)]
                  transition-all duration-300
                "
              >

                {/* IMAGE */}
                <div className="relative group">
                  <img
                    src={item.image}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* actions */}
                  <div className="absolute top-3 right-3 flex gap-2">

                    <button
                      onClick={() => toggleWishlist(item.title)}
                      className="p-2 rounded-full bg-[hsl(var(--card))]/80 backdrop-blur hover:scale-110 transition"
                    >
                      <Heart
                        size={16}
                        className={
                          wishlist.includes(item.title)
                            ? "text-[hsl(var(--primary))] fill-[hsl(var(--primary))]"
                            : "text-[hsl(var(--muted-foreground))]"
                        }
                      />
                    </button>

                    <button
                      onClick={() => share(item.title)}
                      className="p-2 rounded-full bg-[hsl(var(--card))]/80 backdrop-blur hover:scale-110 transition"
                    >
                      <Share2
                        size={16}
                        className="text-[hsl(var(--muted-foreground))]"
                      />
                    </button>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 text-center">

                  <h3 className="text-base font-semibold text-black">
                    {item.title}
                  </h3>

                  <p className="text-xs font-bold  mt-1 text-pink-800">
                    {item.price}
                  </p>

                  {/* BUTTONS */}
                  
                  <div className="mt-4 flex flex-row gap-2">

                      <Link to={`/product/${slug}`} className="flex-1">
                        <button
                          className="
                            w-full py-2 rounded-full 
                            border border-[hsl(var(--secondary))]
                            text-[hsl(var(--foreground))]
                            hover:bg-[hsl(var(--primary))]
                            font-bold text-lg
                            hover:text-black
                            transition
                          "
                        >
                          View Details
                        </button>
                      </Link>

                      <button
                        className="
                          flex-1 py-2 rounded-full text-lg
                          flex items-center justify-center gap-2
                          bg-[hsl(var(--primary))]
                          text-black font-bold
                          hover:opacity-90 transition
                        "
                      >
                        Add to Cart <ShoppingCart size={16} />
                      </button>

                    </div>
                  </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};