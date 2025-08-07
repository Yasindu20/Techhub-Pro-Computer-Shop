import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, FiHeart, FiEye, FiStar,
  FiCheck, FiX
} from 'react-icons/fi';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import QuickView from './QuickView';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl 
          transition-all duration-300 overflow-hidden group">
        
        <Link to={`/product/${product.id}`} className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative w-full sm:w-48 h-48 sm:h-32 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 
              flex items-center justify-center text-white text-2xl sm:text-xl font-bold">
              {product.brand ? product.brand[0] : 'P'}
            </div>
            
            {/* Sale Badge */}
            {product.sale && (
              <div className="absolute top-2 left-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  -{product.salePercentage}%
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="flex-1">
                {/* Category */}
                <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 
                  font-medium mb-1">
                  {product.category}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-white 
                  mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Description - Hidden on mobile */}
                <p className="hidden lg:block text-sm text-gray-600 dark:text-gray-400 
                  line-clamp-2 mb-2">
                  {product.description}
                </p>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end 
                justify-between sm:justify-start space-x-4 sm:space-x-0 mt-4 sm:mt-0">
                {/* Price */}
                <div className="flex flex-col sm:text-right">
                  {product.sale ? (
                    <>
                      <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                        ${product.salePrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleToggleWishlist}
                    className={`p-2 rounded-full transition-all touch-target ${
                      isInWishlist 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                    }`}>
                    <FiHeart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all touch-target
                      ${product.inStock
                        ? addedToCart
                          ? 'bg-green-500 text-white'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}>
                    {addedToCart ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid View (Default)
  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white dark:bg-dark-card rounded-xl shadow-lg 
          hover:shadow-2xl transition-all duration-300 overflow-hidden">
        
        {/* Sale Badge */}
        {product.sale && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full 
              text-xs font-semibold">
              -{product.salePercentage}%
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 z-10 space-y-2 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 touch-target
              ${isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
              }`}>
            <FiHeart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowQuickView(true);
            }}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg 
              text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white 
              transition-all duration-300 touch-target">
            <FiEye className="w-4 h-4" />
          </button>
        </div>

        <Link to={`/product/${product.id}`}>
          {/* Product Image */}
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 
              flex items-center justify-center text-white text-3xl sm:text-4xl font-bold 
              transform transition-transform duration-700 group-hover:scale-110">
              {product.brand ? product.brand[0] : 'P'}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 sm:p-6">
            {/* Category */}
            <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 
              font-medium mb-2">
              {product.category}
            </p>

            {/* Product Name */}
            <h3 className="font-semibold text-sm sm:text-lg text-gray-800 dark:text-white 
              mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors 
              leading-tight">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                {product.sale ? (
                  <>
                    <span className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                      ${product.salePrice}
                    </span>
                    <span className="text-sm sm:text-lg text-gray-400 line-through">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                    ${product.price}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center">
                {product.inStock ? (
                  <span className="flex items-center text-green-600 text-xs sm:text-sm">
                    <FiCheck className="mr-1 w-3 h-3" /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 text-xs sm:text-sm">
                    <FiX className="mr-1 w-3 h-3" /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 
                flex items-center justify-center space-x-2 text-sm sm:text-base
                ${product.inStock
                  ? addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}>
              {addedToCart ? (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <FiShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickView
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};

export default ProductCard;