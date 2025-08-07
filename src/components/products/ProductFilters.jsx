import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, FiX, FiChevronDown, FiChevronUp, 
  FiDollarSign, FiStar, FiTag, FiCpu, FiCheck
} from 'react-icons/fi';
import { brands, categories } from '../../data/products';

const ProductFilters = ({ filters, onFiltersChange, onClearFilters, totalProducts }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: false,
    price: true,
    rating: false,
    features: false,
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
        className="flex items-center justify-between w-full text-left mb-4 touch-target">
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

  const FilterCheckbox = ({ checked, onChange, label, count }) => (
    <label className="flex items-center space-x-3 cursor-pointer 
      hover:bg-gray-50 dark:hover:bg-gray-800 p-3 -mx-3 rounded-lg touch-target">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 
          ${checked 
            ? 'bg-primary-600 border-primary-600' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
          }`}>
          {checked && (
            <FiCheck className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
          )}
        </div>
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
        {label}
      </span>
      {count && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({count})
        </span>
      )}
    </label>
  );

  const FilterRadio = ({ checked, onChange, label, name }) => (
    <label className="flex items-center space-x-3 cursor-pointer 
      hover:bg-gray-50 dark:hover:bg-gray-800 p-3 -mx-3 rounded-lg touch-target">
      <div className="relative">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded-full transition-all duration-200 
          ${checked 
            ? 'border-primary-600' 
            : 'border-gray-300 dark:border-gray-600'
          }`}>
          {checked && (
            <div className="w-3 h-3 bg-primary-600 rounded-full absolute top-0.5 left-0.5" />
          )}
        </div>
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
        {label}
      </span>
    </label>
  );

  const FiltersContent = () => (
    <>
      {/* Quick Filters - Mobile Only */}
      <div className="md:hidden mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Filters</h3>
        <div className="grid grid-cols-2 gap-3">
          <FilterCheckbox
            checked={filters.inStock || false}
            onChange={(e) => handleFilterChange('inStock', true, e.target.checked)}
            label="In Stock"
          />
          <FilterCheckbox
            checked={filters.onSale || false}
            onChange={(e) => handleFilterChange('onSale', true, e.target.checked)}
            label="On Sale"
          />
        </div>
      </div>

      {/* Categories */}
      <FilterSection 
        title="Categories" 
        icon={<FiTag className="w-5 h-5" />} 
        section="category">
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <FilterCheckbox
              key={category.id}
              checked={filters.categories?.includes(category.name) || false}
              onChange={(e) => handleFilterChange('categories', category.name, e.target.checked)}
              label={category.name}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection 
        title="Price Range" 
        icon={<FiDollarSign className="w-5 h-5" />} 
        section="price">
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <FilterRadio
              key={range.id}
              name="priceRange"
              checked={filters.priceRange === range.id}
              onChange={(e) => handleFilterChange('priceRange', range.id, e.target.checked)}
              label={range.label}
            />
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection 
        title="Brands" 
        icon={<FiCpu className="w-5 h-5" />} 
        section="brand">
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {brands.slice(0, 10).map((brand) => (
            <FilterCheckbox
              key={brand}
              checked={filters.brands?.includes(brand) || false}
              onChange={(e) => handleFilterChange('brands', brand, e.target.checked)}
              label={brand}
            />
          ))}
          {brands.length > 10 && (
            <button className="text-sm text-primary-600 hover:text-primary-700 mt-2">
              Show more brands...
            </button>
          )}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection 
        title="Customer Rating" 
        icon={<FiStar className="w-5 h-5" />} 
        section="rating">
        <div className="space-y-1">
          {ratingOptions.map((option) => (
            <label key={option.rating} className="flex items-center space-x-3 cursor-pointer 
              hover:bg-gray-50 dark:hover:bg-gray-800 p-3 -mx-3 rounded-lg touch-target">
              <div className="relative">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === option.rating}
                  onChange={(e) => handleFilterChange('rating', option.rating, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded-full transition-all duration-200 
                  ${filters.rating === option.rating
                    ? 'border-primary-600' 
                    : 'border-gray-300 dark:border-gray-600'
                  }`}>
                  {filters.rating === option.rating && (
                    <div className="w-3 h-3 bg-primary-600 rounded-full absolute top-0.5 left-0.5" />
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-1">
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
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {featureOptions.map((feature) => (
            <FilterCheckbox
              key={feature}
              checked={filters.features?.includes(feature) || false}
              onChange={(e) => handleFilterChange('features', feature, e.target.checked)}
              label={feature}
            />
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
            px-4 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
            text-base font-medium touch-target">
          <FiFilter className="w-5 h-5" />
          <span>Filters</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
            <FiFilter className="mr-2" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-dark-card 
                shadow-2xl overflow-y-auto safe-area-top safe-area-bottom">
              
              <div className="sticky top-0 bg-white dark:bg-dark-card z-10 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {totalProducts} products found
                </div>
              </div>

              <div className="p-4">
                <FiltersContent />
              </div>

              <div className="sticky bottom-0 bg-white dark:bg-dark-card p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onClearFilters}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 
                      rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 
                      dark:hover:bg-gray-800 font-medium touch-target">
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="btn-primary">
                    Apply Filters
                  </button>
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