import { createSlice } from '@reduxjs/toolkit';
import { products } from '../data/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: products,
    filteredItems: products,
    loading: false,
    error: null,
    filters: {
      categories: [],
      brands: [],
      priceRange: null,
      rating: null,
      features: [],
      inStock: false,
      onSale: false,
    },
    sortBy: 'featured', // featured, price-low, price-high, rating, newest
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 12,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
      productsSlice.caseReducers.applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = {
        categories: [],
        brands: [],
        priceRange: null,
        rating: null,
        features: [],
        inStock: false,
        onSale: false,
      };
      state.currentPage = 1;
      productsSlice.caseReducers.applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      productsSlice.caseReducers.applyFilters(state);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    applyFilters: (state) => {
      let filtered = [...state.items];

      // Apply search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
        );
      }

      // Apply category filter
      if (state.filters.categories.length > 0) {
        filtered = filtered.filter(product =>
          state.filters.categories.includes(product.category)
        );
      }

      // Apply brand filter
      if (state.filters.brands.length > 0) {
        filtered = filtered.filter(product =>
          state.filters.brands.includes(product.brand)
        );
      }

      // Apply price range filter
      if (state.filters.priceRange) {
        const priceRanges = {
          '0-100': { min: 0, max: 100 },
          '100-500': { min: 100, max: 500 },
          '500-1000': { min: 500, max: 1000 },
          '1000-2000': { min: 1000, max: 2000 },
          '2000+': { min: 2000, max: Infinity },
        };
        
        const range = priceRanges[state.filters.priceRange];
        if (range) {
          filtered = filtered.filter(product => {
            const price = product.salePrice || product.price;
            return price >= range.min && price <= range.max;
          });
        }
      }

      // Apply rating filter
      if (state.filters.rating) {
        filtered = filtered.filter(product =>
          product.rating >= state.filters.rating
        );
      }

      // Apply features filter
      if (state.filters.features.length > 0) {
        filtered = filtered.filter(product =>
          product.features && 
          state.filters.features.some(feature => 
            product.features.includes(feature)
          )
        );
      }

      // Apply stock filter
      if (state.filters.inStock) {
        filtered = filtered.filter(product => product.inStock);
      }

      // Apply sale filter
      if (state.filters.onSale) {
        filtered = filtered.filter(product => product.sale);
      }

      // Apply sorting
      switch (state.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
          break;
        case 'price-high':
          filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => b.id - a.id);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'featured':
        default:
          // Keep featured items first, then sort by rating
          filtered.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return b.rating - a.rating;
          });
          break;
      }

      state.filteredItems = filtered;
    },
  },
});

export const {
  setLoading,
  setError,
  setFilters,
  clearFilters,
  setSortBy,
  setSearchQuery,
  setCurrentPage,
  applyFilters,
} = productsSlice.actions;

export default productsSlice.reducer;