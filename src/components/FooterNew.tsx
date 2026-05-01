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
import payment_gateways from "@/assets/payment_methods.jpg.jpg";

export const FooterNew = () => {
  return (
    <footer className="relative bg-background text-foreground overflow-hidden">

      {/* Soft Brand Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-10 w-72 h-72 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-secondary/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* BRAND */}
          <div className="space-y-5">
            <Link to="/">
              <img src={logo} alt="Peppa Beauty" className="w-36 h-auto" />
            </Link>

            <h3 className="text-xl font-semibold">
              Peppa Beauty Products
            </h3>

            <p className="text-sm leading-7 text-muted-foreground">
              Premium skincare and beauty essentials curated to nourish,
              restore and enhance natural beauty.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                Nationwide Delivery
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Authentic Quality
              </div>

              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                Beauty & Wellness
              </div>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-lg font-semibold mb-5 border-b border-border pb-2">
              Shop Categories
            </h4>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Skin Care",
                "Face Serums",
                "Moisturizers",
                "Body Care",
                "Accessories",
                "Gift Sets",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="hover:text-primary transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-lg font-semibold mb-5 border-b border-border pb-2">
              Customer Care
            </h4>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Shipping Info</li>
              <li className="hover:text-primary cursor-pointer">Returns</li>
              <li className="hover:text-primary cursor-pointer">Track Order</li>
              <li className="hover:text-primary cursor-pointer">FAQs</li>
              <li className="hover:text-primary cursor-pointer">Wholesale</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-semibold mb-5 border-b border-border pb-2">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                Nairobi, Kenya
              </p>

              <p className="flex gap-2 items-start">
                <Phone className="w-4 h-4 mt-1 text-primary" />
                +254 112673764
              </p>

              <p className="flex gap-2 items-start">
                <Mail className="w-4 h-4 mt-1 text-primary" />
                hello@peppabeauty.com
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-full bg-card border border-border shadow-sm hover:bg-primary hover:text-primary-foreground transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* PAYMENTS */}
          <div className="mx-auto flex flex-col gap-3 justify-center items-center">
            <p className="font-semibold">Accepted Payments</p>
            <img src={payment_gateways} alt="Payment Gateways" className="w-full h-auto" />
          </div>

        </div>

        {/* NEWSLETTER */}
        <div className="bg-card text-card-foreground rounded-3xl shadow-sm border border-border p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="max-w-xl">
            <h3 className="text-2xl font-semibold">
              Join Our Beauty Community
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              Get skincare tips, new arrivals and exclusive offers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-border bg-background text-foreground rounded-full px-5 py-3 w-full sm:w-72 outline-none focus:ring-2 focus:ring-ring"
            />

            <button className="bg-primary hover:opacity-90 text-primary-foreground rounded-full px-6 py-3 font-medium transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-5 text-sm">

          <p className="text-center md:text-left text-muted-foreground">
            © {new Date().getFullYear()}
            <span className="font-semibold text-foreground ml-1">
              Peppa Beauty Products
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            {["Privacy Policy", "Terms", "Returns", "Shipping"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-primary transition"
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