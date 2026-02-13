import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import whishlistReducer from "./whishlistSlice";

export const  store = configureStore({
    reducer:{
        cart: cartReducer,
        whishlist: whishlistReducer,
    }
})