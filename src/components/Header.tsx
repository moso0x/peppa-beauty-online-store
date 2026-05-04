import { useState, useEffect } from "react";
import {
  Search,
  Phone,
  ChevronDown,
  User,
  LogOut,
  Menu,
  X,
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

export const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      <div className="bg-background border-b border-border py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-foreground">

          {/* Contact */}
          <div className="flex items-center gap-6">
            <a href="tel:+254112673764" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="text-primary w-5 h-5" />
              <span className="font-medium text-lg">+254 112673764</span>
            </a>
          </div>

          {/* Advert */}
          <div className="w-[600px] mx-auto md:mx-0">
            <AdvertRibbon />
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary">
                <LogOut className="h-5 w-5 mr-1" /> Logout
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild className="text-foreground text-sm font-bold">
                <Link to="/auth">
                  <User className="h-8 w-8 mr-1 text-black" /> Account
                </Link>
              </Button>
            )}
           
          </div>
           <Cart  />
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white backdrop-blur-md shadow-md"
      >
        <div className="container mx-auto px-4 flex items-center justify-between py-3">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.img
              src={logo}
              alt="Peppa Beauty"
              className="h-[140px] sm:h-[180px] object-contain"
              whileHover={{ scale: 1.05 }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 flex-1 justify-center">

            {/* Categories */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button className="bg-primary text-primary-foreground flex items-center shadow-sm hover:shadow-md">
                Skin Care & Beauty
                <motion.div animate={{ rotate: isHovered ? 180 : 0 }}>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-64 rounded-lg shadow-lg bg-card border border-border text-card-foreground"
                  >
                    {[
                      "Face Cream",
                      "Body Lotion",
                      "Hand Cream",
                      "Deodorants",
                      "Foot Care",
                    ].map((item) => (
                      <Link
                        key={item}
                        to="/shop"
                        className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary"
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Links */}
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["Contact", "/contact"],
            ].map(([label, link]) => (
              <Link key={label} to={link}>
                <motion.div
                  whileHover={{
                    scale: 0.95,
                    backgroundColor: "hsl(var(--primary))",
                    borderRadius: "9999px",
                  }}
                  className="px-4 py-2 text-foreground"
                >
                  {label}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex max-w-sm w-full relative">
            <Search
              onClick={handleSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground cursor-pointer"
            />

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search beauty products..."
              className="pl-10 rounded-full border border-border bg-background text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-background border-t border-border flex flex-col items-center py-4"
            >
              {[
                ["Home", "/"],
                ["Shop", "/shop"],
                ["Contact", "/contact"],
              ].map(([label, link]) => (
                <Link
                  key={label}
                  to={link}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2 hover:bg-muted text-foreground"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};