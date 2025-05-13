import {
  Drawer,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { FiX, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useMemo } from "react";

export default function CartDrawer() {
  const {
    isOpen,
    toggleCart,
    cart,
    addItem,
    decrementItem,
    removeItem,
  } = useCartStore();

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

    useEffect(() => {
        document.body.style.overflowY = isOpen ? "hidden" : "auto";
        document.body.style.paddingRight = isOpen ? "17px" : "0";
        return () => {
        document.body.style.overflowY = "auto";
        document.body.style.paddingRight = "0";
        };
    }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      onClose={toggleCart}
      placement="right"
      className={`flex max-w-md flex-col justify-between bg-gray-50 p-4 ${isOpen ? 'md:min-w-96 min-w-full' : ''}`}
      overlayProps={{ className: "bg-black/40 backdrop-blur-sm fixed" }}
    >
      {/* header */}
      <header className="mb-6 flex items-center justify-between border-b pb-3">
        <Typography variant="h5" className="font-bold text-gray-700">
          CART
        </Typography>
        <IconButton variant="text" onClick={toggleCart}>
          <FiX size={20} />
        </IconButton>
      </header>

      {/* body */}
      {cart.length === 0 ? (
        <Typography
          role="status"
          variant="lead"
          color="gray"
          className="mx-auto my-8 text-center"
        >
          No products in the cart
        </Typography>
      ) : (
            <div className=" flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                {cart.map((item) => (
                <div
                    key={item.id}
                    className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition hover:shadow-md"
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain rounded-lg border border-gray-200"
                    />

                    <div className="flex flex-col flex-1">
                        <Typography variant="small" className="font-medium text-gray-900">
                        {item.title}
                        </Typography>
                        <Typography variant="small" className="text-gray-500">
                        ${item.price.toFixed(2)} c/u
                        </Typography>

                        <div className="flex items-center mt-2 gap-2">
                            <div className="flex items-center border rounded-md px-2">
                                <button
                                    className="text-gray-700 text-xl px-2"
                                    onClick={() => decrementItem(item.id)}
                                >
                                    <FiMinus />
                                </button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <button
                                    className="text-gray-700 text-xl px-2"
                                    onClick={() => addItem(item)}
                                >
                                    <FiPlus />
                                </button>
                                </div>

                                <Typography className="ml-auto font-bold text-blue-600">
                                ${(item.price * item.quantity).toFixed(2)}
                                </Typography>

                                <IconButton
                                size="sm"
                                color="red"
                                variant="text"
                                onClick={() => removeItem(item.id)}
                                >
                                <FiTrash2 size={18} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
      )}

      {/* footer */}
      {cart.length > 0 && (
        <footer className="mt-4 border-t pt-4">
          <div className="mb-4 flex justify-between">
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">{formatCurrency(total)}</Typography>
          </div>
          <Button
            fullWidth
            className="bg-blue-500 hover:bg-blue-600"
          >
            Checkout
          </Button>
        </footer>
      )}
    </Drawer>
  );
}
