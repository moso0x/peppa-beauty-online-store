import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, LayoutGrid, List, ShoppingCart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

// Default placeholder image
import totebags from "@/assets/tote-bags-hero.jpg";

// Categories
const categories = [
  "All Products",
  "Brush Buddies Charcoal Activated Toothpaste",
  "Curel Hand Cream Handbag Size",
  "Dermasil Face Cream",
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

  // STATES
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(10);

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
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // FILTER & SORT
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    return totebags;
  };

  const formatPrice = (price: number) => {
    return `From Ksh. ${price.toLocaleString()}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />

        {/* HERO */}
        <section className="relative h-20 bg-white flex items-center justify-center">
          <div className="relative text-center text-black">
            <h1 className="text-4xl font-bold">Shop</h1>
            <p className="text-lg">Home / Shop</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* SIDEBAR */}
            <aside className="lg:col-span-1">
              <Card className="p-6">
                <h3 className="text-sm font-bold mb-4">Product Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-xl text-left px-3 py-2 rounded ${
                          selectedCategory === category
                            ? "text-black bg-pink-50"
                            : "hover:bg-accent"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>

            {/* MAIN CONTENT */}
            <main className="lg:col-span-3">

              {/* SEARCH + FILTER */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">

                  {/* SEARCH */}
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* VIEW MODE */}
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* SORT */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-muted-foreground">
                    Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} results
                  </p>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="Default sorting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default sorting</SelectItem>
                      <SelectItem value="name">Sort by name</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* LOADING STATE */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {/* PRODUCT GRID */}
              {!loading && (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.slice(0, visibleCount).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card className={`overflow-hidden hover:shadow-lg transition-shadow group ${viewMode == "list" ? "flex" : ""}`}>
                        {/* IMAGE */}
                        <div className={`${viewMode === "list" ? "w-32" : "aspect-square"} overflow-hidden bg-gray-100`}>
                          <motion.img
                            src={getProductImage(product)}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>

                        {/* DETAILS */}
                        <div className="p-3 flex-1">
                          <h3 className="font-semibold text-sm mb-1">{product.title}</h3>
                          <p className="text-black font-medium text-sm mb-2 text-red-400">{formatPrice(product.price)}</p>

                        <Button
                            className="w-full bg-black hover:bg-[#e04e1e] text-white text-xs py-1 rounded-full"
                            onClick={() => addToCart({
                              title: product.title,
                              price: formatPrice(product.price),
                              image: getProductImage(product)
                            })}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* LOAD MORE BUTTON */}
              {!loading && visibleCount < filteredProducts.length && (
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={() => setVisibleCount(prev => prev + 10)}
                    className="px-6 py-2 text-xs bg-black text-white rounded-full hover:bg-[#e04e1e]"
                  >
                    Load More products...
                  </Button>
                </div>
              )}

              {/* EMPTY STATE */}
              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No products found.</p>
                </div>
              )}
            </main>
          </div>
        </div>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default Shop;