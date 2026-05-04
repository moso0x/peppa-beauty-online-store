import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "@/integrations/supabase/client";
import { Smartphone, CreditCard } from "lucide-react";
import payment_methods from "@/assets/payment_methods.jpg.jpg";

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    notes: "",
  });

  const tillNumber = "8817976";

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to proceed with checkout");
        navigate("/auth");
      } else {
        if (session.user.email) {
          setFormData(prev => ({ ...prev, email: session.user.email || "" }));
        }
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Your cart is empty");
    if (!formData.name || !formData.email || !formData.phone)
      return toast.error("Please fill in all required fields");

    setLoading(true);
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error("Please login to proceed with checkout");
        navigate("/auth");
        return;
      }

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: session.user.id, // Link order to authenticated user
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          total_amount: getTotalPrice(),
          payment_method: paymentMethod,
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_title: item.title,
        product_price: item.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageTransition>
    );
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow flex items-center justify-center px-4">
            <Card className="shadow-lg p-6 text-center max-w-md bg-white rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#0D1B5E] text-lg font-semibold">
                  Your cart is empty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-[#00FF66] text-black hover:bg-[#FF5B2E]"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </main>
          <FooterNew />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Header />

        <main className="container mx-auto px-4 py-10 flex-grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#0D1B5E]">
            Checkout
          </h1>

          <div className="grid md:grid-cols-2 gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Customer Info */}
              <Card className="bg-white shadow-md rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#0D1B5E] text-lg">
                    Customer Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Input
                    type="tel"
                    placeholder="254712345678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white shadow-md rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#0D1B5E] text-lg">
                    Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div
                      className="p-4 rounded-lg bg-[#F9FAFB] hover:bg-[#00FF6610] transition cursor-pointer"
                      onClick={() => setPaymentMethod("mpesa")}
                    >
                     
                      {paymentMethod === "mpesa" && (
                        <div className="mt-3 text-sm space-y-3">
                          <p className="font-medium text-[#1E57F0]">
                           Accepted Payment Method: 
                          </p>
                          <div>
                            <img src={payment_methods} alt="M-Pesa" />
                          </div>

                    
                         
                          {/* Till Number */}
                        
                        </div>
                      )}
                    </div>

                    {/* Card Option (Disabled) */}
                    <div className="flex items-center space-x-2 p-4 rounded-lg opacity-50 mt-2 bg-[#F9FAFB]">
                      <RadioGroupItem value="card" id="card" disabled />
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-2 cursor-not-allowed"
                      >
                        <CreditCard className="h-5 w-5 text-[#1E57F0]" />
                        <span className="font-semibold text-[#0D1B5E]">
                          Card (coming soon)
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Order Summary */}
              

              {/* Shipping Info (below summary) */}
              <Card className="bg-white shadow-md rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#0D1B5E] text-lg">
                    Shipping Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                    <Input
                      placeholder="County"
                      value={formData.county}
                      onChange={(e) =>
                        setFormData({ ...formData, county: e.target.value })
                      }
                    />
                  </div>
                  <Input
                    placeholder="Delivery notes (optional)"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#0D1B5E] text-lg">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="flex justify-between text-[#0D1B5E]"
                    >
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>Ksh. {item.price}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between font-bold text-[#0D1B5E] text-lg">
                    <span>Total</span>
                    <span>Ksh. {getTotalPrice().toLocaleString()}</span>
                  </div>
                  <Button
                    className="w-32 flex mx-auto justify-center  bg-secondary font-bold text-black hover:bg-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default Checkout;
