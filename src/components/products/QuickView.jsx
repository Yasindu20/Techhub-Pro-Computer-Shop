import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiMinus, FiPlus, FiShoppingCart, FiHeart, 
  FiStar, FiCheck, FiTruck, FiShield
} from 'react-icons/fi';
import { addToCart } from '../../store/cartSlice';

const QuickView = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white dark:bg-dark-card rounded-2xl shadow-2xl 
            max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 
              rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 
              transition-colors">
            <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 
                rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 
                  flex items-center justify-center text-white text-6xl font-bold">
                  {product.brand ? product.brand[0] : 'P'}
                </div>
                
                {product.sale && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full 
                      text-sm font-semibold">
                      -{product.salePercentage}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden 
                        border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary-600'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}>
                      <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 
                        flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Category and Brand */}
              <div className="flex items-center space-x-4">
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  {product.category}
                </span>
                {product.brand && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {product.brand}
                    </span>
                  </>
                )}
              </div>

              {/* Product Name */}
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                {product.sale ? (
                  <>
                    <span className="text-3xl font-bold text-gray-800 dark:text-white">
                      ${product.salePrice}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.price}
                    </span>
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 
                      px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${product.price - product.salePrice}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {product.inStock ? (
                  <>
                    <FiCheck className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <FiX className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              {product.features && (
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Key Features:
                  </h3>
                  <ul className="space-y-2">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 
                        text-gray-600 dark:text-gray-400">
                        <FiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-800 dark:text-white">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 
                  rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                      disabled:opacity-50 disabled:cursor-not-allowed">
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                      disabled:opacity-50 disabled:cursor-not-allowed">
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 
                    rounded-lg font-semibold transition-all duration-300 ${
                    product.inStock
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

                <button className="p-3 border-2 border-gray-300 dark:border-gray-600 
                  rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 
                dark:border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-600 
                  dark:text-gray-400">
                  <FiTruck className="w-4 h-4" />
                  <span>Free shipping over $500</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 
                  dark:text-gray-400">
                  <FiShield className="w-4 h-4" />
                  <span>1-3 year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickView;