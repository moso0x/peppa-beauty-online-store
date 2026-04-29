import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Truck,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

export const FooterNew = () => {
  return (
   <footer className="relative bg-gradient-to-b from-[#FFF7FA] via-white to-[#FFF0F5] text-[#3E2A33] overflow-hidden">

  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-20 left-10 w-72 h-72 bg-pink-200/30 blur-3xl rounded-full" />
    <div className="absolute bottom-0 right-10 w-80 h-80 bg-rose-100/30 blur-3xl rounded-full" />
  </div>

  <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">

    {/* TOP GRID */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

      {/* BRAND */}
      <div className="space-y-5">
        <Link to="/">
          <img
            src={logo}
            alt="Peppa Beauty"
            className="w-36 h-auto"
          />
        </Link>

        <h3 className="text-xl font-semibold">
          Peppa Beauty Products
        </h3>

        <p className="text-sm leading-7 text-[#6B5560]">
          Premium skincare and beauty essentials curated to nourish,
          restore and enhance natural beauty.
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-pink-500"/>
            Nationwide Delivery
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-pink-500"/>
            Authentic Quality
          </div>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500"/>
            Beauty & Wellness
          </div>
        </div>
      </div>


      {/* SHOP */}
      <div>
        <h4 className="text-lg font-semibold mb-5 border-b border-pink-200 pb-2">
          Shop Categories
        </h4>

        <ul className="space-y-3 text-sm text-[#6B5560]">
          {[
            "Skin Care",
            "Face Serums",
            "Moisturizers",
            "Body Care",
            "Accessories",
            "Gift Sets",
          ].map((item)=>(
            <li key={item}>
              <Link
                to="/shop"
                className="hover:text-pink-600 transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>


      {/* HELP */}
      <div>
        <h4 className="text-lg font-semibold mb-5 border-b border-pink-200 pb-2">
          Customer Care
        </h4>

        <ul className="space-y-3 text-sm text-[#6B5560]">
          <li>Shipping Info</li>
          <li>Returns</li>
          <li>Track Order</li>
          <li>FAQs</li>
          <li>Wholesale</li>
        </ul>
      </div>


      {/* CONTACT */}
      <div>
        <h4 className="text-lg font-semibold mb-5 border-b border-pink-200 pb-2">
          Contact Us
        </h4>

        <div className="space-y-4 text-sm text-[#6B5560]">
          <p className="flex gap-2 items-start">
            <MapPin className="w-4 h-4 mt-1 text-pink-500"/>
            Nairobi, Kenya
          </p>

          <p className="flex gap-2 items-start">
            <Phone className="w-4 h-4 mt-1 text-pink-500"/>
            +254 112673764
          </p>

          <p className="flex gap-2 items-start">
            <Mail className="w-4 h-4 mt-1 text-pink-500"/>
            hello@peppabeauty.com
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          {[Facebook, Instagram, Twitter, Linkedin].map((Icon,i)=>(
            <a
              key={i}
              href="#"
              className="p-3 rounded-full bg-white shadow-sm hover:bg-pink-500 hover:text-white transition"
            >
              <Icon size={16}/>
            </a>
          ))}
        </div>
      </div>

    </div>


    {/* NEWSLETTER */}
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">

      <div className="max-w-xl">
        <h3 className="text-2xl font-semibold">
          Join Our Beauty Community
        </h3>

        <p className="text-sm text-[#6B5560] mt-2">
          Get skincare tips, new arrivals and exclusive offers.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded-full px-5 py-3 w-full sm:w-72 outline-none"
        />

        <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-3 font-medium">
          Subscribe
        </button>
      </div>

    </div>


    {/* BOTTOM */}
    <div className="border-t border-pink-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-5 text-sm">

      <p className="text-center md:text-left text-[#6B5560]">
        © {new Date().getFullYear()}
        <span className="font-semibold text-[#3E2A33] ml-1">
          Peppa Beauty Products
        </span>
      </p>

      <div className="flex flex-wrap justify-center gap-5">
        {[
          "Privacy Policy",
          "Terms",
          "Returns",
          "Shipping"
        ].map((item)=>(
          <a
            key={item}
            href="#"
            className="hover:text-pink-600 transition"
          >
            {item}
          </a>
        ))}
      </div>

    </div>

  </div>
</footer>
  );
};

export default FooterNew;