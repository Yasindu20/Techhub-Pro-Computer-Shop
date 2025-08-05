import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    toggleWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        state.items.splice(existingItemIndex, 1);
      } else {
        state.items.push({
          ...newItem,
          addedAt: new Date().toISOString(),
        });
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    moveToCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
  },
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  toggleWishlist, 
  clearWishlist, 
  moveToCart 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;