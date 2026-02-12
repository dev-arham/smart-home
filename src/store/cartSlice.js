import {createSlice} from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'cart';

// Load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable
  }
};

const initialState = {
  items: [],
};

const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers:{
        hydrateCart: (state) => {
            state.items = loadCartFromStorage();
        },
        
        addTocart: (state, action) =>{
            const item = action.payload; 

            const existingItem = state.items.find(i => i.id === item.id);

            if(existingItem){
                existingItem.quantity += 1; 
            } else {
                
                state.items.push({
                 id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                quantity: 1,
                });
  
            }
            saveCartToStorage(state.items);
        },

        removeFromCart: (state, action) =>{
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
            saveCartToStorage(state.items);
        },

        clearCart: (state) =>{
            state.items = [];
            saveCartToStorage(state.items);
        }, 

        reduceQuantity: (state, action) =>{
            const itemId = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);

            if(existingItem){
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.id !== itemId);
                }
            }
            saveCartToStorage(state.items);
        }, 

        increaseQuantity: (state, action) =>{
            const itemId = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);

            if(existingItem){
                existingItem.quantity += 1;
            }
            saveCartToStorage(state.items);
        }
    }


});

export const {hydrateCart, addTocart, removeFromCart, clearCart, reduceQuantity, increaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;