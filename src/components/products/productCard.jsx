import {
  Card,
  CardBody,
  Chip,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { useCartStore } from "@/store/cartStore";
import { useState, useCallback, memo } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

function ProductCard({ product }) {
  const { cart, addItem, decrementItem, removeItem } = useCartStore();
  const [openImage, setOpenImage] = useState(false);

  const cartItem = cart.find((i) => i.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = useCallback(() => addItem(product), [addItem, product]);
  const handleDec = useCallback(
    () => (quantity === 1 ? removeItem(product.id) : decrementItem(product.id)),
    [quantity, product.id, decrementItem, removeItem]
  );

  return (
    <>
      <Card className="group max-w-xs m-2 rounded-2xl shadow-sm border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 bg-white relative fade-in">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-52 cursor-pointer object-contain p-4"
          onClick={() => setOpenImage(true)}
        />

        <CardBody className="pb-4">
          <Typography
            variant="small"
            className="mb-1 line-clamp-2 h-10 font-medium text-gray-800 group-hover:underline"
          >
            {product.title}
          </Typography>

          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h6" className="font-semibold text-gray-900">
              {formatCurrency(product.price)}
            </Typography>

            {product.id % 4 === 0 && (
              <Chip
                value="SALE"
                size="sm"
                className="absolute right-3 top-3 bg-red-100 px-2 py-0.5 font-semibold text-red-600"
              />
            )}
            {product.id % 6 === 0 && (
              <Chip
                value="NEW"
                size="sm"
                className="absolute right-3 top-3 bg-green-100 px-2 py-0.5 font-semibold text-green-600"
              />
            )}
          </div>

          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              className="w-full rounded-lg bg-blue-500 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 uppercase text-xs cursor-pointer"
            >
              Add to cart
            </Button>
          ) : (
            <div className="mt-2 flex items-center justify-between rounded-lg bg-gray-100 px-2 py-1">
              <button
                aria-label="Decrease quantity"
                onClick={handleDec}
                className="px-3 text-xl text-gray-700 hover:text-red-500 cursor-pointer"
              >
                <FiMinus />
              </button>

              <span className="font-medium">{quantity}</span>

              <button
                aria-label="Increase quantity"
                onClick={handleAdd}
                className="px-3 text-xl text-gray-700 hover:text-green-600 cursor-pointer"
              >
                <FiPlus />
              </button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal: imagen a pantalla completa */}
      {openImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />
          <IconButton
            aria-label="Cerrar"
            onClick={() => setOpenImage(false)}
            className="!absolute right-5 top-5 rounded bg-gray-800 p-3 text-white hover:bg-gray-700"
          >
            <FiX className="h-6 w-6" />
          </IconButton>
        </div>
      )}
    </>
  );
}

export default memo(ProductCard);
