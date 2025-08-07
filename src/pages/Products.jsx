import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiGrid, FiList, FiSearch, FiChevronDown
} from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import LoadingSpinner, { ProductCardSkeleton } from '../components/common/LoadingSpinner';
import { setFilters, clearFilters, setSortBy, setSearchQuery, setCurrentPage } from '../store/productsSlice';

const Products = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  const {
    filteredItems,
    loading,
    filters,
    sortBy,
    searchQuery,
    currentPage,
    itemsPerPage
  } = useSelector(state => state.products);

  const [viewMode, setViewMode] = useState('grid');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
  ];

  // Handle URL parameters
  useEffect(() => {
    const category = location.pathname.split('/products/')[1];
    const search = searchParams.get('search');
    
    if (category) {
      dispatch(setFilters({ categories: [category] }));
    }
    
    if (search) {
      dispatch(setSearchQuery(search));
    }
  }, [location, searchParams, dispatch]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleFiltersChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(setSearchQuery(''));
  };

  const handleSortChange = (newSortBy) => {
    dispatch(setSortBy(newSortBy));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
        <div className="mobile-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
                <LoadingSpinner size="medium" text="Loading filters..." />
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="product-grid">
                {Array.from({ length: 9 }, (_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-4 sm:py-8 safe-area-top">
      <div className="mobile-container">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Showing {filteredItems.length} of {filteredItems.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              totalProducts={filteredItems.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4 order-2 sm:order-1">
                  {/* View Mode Toggle - Hidden on mobile */}
                  <div className="hidden sm:flex items-center border border-gray-300 dark:border-gray-600 
                    rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 touch-target ${viewMode === 'grid' 
                        ? 'bg-primary-600 text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}>
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 touch-target ${viewMode === 'list' 
                        ? 'bg-primary-600 text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}>
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>

                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredItems.length} product{filteredItems.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Sort Dropdown */}
                <div className="relative order-1 sm:order-2 w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-white dark:bg-gray-800 border 
                      border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 
                      focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base">
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 
                    w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {paginatedItems.length > 0 ? (
              <>
                <div className={
                  viewMode === 'grid' 
                    ? 'product-grid mb-8'
                    : 'space-y-4 sm:space-y-6 mb-8'
                }>
                  {paginatedItems.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}>
                      <ProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 
                        rounded-lg disabled:opacity-50 disabled:cursor-not-allowed 
                        hover:bg-gray-50 dark:hover:bg-gray-800 text-sm sm:text-base touch-target">
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex space-x-1 sm:space-x-2">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        
                        if (page < 1 || page > totalPages) return null;
                        
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 border rounded-lg text-sm sm:text-base touch-target min-w-[44px] ${
                              currentPage === page
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}>
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    
                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 
                        rounded-lg disabled:opacity-50 disabled:cursor-not-allowed 
                        hover:bg-gray-50 dark:hover:bg-gray-800 text-sm sm:text-base touch-target">
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* No Results */
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full 
                  flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;