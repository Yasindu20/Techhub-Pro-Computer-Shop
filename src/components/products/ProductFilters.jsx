import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, FiX, FiChevronDown, FiChevronUp, 
  FiDollarSign, FiStar, FiTag, FiCpu
} from 'react-icons/fi';
import { brands, categories } from '../../data/products';

const ProductFilters = ({ filters, onFiltersChange, onClearFilters, totalProducts }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    features: true,
  });

  const priceRanges = [
    { id: '0-100', label: 'Under $100', min: 0, max: 100 },
    { id: '100-500', label: '$100 - $500', min: 100, max: 500 },
    { id: '500-1000', label: '$500 - $1,000', min: 500, max: 1000 },
    { id: '1000-2000', label: '$1,000 - $2,000', min: 1000, max: 2000 },
    { id: '2000+', label: '$2,000+', min: 2000, max: Infinity },
  ];

  const ratingOptions = [
    { rating: 4, label: '4 Stars & Up' },
    { rating: 3, label: '3 Stars & Up' },
    { rating: 2, label: '2 Stars & Up' },
    { rating: 1, label: '1 Star & Up' },
  ];

  const featureOptions = [
    'RGB Lighting',
    'VR Ready',
    'Overclockable',
    'Liquid Cooling',
    'Tool-less Upgrade',
    'Wi-Fi 6',
    'Bluetooth',
    'USB-C',
    'Thunderbolt',
    '4K Support',
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value, checked) => {
    const newFilters = { ...filters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = checked ? value : null;
    } else if (filterType === 'rating') {
      newFilters.rating = checked ? value : null;
    } else {
      if (checked) {
        newFilters[filterType] = [...(newFilters[filterType] || []), value];
      } else {
        newFilters[filterType] = (newFilters[filterType] || []).filter(item => item !== value);
      }
    }
    
    onFiltersChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories?.length) count += filters.categories.length;
    if (filters.brands?.length) count += filters.brands.length;
    if (filters.priceRange) count += 1;
    if (filters.rating) count += 1;
    if (filters.features?.length) count += filters.features.length;
    return count;
  };

  const FilterSection = ({ title, icon, section, children }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left mb-4">
        <h3 className="flex items-center space-x-2 font-semibold text-gray-800 dark:text-white">
          {icon}
          <span>{title}</span>
        </h3>
        {expandedSections[section] ? (
          <FiChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FiltersContent = () => (
    <>
      {/* Categories */}
      <FilterSection 
        title="Categories" 
        icon={<FiTag className="w-5 h-5" />} 
        section="category">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-3 cursor-pointer 
              hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.categories?.includes(category.name) || false}
                onChange={(e) => handleFilterChange('categories', category.name, e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded border-gray-300 
                  focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection 
        title="Brands" 
        icon={<FiCpu className="w-5 h-5" />} 
        section="brand">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer 
              hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={(e) => handleFilterChange('brands', brand, e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded border-gray-300 
                  focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection 
        title="Price Range" 
        icon={<FiDollarSign className="w-5 h-5" />} 
        section="price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center space-x-3 cursor-pointer 
              hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range.id}
                onChange={(e) => handleFilterChange('priceRange', range.id, e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection 
        title="Customer Rating" 
        icon={<FiStar className="w-5 h-5" />} 
        section="rating">
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label key={option.rating} className="flex items-center space-x-3 cursor-pointer 
              hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === option.rating}
                onChange={(e) => handleFilterChange('rating', option.rating, e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FiStar
                      key={index}
                      className={`w-4 h-4 ${
                        index < option.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection 
        title="Features" 
        icon={<FiTag className="w-5 h-5" />} 
        section="features">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {featureOptions.map((feature) => (
            <label key={feature} className="flex items-center space-x-3 cursor-pointer 
              hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.features?.includes(feature) || false}
                onChange={(e) => handleFilterChange('features', feature, e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded border-gray-300 
                  focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full flex items-center justify-center space-x-2 bg-white 
            dark:bg-dark-card border border-gray-300 dark:border-gray-600 
            px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          <FiFilter className="w-5 h-5" />
          <span>Filters</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
            <FiFilter className="mr-2" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </h2>
          {getActiveFiltersCount() > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Clear All
            </button>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {totalProducts} products found
        </div>

        <FiltersContent />
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="absolute inset-0 bg-black/50"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-dark-card 
                shadow-2xl overflow-y-auto">
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {totalProducts} products found
                </div>

                <FiltersContent />

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <button
                      onClick={onClearFilters}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                        rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 
                        dark:hover:bg-gray-800">
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="flex-1 btn-primary">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilters;