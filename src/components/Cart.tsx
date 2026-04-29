import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-[#64B5F6]/10 transition">
          <ShoppingCart className="h-5 w-5 text-[#64B5F6]" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#6C63FF] text-white border-2 border-white shadow-md">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-white border-l-4 ">
        <SheetHeader>
          <SheetTitle className="text-[#64B5F6] font-bold text-lg">
            Shopping Cart ({getTotalItems()}  items)
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <div className="bg-[#00BFA6]/10 p-6 rounded-full mb-4 shadow-inner">
                <ShoppingCart className="h-20 w-20 text-[#FF5C26]" />
              </div>
              <p className="text-lg font-medium text-[#1F1F1F]">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-1">
                Add some items to get started
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.title} className="flex gap-4 border-b pb-4 border-gray-200 hover:bg-[#00BFA6]/5 rounded-lg transition">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md border border-[#6C63FF]/20"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1F1F1F] text-sm">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 border-[#00BFA6]/40 hover:bg-[#00BFA6]/10"
                        onClick={() => updateQuantity(item.title, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3 text-[#FF5C26]" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center text-[#1F1F1F]">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 border-[#00BFA6]/40 hover:bg-[#00BFA6]/10"
                        onClick={() => updateQuantity(item.title, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3 text-[#FF5C26]" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 ml-auto hover:text-[#D26749]"
                        onClick={() => removeFromCart(item.title)}
                      >
                        <Trash2 className="h-3 w-3 text-[#D26749]" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 space-y-2 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold text-[#1F1F1F]">
                  <span>Total:</span>
                  <span className="text-red-700">
                    Ksh. {getTotalPrice().toLocaleString()}
                  </span>
                </div>

                <Button
                  className="w-[40%] bg-[#64B5F6] rounded-full text-white font-semibold  text-xs flex mx-auto  items-center justify-center hover:bg-blue-300"
                  size="lg"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
