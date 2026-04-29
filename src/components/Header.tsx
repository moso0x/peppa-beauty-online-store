import { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  User,
  LogOut,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Cart } from "@/components/Cart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "react-hot-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import logo from "@/assets/logo.jpeg";
import AdvertRibbon from "./AdvertRibbon";
import { ThemeToggle } from "@/components/ThemeToggle";
export const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Added
  const navigate = useNavigate();
  const COLORS = {
    brightBlue: "#0052CC",
    lightBlue: "#FF5B2E",
    limeGreen: "#00FF66",
    orange: "#71acdbff",
    deepNavy: "#0D1B5E",
  };

  // ✅ Search handler
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error("Error signing out");
    else {
      toast.success("Signed out successfully");
      navigate("/");
    }
  };

  return (
    <header className="w-full font-sans">
      {/* --- Top Bar --- */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-[#0D1B5E]">

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8">

            <a
              href="tel:+254704904678"
              className="flex items-center gap-1 hover:opacity-80"
            >
              <Phone className="text-black w-4 h- md:w-8 md:h-8" />
              <span className="font-medium text-xl ">+254 112673764</span>
            </a>

            

            {/* <div className="flex items-center gap-1">
              <Clock className="text-black w-4 h-4 md:w-8 md:h-8" />
              <span className="font-medium text-sm ">Mon - Sat: 8am - 6pm</span>
            </div> */}
          </div>

          {/* Advertisement */}
          <div className="w-[600px] mx-auto md:mx-0">
            <AdvertRibbon />
          </div>

          {/* User Controls */}
          <div className="flex items-center text-lg justify-center md:justify-end gap-3">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-2xl text-[#FF5B2E]"
              >
                <LogOut className="h-5 w-5 mr-1 text-[#FF5B2E]" /> Logout
              </Button>
            ) : (
              <Button variant="ghost" size="lg" asChild className="text-black text-2xl">
                <Link to="/auth">
                  <User className="h-5 w-5 mr-1  text-[#FF5B2E]" /> Login
                </Link>
              </Button>
            )}

          <Cart   />
            <Button variant="ghost" className="p-0">
              <Heart className="h-7 w-7 text-[#FF5B2E]" />
            </Button>
          </div>
        </div>
      </div>

      {/* --- Main Navigation --- */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-4 flex items-center justify-between py-3">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center justify-center">
            <motion.img
              src={logo}
              alt="Jelimo Creatives Logo"
              className="h-[160px] sm:h-[200px] object-contain"
              whileHover={{ scale: 1.05 }}
            />
          </Link>

          {/* Desktop Nav */}
          <motion.nav
            layout
            className="hidden md:flex items-center gap-3 flex-1 justify-center text-[1rem] font-medium"
          >
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button
                className="text-white flex items-center text-sm overflow-hidden relative"
                style={{ backgroundColor: COLORS.orange }}
              >
                <motion.span whileHover={{ scale: 0.95 }}>
                Skin Care & Beauty Products categories  
                </motion.span>
                <motion.div
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4 ml-2" />
                </motion.div>
              </Button>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 mt-2 w-60 text-xs rounded-lg shadow-xl z-[9999] bg-white"
                  >
                    {[
                      ["Brush Buddies Charcoal Activated Toothpaste"],
                      [  "Curel Hand Cream Handbag Size"],
                      [  "Dermasil Face Cream"],
                      [  "Old Spice Pure Sport Deoderant Travel Size"],
                      [  "Pro Silk Body Lotion Aleo Vera",],
                      [ "Spa Luxury Brazillian Body Butter",],
                      [ "Spa Luxury Lotion"],
                      [ "Spa Scentials Foot Cream"],
                      [ "Spa Scentials Foot Scrub"],
                      [ "Speed Stick For Ladies"],
                      [ "Speed Stick Irish Spring For Men"],
                      [ "Yardly Of London Charcoal Activated For Acne"],
                    ].map(([label, link]) => (
                      <Link
                        key={label}
                        to={link}
                        className="block px-4 py-2 text-xs  hover:bg-white hover:text-[#FF5B2E]"
                      >
                        {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static Nav Links */}
            {[
              ["Home", "/"],
           
              ["Shop", "/shop"],
              ["Contact ", "/contact"],
        
         
            ].map(([label, link]) => (
              <Link to={link} key={label} className="text-lg relative group">
                <motion.div
                  whileHover={{
                    scale: 0.8,
                    backgroundColor: COLORS.orange,
                    borderRadius: "9999px",
                    transition: { duration: 0.3 },
                  }}
                  className="px-3 py-2 rounded-lg relative"
                >
                  <motion.span
                    whileHover={{ scale: 0.9 }}
                    style={{
                      color:
                        label === "Feedback" ? COLORS.limeGreen : COLORS.deepNavy,
                    }}
                  >
                    {label}
                    {label === "Events & Tickets" && (
                      <motion.div
                        className="absolute -top-2 right-[-5%] w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: COLORS.orange }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.span>
                </motion.div>
              </Link>
            ))}
          </motion.nav>

          {/* -------- SEARCH -------- */}
          <motion.div layout className="hidden md:flex max-w-sm w-full relative">
            <Search
              onClick={handleSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
              style={{ color: COLORS.deepNavy }}
            />

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search Skin care and beauty products..."
              className="pl-10 italic text-[2rem] rounded-full border border-gray-200 focus:ring-0"
              style={{ borderColor: COLORS.lightBlue }}
            />
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-black"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* --- Mobile Menu --- */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg text-2xl flex flex-col items-center gap-2 pb-4"
            >
              {[
                ["Home", "/"],
                ["Shop", "/shop"],
                ["Contact Us", "/contact"],
             
              ].map(([label, link]) => (
                <Link
                  key={label}
                  to={link}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2 font-medium hover:bg-gray-100 transition relative"
                >
                  {label}
                  {label === "Events & Tickets" && (
                    <motion.div
                      className="absolute -top-1 right-[48%] w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.6, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};
