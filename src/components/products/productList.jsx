import { useMemo, useState } from "react";
import {
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import ProductCard from "./productCard";
import { useProducts } from "@/hooks/useProducts";
import ProductCardSkeleton from "./productCardSkeleton";

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  /* categorías únicas */
  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let res = products;
    if (category) res = res.filter((p) => p.category === category);
    if (search) {
      const s = search.toLowerCase();
      res = res.filter((p) => p.title.toLowerCase().includes(s));
    }
    return res;
  }, [products, category, search]);

  if (error) return <p>Error al cargar productos</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
        <Typography variant="h4" className="mb-6 text-gray-800">
          Products
        </Typography>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input
            label="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="!w-full sm:w-1/2"
            variant="standard"
          />

          <Select
            label="Category"
            onChange={(val) => setCategory(val)}
            className="!w-full sm:w-1/3"
          >
            {categories.map((cat) => (
              <Option
                key={cat}
                className="capitalize"
                value={cat === "all" ? "" : cat}
              >
                {cat}
              </Option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            Array(10).fill(1).map((_,index)=> <ProductCardSkeleton key={index}/>) 
          ) : (
            filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </div>
    </div>
  );
}
