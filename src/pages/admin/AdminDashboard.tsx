import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Menu,
  LogOut,
  Megaphone,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-hot-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCustomers from "./AdminCustomers";
import AdminAnalytics from "./AdminAnalytics";
import AdminSettings from "./AdminSettings";
import AdminAdvertisements from "./AdminAdvertisements";

type TabType = "overview" | "orders" | "products" | "customers" | "analytics" | "settings" | "advertisements";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    checkAdminAccess();
    fetchStats();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please login to access admin panel");
        navigate("/auth");
        return;
      }

      setUserEmail(session.user.email || "");
      setUserName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Admin");

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (error || !roles || roles.length === 0) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: orders } = await supabase.from("orders").select("*");
      const { data: profiles } = await supabase.from("profiles").select("*");
      const { data: products } = await supabase.from("products").select("*");

      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;

      setStats({
        totalOrders: orders?.length || 0,
        totalRevenue,
        totalCustomers: profiles?.length || 0,
        totalProducts: products?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    { id: "overview" as TabType, label: "Dashboard", icon: LayoutDashboard },
    { id: "orders" as TabType, label: "Orders", icon: ShoppingCart },
    { id: "products" as TabType, label: "Products", icon: Package },
    { id: "customers" as TabType, label: "Customers", icon: Users },
    { id: "advertisements" as TabType, label: "Advertisements", icon: Megaphone },
    { id: "analytics" as TabType, label: "Analytics", icon: BarChart3 },
  ];

  const statCards = [
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, color: "bg-blue-500" },
    { title: "Total Revenue", value: `KSh ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-500" },
    { title: "Customers", value: stats.totalCustomers, icon: Users, color: "bg-purple-500" },
    { title: "Products", value: stats.totalProducts, icon: Package, color: "bg-orange-500" },
  ];

  const currentPageLabel = menuItems.find(item => item.id === activeTab)?.label || "Settings";

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-muted/30 flex">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-lg shadow-lg border"
        >
          <Menu size={24} />
        </button>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ 
            width: sidebarCollapsed ? 80 : 256,
            x: mobileSidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -300 : 0)
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`fixed lg:static inset-y-0 left-0 z-40 bg-card border-r flex flex-col`}
        >
          {/* Header */}
          <div className={`p-4 border-b flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <h1 className="text-xl font-bold text-primary">Admin</h1>
                  <p className="text-xs text-muted-foreground">Store Management</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Collapse button - desktop only */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Tooltip key={item.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  >
                    <item.icon size={20} />
                    <AnimatePresence mode="wait">
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.15 }}
                          className="font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </TooltipTrigger>
                {sidebarCollapsed && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>

          {/* Settings button at bottom */}
          <div className="p-2 border-t">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <Settings size={20} />
                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        Settings
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </TooltipTrigger>
              {sidebarCollapsed && (
                <TooltipContent side="right">
                  Settings
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </motion.aside>

        {/* Overlay for mobile */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Top Header with Profile */}
          <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile spacer */}
              <div className="lg:hidden w-10" />
              
              {/* Back button - shown when not on overview */}
              {activeTab !== "overview" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("overview")}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Button>
              )}
              
              <h2 className="text-lg font-semibold hidden lg:block">
                {currentPageLabel}
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-auto py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">{userName}</span>
                      <span className="text-xs text-muted-foreground">{userEmail}</span>
                    </div>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-4 lg:p-8">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
                    <p className="text-muted-foreground">Welcome to your admin dashboard</p>
                  </div>
                  <Button onClick={() => setActiveTab("products")}>
                    <Plus className="mr-2" size={20} />
                    Add Product
                  </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {statCards.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{stat.title}</p>
                              <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.color}`}>
                              <stat.icon className="text-white" size={24} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp size={20} />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" onClick={() => setActiveTab("orders")}>
                        View Orders
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("products")}>
                        Manage Products
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("advertisements")}>
                        Manage Ads
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("analytics")}>
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "products" && <AdminProducts />}
            {activeTab === "customers" && <AdminCustomers />}
            {activeTab === "analytics" && <AdminAnalytics />}
            {activeTab === "settings" && <AdminSettings />}
            {activeTab === "advertisements" && <AdminAdvertisements />}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default AdminDashboard;
