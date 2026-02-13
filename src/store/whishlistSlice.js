import { createSlice } from "@reduxjs/toolkit";

const WISHLIST_STORAGE_KEY = 'wishlist';

// Load wishlist from localStorage
const loadWishlistFromStorage = () => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

// Save wishlist to localStorage
const saveWishlistToStorage = (items) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
        // Storage full or unavailable
    }
};

const initialState = {
    items: [],
};

const whishlistSlice = createSlice({
    name: 'whishlist',
    initialState,
    reducers: {
        hydrateWishlist: (state) => {
            state.items = loadWishlistFromStorage();
        },
        addToWhishlist: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (!existingItem) {
                state.items.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                });
                saveWishlistToStorage(state.items);
            }
        },
        removeFromWhishlist: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
            saveWishlistToStorage(state.items);
        },
        clearWhishlist: (state) => {
            state.items = [];
            saveWishlistToStorage(state.items);
        },
    },
});

export const { hydrateWishlist, addToWhishlist, removeFromWhishlist, clearWhishlist } = whishlistSlice.actions;

export default whishlistSlice.reducer;