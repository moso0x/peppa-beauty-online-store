import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Search, LayoutGrid, List, ShoppingCart, Loader2, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

import totebags from "@/assets/tote-bags-hero.jpg";

const categories = [
  "All Products",
  "Brush Buddies Charcoal Activated Toothpaste",
  "Curel Hand Cream Handbag Size",
  "Dersil Facmae Cream",
  "Old Spice Pure Sport Deoderant Travel Size",
  "Pro Silk Body Lotion Aleo Vera",
  "Spa Luxury Brazillian Body Butter",
  "Spa Luxury Lotion",
  "Spa Scentials Foot Cream",
  "Spa Scentials Foot Scrub",
  "Speed Stick For Ladies",
  "Speed Stick Irish Spring For Men",
  "Yardly Of London Charcoal Activated For Acne",
];

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  images: string[] | null;
  stock: number | null;
  is_active: boolean | null;
}

const Shop = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(product => {
      const matchesCategory =
        selectedCategory === "All Products" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  const getProductImage = (product: Product) =>
    product.images?.[0] || totebags;

  const formatPrice = (price: number) =>
    `From Ksh. ${price.toLocaleString()}`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* HERO */}
        <section className="h-20 flex items-center justify-center bg-background border-b border-border">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">Shop</h1>
            <p className="text-lg italic text-secondary">Home / Shop</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* SIDEBAR */}
            <aside className="lg:col-span-1">
              <Card className="p-5 rounded-2xl shadow-sm bg-card border border-border">

                <button
                  onClick={() => setIsCategoryOpen(prev => !prev)}
                  className="flex justify-between items-center w-full mb-4"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    Product Categories
                  </h3>

                  <motion.div
                    animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                  >
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {categories.map(category => (
                        <li key={category}>
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className={`
                              w-full text-xs text-left px-3 py-2 rounded-lg transition
                              ${
                                selectedCategory === category
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted text-muted-foreground"
                              }
                            `}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

              </Card>
            </aside>

            {/* MAIN */}
            <main className="lg:col-span-3">

              {/* SEARCH */}
              <div className="mb-6 space-y-4">

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e)=>setSearchQuery(e.target.value)}
                      className="pl-10 bg-background border-border"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={()=>setViewMode("grid")}>
                      <LayoutGrid className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline" onClick={()=>setViewMode("list")}>
                      <List className="h-4 w-4"/>
                    </Button>
                  </div>

                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-64 border-border bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Low → High</SelectItem>
                    <SelectItem value="price-high">High → Low</SelectItem>
                  </SelectContent>
                </Select>

              </div>

              {/* LOADING */}
              {loading && (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-primary"/>
                </div>
              )}

              {/* PRODUCTS */}
              {!loading && (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

                  {filteredProducts.slice(0,visibleCount).map((product)=>(
                    <Card
                      key={product.id}
                      className="p-3 bg-card border border-border hover:shadow-md transition"
                    >

                      <img
                        src={getProductImage(product)}
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      <h3 className="text-sm mt-2 font-semibold text-foreground">
                        {product.title}
                      </h3>

                      <p className="text-sm text-pink-800 font-medium">
                        {formatPrice(product.price)}
                      </p>

                      <Button
                        onClick={()=>addToCart({
                          title:product.title,
                          price:formatPrice(product.price),
                          image:getProductImage(product)
                        })}
                        className="mt-2 w-full bg-primary text-primary-foreground hover:opacity-90"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1"/>
                        Add
                      </Button>

                    </Card>
                  ))}

                </div>
              )}

            </main>
          </div>
        </div>

        <FooterNew/>
      </div>
    </PageTransition>
  );
};

export default Shop;