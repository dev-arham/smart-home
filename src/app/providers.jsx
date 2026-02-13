"use client";

import { useEffect } from "react";
import { store } from "@/store/store";
import { Provider, useDispatch } from "react-redux";
import { hydrateCart } from "@/store/cartSlice";
import { hydrateWishlist } from "@/store/whishlistSlice";

function StoreHydration({ children }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(hydrateCart());
    dispatch(hydrateWishlist());
  }, [dispatch]);
  
  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <StoreHydration>{children}</StoreHydration>
    </Provider>
  );
}