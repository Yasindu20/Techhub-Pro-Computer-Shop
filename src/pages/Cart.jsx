import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiTrash2, FiMinus, FiPlus, FiShoppingBag, 
  FiArrowLeft, FiArrowRight, FiTag, FiTruck
} from 'react-icons/fi';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';

const Cart = () => {
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const shipping = totalAmount > 150000 ? 0 : 14700;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full 
            flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet. 
            Start shopping to fill it up!
          </p>
          <Link to="/products">
            <button className="btn-primary flex items-center mx-auto">
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {totalQuantity} item{totalQuantity !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center">
            <FiTrash2 className="mr-1" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
                
                <div className="flex items-start space-x-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 
                    rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {item.brand ? item.brand[0] : item.name[0]}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white 
                          line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.category} • {item.brand}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 
                          rounded-lg transition-colors">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {item.salePrice && item.salePrice < item.price ? (
                            <>
                              <span className="text-xl font-bold text-gray-800 dark:text-white">
                                {formatPrice(item.salePrice)}
                              </span>
                              <span className="text-gray-400 line-through">
                                {formatPrice(item.price)}
                              </span>
                              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 
                                px-2 py-1 rounded text-xs font-semibold">
                                SALE
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-gray-800 dark:text-white">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 
                          dark:border-gray-600 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                              rounded-l-lg transition-colors">
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center 
                            bg-gray-50 dark:bg-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                              rounded-r-lg transition-colors">
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {formatPrice(item.totalPrice)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatPrice(item.salePrice || item.price)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 sticky top-24">
              
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 
                  dark:text-gray-300 mb-2">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-l-lg bg-white dark:bg-gray-800 focus:ring-2 
                      focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 
                    text-gray-700 dark:text-gray-300 rounded-r-lg hover:bg-gray-300 
                    dark:hover:bg-gray-600 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <FiTruck className="mr-1" />
                    Shipping
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                {shipping > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 
                    dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center">
                      <FiTag className="mr-2" />
                      Add {formatPrice(150000 - totalAmount)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <button className="w-full btn-primary flex items-center justify-center mb-4">
                  <span>Proceed to Checkout</span>
                  <FiArrowRight className="ml-2" />
                </button>
              </Link>

              {/* Continue Shopping */}
              <Link to="/products">
                <button className="w-full px-6 py-3 border-2 border-gray-300 
                  dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg 
                  font-medium hover:bg-gray-50 dark:hover:bg-gray-800 
                  transition-colors flex items-center justify-center">
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-4 text-xs 
                  text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <FiShoppingBag className="mr-1" />
                    Secure Checkout
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <FiTruck className="mr-1" />
                    Fast Delivery
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;