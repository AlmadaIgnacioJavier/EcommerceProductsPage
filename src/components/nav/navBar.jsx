import { FiShoppingCart } from "react-icons/fi";
import { Badge, IconButton, Typography, Navbar as MTNavbar } from "@material-tailwind/react";
import { useCartStore } from "../../store/cartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY <= 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <MTNavbar 
        className={`!min-w-[100vw] text-white px-4 py-2 shadow-md rounded-none fixed top-0 left-0 z-50 transition-all duration-300 ${
            isTop ? "bg-gray-600" : "bg-gray-600/50"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography variant="h6" className="text-white">
          E-commerce
        </Typography>
        <div className="flex items-center gap-4 p-1">
          <Badge content={totalItems} color="red" invisible={totalItems === 0}>
            <IconButton className="cursor-pointer" onClick={toggleCart} variant="text" color="white">
              <FiShoppingCart size={22} />
            </IconButton>
          </Badge>
        </div>
      </div>
    </MTNavbar>
  );
}
