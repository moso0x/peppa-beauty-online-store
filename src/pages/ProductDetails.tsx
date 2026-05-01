import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, ShoppingCart } from "lucide-react";

import brushBuddiesImg from "@/assets/thumbnails/brushBuddiesImg3.jpg";
import brushBuddiesImg2 from "@/assets/thumbnails/brushbuddiesimg2.jpg";
import brushBuddiesImg3 from "@/assets/thumbnails/brushBuddiesImg3.jpg";

import  curelHandCreamImg from "@/assets/thumbnails/curelHandCreamImg.jpeg";
import  curelHandCreamImg2 from "@/assets/thumbnails/curelHandCreamImg2.jpeg";
import  curelHandCreamImg3 from "@/assets/thumbnails/curelHandCreamImg3.jpeg"

import  dermasilFaceCreamImg from "@/assets/thumbnails/dermasilFaceCreamImg.webp";
import  dermasilFaceCreamImg2 from "@/assets/thumbnails/dermasilFaceCreamImg2.webp";
import  dermasilFaceCreamImg3 from "@/assets/thumbnails/dermasilFaceCreamImg3.webp"

import  oldSpiceDeoImg from "@/assets/thumbnails/oldSpiceDeoImg.jpg";
import oldSpiceDeoImg2 from "@/assets/thumbnails/oldSpiceDeoImg2.webp";
import  oldSpiceDeoImg3 from "@/assets/thumbnails/oldSpiceDeoImg3.webp"

import proSilkLotionImg from "@/assets/thumbnails/proSilkLotionImg.jpg";
import proSilkLotionImg2 from "@/assets/thumbnails/proSilkLotionImg2.jpg";
import  proSilkLotionImg3 from "@/assets/thumbnails/proSilkLotionImg3.jpg"

import spaFootCreamImg from "@/assets/thumbnails/spaFootCreamImg.jpg";
import spaFootCreamImg2 from "@/assets/thumbnails/spaFootCreamImg2.jpg";
import  spaFootCreamImg3 from "@/assets/thumbnails/spaFootCreamImg4.jpg"

import speedStickLadiesImg from "@/assets/thumbnails/speedStickLadiesImg.jpg";
import speedStickLadiesImg2 from "@/assets/thumbnails/speedStickLadiesImg2.jpg";
import  speedStickLadiesImg3 from "@/assets/thumbnails/speedStickLadiesImg3.jpg"

import spaFootScrubImg from "@/assets/thumbnails/spaFootScrubImg6.jpg";
import spaFootScrubImg2 from "@/assets/thumbnails/spaFootScrubImg6.jpg";
import  spaFootScrubImg3 from "@/assets/thumbnails/spaFootCreamImg5.jpg"

import speedStickMenImg from "@/assets/thumbnails/speedStickMenImg.jpg";
import speedStickMenImg2 from "@/assets/thumbnails/speedStickMenImg2.jpg";
import  speedStickMenImg3 from "@/assets/thumbnails/speedStickMenImg3.jpg"

import spaLuxuryLotionImg from "@/assets/thumbnails/spaLuxuryLotionImg.jpg";
import spaLuxuryLotionImg2 from "@/assets/thumbnails/spaLuxuryLotionImg2.jpg";
import  spaLuxuryLotionImg3 from "@/assets/thumbnails/spaLuxuryLotionImg3.jpg"

import yardleyCharcoalImg from "@/assets/thumbnails/yardleyCharcoalImg.jpg";
import yardleyCharcoalImg2 from "@/assets/thumbnails/yardleyCharcoalImg2.jpg";
import yardleyCharcoalImg3 from "@/assets/thumbnails/yardleyCharcoalImg2.jpg";


import { Header } from "@/components/Header";
import FooterNew from "@/components/FooterNew";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

