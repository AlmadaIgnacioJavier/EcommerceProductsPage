import { create } from "zustand";
import { persist } from "zustand/middleware";

/** @typedef {{ id:number,title:string,image:string,price:number,quantity:number,category:string }} CartItem */

export const useCartStore = create(
  persist(
    /**
     * @param {(partial:object,replace?:boolean)=>void} set
     * @param {()=>any} get
     */
    (set, get) => ({
      cart: /** @type{CartItem[]} */ ([]),
      isOpen: false,

      /* UI */
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      /* CRUD */
      addItem: (product) =>
        set((s) => {
          const idx = s.cart.findIndex((i) => i.id === product.id);
          if (idx > -1) {
            return {
              cart: s.cart.map((i, j) =>
                j === idx ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cart: [...s.cart, { ...product, quantity: 1 }] };
        }),

      decrementItem: (id) =>
        set((s) => {
          const item = s.cart.find((i) => i.id === id);
          if (!item) return {};
          return item.quantity === 1
            ? { cart: s.cart.filter((i) => i.id !== id) }
            : {
                cart: s.cart.map((i) =>
                  i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                ),
              };
        }),

      removeItem: (id) =>
        set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),

      clear: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
