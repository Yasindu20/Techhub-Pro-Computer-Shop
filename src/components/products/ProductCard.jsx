import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { 
  FiShoppingCart, FiHeart, FiEye, FiStar,
  FiCheck, FiX
} from 'react-icons/fi';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import QuickView from './QuickView';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white dark:bg-dark-card rounded-xl shadow-lg 
          hover:shadow-2xl transition-all duration-300 overflow-hidden">
        
        {/* Sale Badge */}
        {product.sale && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{product.salePercentage}%
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 z-10 space-y-2 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 
              ${isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
              }`}>
            <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowQuickView(true);
            }}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg 
              text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white 
              transition-all duration-300">
            <FiEye className="w-5 h-5" />
          </button>
        </div>

        <Link to={`/product/${product.id}`}>
          {/* Product Image */}
          <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <LazyLoadImage
              src={product.image}
              alt={product.name}
              effect="blur"
              className={`w-full h-full object-cover transform transition-transform 
                duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              afterLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg w-32 h-32" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Category */}
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
              {product.category}
            </p>

            {/* Product Name */}
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 
              line-clamp-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {product.sale ? (
                  <>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                      ${product.salePrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    ${product.price}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center">
                {product.inStock ? (
                  <span className="flex items-center text-green-600 text-sm">
                    <FiCheck className="mr-1" /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 text-sm">
                    <FiX className="mr-1" /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 
                flex items-center justify-center space-x-2
                ${product.inStock
                  ? addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}>
              {addedToCart ? (
                <>
                  <FiCheck className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <FiShoppingCart className="w-5 h-5" />
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