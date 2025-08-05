import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiTrendingUp, FiClock } from 'react-icons/fi';
import { products } from '../../data/products';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const popularSearches = [
    'Gaming PC',
    'RTX 4090',
    'Gaming Laptop',
    'Monitor 4K',
    'Mechanical Keyboard',
    'SSD 1TB',
    'Ryzen 9',
    'Intel i9'
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filteredResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      
      setResults(filteredResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(search => search !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      onClose && onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleResultClick = (product) => {
    navigate(`/product/${product.id}`);
    onClose && onClose();
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 
          text-gray-400 w-5 h-5" />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for products, brands, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowResults(true)}
          className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 
            dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 
            focus:ring-2 focus:ring-primary-500 focus:border-transparent 
            placeholder-gray-500 dark:placeholder-gray-400"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card 
              rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 
              max-h-96 overflow-y-auto z-50">
            
            {query && results.length > 0 ? (
              /* Search Results */
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Search Results
                  </h3>
                  <button
                    onClick={() => handleSearch(query)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All Results
                  </button>
                </div>
                
                <div className="space-y-2">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleResultClick(product)}
                      className="w-full flex items-center space-x-4 p-3 hover:bg-gray-50 
                        dark:hover:bg-gray-800 rounded-lg transition-colors text-left">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 
                        rounded-lg flex items-center justify-center text-white font-bold">
                        {product.brand ? product.brand[0] : 'P'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.category} • ${product.salePrice || product.price}
                        </p>
                      </div>
                      <FiSearch className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            ) : query && results.length === 0 ? (
              /* No Results */
              <div className="p-6 text-center">
                <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  No products found for "{query}"
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Try searching for something else
                </p>
              </div>
            ) : (
              /* Recent Searches & Popular */
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 dark:text-white 
                        flex items-center">
                        <FiClock className="mr-2 w-4 h-4" />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-sm text-gray-500 hover:text-gray-700 
                          dark:hover:text-gray-300">
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 
                            dark:hover:bg-gray-800 rounded-lg transition-colors text-left">
                          <FiClock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3 
                    flex items-center">
                    <FiTrendingUp className="mr-2 w-4 h-4" />
                    Popular Searches
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 
                          dark:hover:bg-gray-800 rounded-lg transition-colors text-left">
                        <FiTrendingUp className="w-4 h-4 text-primary-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {search}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {showResults && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;