// PRODUCT DATA
const productData: any = {
  "brush-buddies-charcoal-activated-toothpaste": {
    title: "Brush Buddies Charcoal Activated Toothpaste",
    price: "From Ksh. 1,200",
    image: brushBuddiesImg,
    thumbs: [brushBuddiesImg, brushBuddiesImg2, brushBuddiesImg3],
    description:
      "Charcoal activated toothpaste that helps remove stains, fight bacteria, and promote fresh breath.",
    features: [
      "Whitening formula",
      "Fights bad breath",
      "Deep cleaning action",
      "Daily oral care",
    ],
  },

  "curel-hand-cream-handbag-size": {
    title: "Curel Hand Cream (Handbag Size)",
    price: "From Ksh. 1,450",
    image: curelHandCreamImg,  
    thumbs: [curelHandCreamImg, curelHandCreamImg2, curelHandCreamImg3],
    description:
      "Compact moisturizing hand cream designed to keep hands soft, smooth, and hydrated on the go.",
    features: [
      "Deep hydration",
      "Non-greasy formula",
      "Travel-friendly size",
      "Quick absorption",
    ],
  },

  "dermasil-face-cream": {
    title: "Dermasil Intensive Face Cream",
    price: "From Ksh. 2,950",
    image: dermasilFaceCreamImg,
    thumbs: [dermasilFaceCreamImg, dermasilFaceCreamImg2, dermasilFaceCreamImg3],
    description:
      "Nourishing face cream that restores moisture balance and improves skin texture.",
    features: [
      "Hydration boost",
      "Skin barrier repair",
      "Smooth texture",
      "Daily use safe",
    ],
  },

  "old-spice-pure-sport-deodorant-travel-size": {
    title: "Old Spice Pure Sport Deodorant (Travel Size)",
    price: "From Ksh. 900",
    image: oldSpiceDeoImg,
    thumbs: [oldSpiceDeoImg, oldSpiceDeoImg2, oldSpiceDeoImg3],
    description:
      "Long-lasting deodorant offering fresh, sporty fragrance and all-day odor protection.",
    features: [
      "24h odor protection",
      "Fresh scent",
      "Travel size",
      "Quick dry formula",
    ],
  },

  "pro-silk-body-lotion-aloe-vera": {
    title: "Pro Silk Aloe Vera Body Lotion",
    price: "From Ksh. 1,650",
    image: proSilkLotionImg,
    thumbs: [proSilkLotionImg, proSilkLotionImg2, proSilkLotionImg3],
    description:
      "Soothing aloe vera body lotion that deeply hydrates and refreshes skin.",
    features: [
      "Aloe vera infusion",
      "Deep hydration",
      "Soft skin finish",
      "Non-sticky feel",
    ],
  },

  "spa-scentials-foot-cream": {
    title: "Spa Scentials Foot Cream",
    price: "From Ksh. 1,800",
    image: spaFootCreamImg,
    thumbs: [spaFootCreamImg, spaFootCreamImg2, spaFootCreamImg3],
    description:
      "Restorative foot cream that softens rough skin and repairs dryness.",
    features: [
      "Heel repair",
      "Intense moisture",
      "Softens cracked skin",
      "Cooling effect",
    ],
  },

  "spa-scentials-foot-scrub": {
    title: "Spa Scentials Foot Scrub",
    price: "From Ksh. 1,950",
    image: spaFootScrubImg,
    thumbs: [spaFootScrubImg, spaFootScrubImg2, spaFootScrubImg3],
    description:
      "Exfoliating foot scrub that removes dead skin and revitalizes tired feet.",
    features: [
      "Exfoliation",
      "Smooth finish",
      "Removes dead skin",
      "Refreshing feel",
    ],
  },

  "speed-stick-for-ladies": {
    title: "Speed Stick Deodorant for Ladies",
    price: "From Ksh. 850",
    image: speedStickLadiesImg,
    thumbs: [speedStickLadiesImg, speedStickLadiesImg2, speedStickLadiesImg3],
    description:
      "Gentle deodorant designed for women, offering long-lasting freshness and odor protection.",
    features: [
      "Long-lasting freshness",
      "Gentle formula",
      "Quick dry",
      "Everyday protection",
    ],
  },

  "spa-luxury-lotion": {
    title: "Spa Luxury Body Lotion",
    price: "From Ksh. 2,100",
    image: spaLuxuryLotionImg,
    thumbs: [spaLuxuryLotionImg, spaLuxuryLotionImg2, spaLuxuryLotionImg3],
    description:
      "Premium body lotion that deeply nourishes and enhances skin glow.",
    features: [
      "Deep nourishment",
      "Glowing skin",
      "Smooth texture",
      "Fast absorption",
    ],
  },

  "speed-stick-irish-spring-for-men": {
    title: "Speed Stick Irish Spring Deodorant for Men",
    price: "From Ksh. 950",
    image: speedStickMenImg,
    thumbs: [speedStickMenImg, speedStickMenImg2, speedStickMenImg3],
    description:
      "Strong, refreshing deodorant for men with long-lasting fragrance and protection.",
    features: [
      "24h protection",
      "Fresh masculine scent",
      "Non-sticky",
      "All-day confidence",
    ],
  },

  "yardly-of-london-charcoal-activated-for-acne": {
    title: "Yardley of London Charcoal Acne Cleanser",
    price: "From Ksh. 1,600",
    image: yardleyCharcoalImg,
    thumbs: [yardleyCharcoalImg, yardleyCharcoalImg2, yardleyCharcoalImg3],
    description:
      "Charcoal-based cleanser that targets acne, removes impurities, and unclogs pores.",
    features: [
      "Acne control",
      "Deep pore cleansing",
      "Oil balancing",
      "Detox formula",
    ],
  },
};

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = productData[slug || ""];
  const [mainImage, setMainImage] = useState(product?.image);
  const [preview, setPreview] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const basePrice = parseInt(product?.price.replace(/\D/g, "")) || 0;
  const totalPrice = basePrice * quantity;

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let scrollAmount = 0;
    const interval = setInterval(() => {
      scrollAmount += 1;
      track.scrollTo({ left: scrollAmount, behavior: "smooth" });
      if (scrollAmount >= track.scrollWidth) scrollAmount = 0;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const scrollTrack = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = dir === "left" ? -200 : 200;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const removeArt = () => {
    setPreview(null);
    const input = document.getElementById("artUpload") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  if (!product) return <div className="p-10 text-center text-red-600">Product not found.

  </div>;

  // ====== Product-specific attribute dropdowns ======
  const renderAttributes = () => {
    switch (slug) {
      case "tote-bags-printing":
        return (
          <>
            <AttributeSelect label="Bag Type" options={["Canvas", "Cotton", "Jute", "Nylon", "Eco-friendly Tote"]} />
            <AttributeSelect label="Bag Size" options={["Small", "Medium", "Large", "Custom"]} />
            <AttributeSelect label="Bag Color" options={["Black", "White", "Red", "Blue", "Green", "Custom"]} />
            <AttributeSelect label="Print Type" options={["Screen Print", "DTG", "Heat Transfer", "Embroidery"]} />
            <AttributeSelect label="Print Area / Sides" options={["Front Only", "Back Only", "Both Sides"]} />
          </>
        );
      case "custom-shirt-printing":
      case "hoodies-printing":
        return (
          <>
            <AttributeSelect label="Apparel Type" options={["T-shirt", "Polo", "Hoodie", "Sweatshirt", "Jersey"]} />
            <AttributeSelect label="Fabric & GSM" options={["Cotton 160–300 GSM", "Polyester", "Blend"]} />
            <AttributeSelect label="Size" options={["S", "M", "L", "XL", "XXL"]} />
            <AttributeSelect label="Print Type" options={["Screen Print", "DTG", "Embroidery", "Vinyl"]} />
            <AttributeSelect label="Print Area / Sides" options={["Front", "Back", "Sleeves"]} />
          </>
        );
      case "caps-printing":
        return (
          <>
            <AttributeSelect label="Cap Type" options={["Snapback", "Trucker", "Baseball", "Bucket"]} />
            <AttributeSelect label="Material" options={["Cotton", "Wool", "Polyester", "Mesh"]} />
            <AttributeSelect label="Cap Color" options={["Black", "White", "Red", "Blue", "Green"]} />
            <AttributeSelect label="Logo Method" options={["Embroidery", "Patch", "Vinyl Print"]} />
            <AttributeSelect label="Print / Embroidery Position" options={["Front", "Side", "Back"]} />
          </>
        );
      case "a5-flyers-printing":
        return (
          <>
            <AttributeSelect label="Paper Size" options={["A6", "A5", "A4", "DL", "Custom"]} />
            <AttributeSelect label="Paper Thickness" options={["130gsm", "170gsm", "250gsm"]} />
            <AttributeSelect label="Print Sides" options={["Single-sided", "Double-sided"]} />
            <AttributeSelect label="Finish" options={["Matte", "Gloss", "Silk"]} />
            <AttributeSelect label="Quantity" options={["100", "200", "500", "1000", "Custom"]} />
          </>
        );
      case "roll-up-banner-printing":
        return (
          <>
            <AttributeSelect label="Banner Type" options={["PVC", "Mesh", "Roll-Up", "Fabric"]} />
            <AttributeSelect label="Size" options={["2x3 ft", "3x5 ft", "4x6 ft", "Custom"]} />
            <AttributeSelect label="Finishing" options={["Eyelets", "Hemming", "Pole Pockets", "No Finish"]} />
            <AttributeSelect label="Print Quality" options={["Indoor", "Outdoor"]} />
            <AttributeSelect label="Quantity" options={["1", "5", "10", "Custom"]} />
          </>
        );
      case "mounted-photos-printing":
        return (
          <>
            <AttributeSelect label="Photo Size" options={["A4", "A3", "A2", "12x18", "Custom"]} />
            <AttributeSelect label="Mounting Material" options={["Foamboard", "MDF", "Canvas"]} />
            <AttributeSelect label="Frame Option" options={["Framed", "Frameless"]} />
            <AttributeSelect label="Finish" options={["Matte", "Gloss", "Satin"]} />
            <AttributeSelect label="Orientation" options={["Portrait", "Landscape"]} />
          </>
        );
      case "custom-mugs-printing":
        return (
          <>
            <AttributeSelect label="Mug Type" options={["Ceramic", "Magic Mug", "Colored Rim", "Travel Mug"]} />
            <AttributeSelect label="Mug Color" options={["White", "Black", "Red", "Blue", "Green"]} />
            <AttributeSelect label="Print Type" options={["Sublimation", "Heat Transfer"]} />
            <AttributeSelect label="Print Area" options={["One-side", "Two-side", "Full Wrap"]} />
            <AttributeSelect label="Upload Artwork" options={["Yes", "No"]} />
          </>
        );
  case "corporate-gifts":
  return (
    <>
      <AttributeSelect
        label="Gift Item Type"
        options={[
          "Mugs",
          "Wristbands",
          "Pens",
          "Notebooks/Diaries",
          "Water Bottles",
          "Keyholders",
          "Gift Sets",
          "Calendars",
          "USB Flash Drives",
        ]}
      />

      <AttributeSelect
        label="Material / Build"
        options={[
          "Plastic",
          "Ceramic",
          "Metal",
          "Rubber/Silicone (Wristbands)",
          "Leather (Notebooks/Diaries)",
          "Stainless Steel (Bottles)",
        ]}
      />

      <AttributeSelect
        label="Color Options"
        options={[
          "White",
          "Black",
          "Blue",
          "Red",
          "Green",
          "Yellow",
          "Mixed Colors",
        ]}
      />

      <AttributeSelect
        label="Branding Type"
        options={[
          "Full Color Print",
          "Engraving (Metal Items)",
          "Embossing (Leather Items)",
          "Sublimation (Mugs)",
          "Screen Print",
          "UV Print",
        ]}
      />

      <AttributeSelect
        label="Personalization"
        options={[
          "Logo Only",
          "Name + Logo",
          "Text Message",
          "Event Theme Branding",
        ]}
      />

      <AttributeSelect
        label="Upload Artwork"
        options={["Yes", "No"]}
      />
    </>
  );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6 pb-24">
        <p className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">Home</a> / {product.title}
        </p>

   <div className="flex items-center justify-between mb-10">
  {[
    { text: "Choose Your Print", color: "#64B5F6" },
    { text: "Make Order / Checkout", color: "#FFEB3B" },
    { text: "Track Your Order", color: "#00FF66" },
  ].map((step, i) => (
    <div key={i} className="flex items-center w-full">
      {/* Colored Number */}
      <span
        className="font-bold text-sm mr-2"
        style={{ color: step.color }}
      >
        {i + 1}.
      </span>

      {/* Step Text */}
      <div className="text-center font-semibold text-sm text-gray-800">
        {step.text}
      </div>

      {/* Connector Line */}
      {i < 2 && <div className="flex-1 border-t border-gray-300 mx-2"></div>}
    </div>
  ))}
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT IMAGE SECTION */}
          <div>
            <motion.img
              key={mainImage}
              src={mainImage}
              className="w-full h-[420px] object-cover rounded-xl shadow-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative flex items-center">
              <button
                onClick={() => scrollTrack("left")}
                className="absolute -left-10 bg-white border shadow-md p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>

              <div ref={trackRef} className="flex gap-3 overflow-x-scroll py-2 scrollbar-hide">
                {product.thumbs.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setMainImage(img)}
                    className="w-24 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                  />
                ))}
              </div>

              <button
                onClick={() => scrollTrack("right")}
                className="absolute -right-10 bg-white border shadow-md p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT PRODUCT DETAILS */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-md text-pink-600 font-semibold mb-4">{product.price}</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Product-specific attributes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {renderAttributes()}
            </div>

            {/* Quantity & total */}
            <div className="p-4 border rounded-xl bg-gray-50 shadow-sm mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-32 border rounded-lg p-2 text-sm"
              />
              <p className="mt-2 text-sm">Price per item: Ksh. {basePrice.toLocaleString()}</p>
              <p className="mt-1 text-sm font-semibold">Total: Ksh. {totalPrice.toLocaleString()}</p>
            </div>

            <Button
              size="sm"
              onClick={() => addToCart(product)}
              className="w-[40%] flex items-center justify-center gap-2 bg-black text-white font-medium shadow-[0_4px_12px_rgba(0,212,90,0.4)] hover:shadow-[0_6px_20px_rgba(0,212,90,0.5)] transition-all duration-300 rounded-full py-2 mb-4"
            >
              <ShoppingCart className="w-4 h-4 text-[#FFEB3B]" />
              Add to Cart
            </Button>
                        {/* WHATSAPP ORDER BUTTON WITH QUANTITY + TOTAL */}
           {/* Buttons on one line */}
<div className="flex flex-wrap justify-center gap-4 mb-6">
  <a
    href={`https://wa.me/+254112673764?text=${encodeURIComponent(
      `Hello, I want to order ${product.title}.
Quantity: ${quantity}
Price per item: Ksh. ${basePrice}
Total: Ksh. ${totalPrice}
Artwork: ${preview ? "Uploaded ✔️" : "No artwork uploaded"}`
    )}`}
    target="_blank"
    className="flex-1 min-w-[100px] justify-center flex bg-green-600 text-white py-2 rounded-full hover:bg-pink-300 text-center"
  >
    Order via WhatsApp
  </a>

</div>

<input
  type="file"
  id="artUpload"
  className="hidden"
  accept="image/*"
  onChange={handleFileUpload}
/>

{preview && (
  <div className="mt-4">
    <motion.img
      src={preview}
      alt="Preview"
      className="w-full h-56 object-cover rounded-lg shadow-md border"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    <button
      onClick={removeArt}
      className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
    >
      Remove Art
    </button>
  </div>
)}



            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {product.features.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="https://wa.me/254704815725"
          target="_blank"
          className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600"
        >
          <MessageCircle size={28} color="white" />
        </a>
      </div>
      <FooterNew />
    </>
  );
}

// ====== AttributeSelect component ======
const AttributeSelect = ({ label, options }: { label: string; options: string[] }) => (
  <div>
    <label className="block text-gray-600 text-sm font-medium mb-1">{label}</label>
    <select className="w-full border rounded-lg p-1.5 text-sm">
      {options.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  </div>
  );