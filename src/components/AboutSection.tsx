import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import logo_banner from "@/assets/logo-banner.jpg";
import banner from "@/assets/advert-banner.png";
import customer_1 from "@/assets/customers/customer1.jpg";
import customer_2 from "@/assets/customers/customer2.jpg";
import customer_7 from "@/assets/customers/customer7.jpg";
import customer_4 from "@/assets/customers/customer4.jpg";
import customer_5 from "@/assets/customers/customer5.jpg";
import customer_9 from "@/assets/customers/customer9.jpg";
import customer_8 from "@/assets/customers/customer8.jpg";

// Customer product images
const productImages = [
  customer_1,
  customer_2,
  customer_7,
  customer_4,
  customer_5,
  customer_9,
  customer_8,
];

export const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* HEADER ROW: Image + Text side by side */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <img
                src={logo_banner}
                alt="Jelimo Creatives"
                className="w-64 h-64 object-cover border-4 border-[#64B5F6] shadow-xl rounded-xl"
              />
              <img
                src={logo}
                alt="Jelimo Creatives Logo"
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-white shadow-lg p-2"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl font-bold mb-4 text-black">
               Printing & Branding Services in Kenya
            </h1>
            <h3 className="text-lg text-gray-700 mb-3">
              Custom T-shirts, hoodies, and caps designed to be worn with pride.
            </h3>
            <p className="text-[#64B5F6] font-semibold">
              Place your order — we deliver across Kenya.
            </p>
          </motion.div>
        </div>

        {/* ABOUT CARD */}
        <Card className="p-8 max-w-5xl mx-auto mb-12 shadow-lg border border-[#64B5F6]/20">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Jelimo Creatives | Custom Printing & Branding
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Custom Merchandise & Branded Apparel:</strong> Bring your
              vision to life with custom gear that makes a statement. From
              design to production, we ensure your brand shines on high-quality
              products.
            </p>
            <p>
              <strong>Our Customization Services Include:</strong> Apparel:
              T-shirts, hoodies, and caps designed to be worn with pride. Gifts &
              Promotional Items: mugs, calendars, stationery, and unique
              corporate gifts that leave a lasting impression. Full Design
              Support: we can work with your brand or create one from scratch.
            </p>
            <p>
              <strong>Event Promotion & Purpose-Driven Collaborations:</strong>{" "}
              We partner with clients to create memorable, community-driven
              campaigns that inspire engagement and connection.
            </p>
            <p>
              We believe every print tells a story — yours deserves to be bold,
              creative, and unforgettable.
            </p>
          </div>
        </Card>

        {/* PRODUCT DETAILS */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto border border-[#64B5F6]/20 text-center">
          <h3 className="text-2xl font-bold mb-6 text-[#FF5C26]">
            Our Customization Services Include:
          </h3>

          <div className="grid md:grid-cols-2 gap-8 items-start justify-center">
            {/* Column 1 */}
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FF5C26] rounded-full"></span>
                100% Cotton
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#64B5F6] rounded-full"></span>
                Locally Made
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FFEB3B] rounded-full"></span>
                Sizes from S to 2XL
              </li>
            </ul>

            {/* Column 2 */}
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#64B5F6] rounded-full"></span>
                T-shirts, hoodies, and caps
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FF5C26] rounded-full"></span>
                Mugs, calendars, stationery, and unique corporate gifts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FFEB3B] rounded-full"></span>
                Polo T-shirts
              </li>
            </ul>
          </div>

          {/* Banner Image */}
          <div className="flex justify-center mt-8">
            <img
              src={banner}
              alt="Product Banner"
              className="w-[300px] sm:w-[400px] rounded-lg shadow-md"
            />
          </div>

          {/* Button */}
          <Button className="mt-8 bg-[#FF5C26] text-white font-medium hover:opacity-80 transition-all rounded-full px-6">
            See Price List
          </Button>
        </div>

        {/* CLIENTS MARQUEE */}
        <div className="text-center font-bold text-4xl mt-20 mb-8 text-[#64B5F6]">
          Happy Clients
        </div>

        <div className="mt-10 space-y-8 overflow-hidden">
          {/* Row 1: Left → Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
            >
              {productImages.concat(productImages).map((src, idx) => (
                <img
                  key={`row1-${idx}`}
                  src={src}
                  alt={`Product ${idx}`}
                  className="w-44 h-44 object-cover mx-4 rounded-xl shadow-md border border-[#FF5C26]/20"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Row 2: Right → Left */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="flex"
              animate={{ x: ["-100%", "0%"] }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
            >
              {productImages.concat(productImages).map((src, idx) => (
                <img
                  key={`row2-${idx}`}
                  src={src}
                  alt={`Product ${idx}`}
                  className="w-44 h-44 object-cover mx-4 rounded-xl shadow-md border border-[#64B5F6]/20"
                />
              ))}
            </motion.div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};
