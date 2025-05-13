import { useEffect, useState } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("https://fakestoreapi.com/products", { signal: controller.signal })
      .then((r) => setProducts(r.data))
      .catch((err) => {
        if (!axios.isCancel(err)) setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { products, loading, error };
};
