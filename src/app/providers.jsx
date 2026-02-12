"use client";

import { useEffect } from "react";
import { store } from "@/store/store";
import { Provider, useDispatch } from "react-redux";
import { hydrateCart } from "@/store/cartSlice";

function CartHydration({ children }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(hydrateCart());
  }, [dispatch]);
  
  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartHydration>{children}</CartHydration>
    </Provider>
  );
}