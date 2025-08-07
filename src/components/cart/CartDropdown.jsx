import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiTrash2, FiMinus, FiPlus, FiShoppingBag, 
  FiArrowRight, FiX
} from 'react-icons/fi';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

const CartDropdown = ({ onClose }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-dark-card 
        rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 
        max-h-[80vh] overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 
        dark:border-gray-700 flex-shrink-0">
        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center">
          <FiShoppingBag className="mr-2" />
          Cart ({totalQuantity})
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded touch-target">
          <FiX className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {items.length === 0 ? (
        /* Empty Cart */
        <div className="p-6 text-center flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full 
            flex items-center justify-center mx-auto mb-4">
            <FiShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your cart is empty
          </p>
          <Link to="/products">
            <button 
              onClick={onClose}
              className="btn-primary text-sm">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="max-h-80 overflow-y-auto flex-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 sm:space-x-4 p-4 
                border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                
                {/* Product Image */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-400 to-primary-600 
                  rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 text-sm sm:text-base">
                  {item.brand ? item.brand[0] : item.name[0]}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 dark:text-white text-sm 
                    line-clamp-2 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {item.category}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-800 dark:text-white text-sm">
                      ${item.salePrice || item.price}
                    </span>
                    {item.salePrice && item.salePrice < item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ${item.price}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 
                      dark:border-gray-600 rounded">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target">
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 touch-target">
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 
                        rounded transition-colors touch-target">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-800 dark:text-white">
                Subtotal:
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            {/* Shipping Notice */}
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              {totalAmount >= 500 ? (
                <span className="text-green-600">🎉 Free shipping applied!</span>
              ) : (
                <span>Add ${(500 - totalAmount).toFixed(2)} more for free shipping</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link to="/cart" onClick={onClose}>
                <button className="w-full px-4 py-3 border-2 border-primary-600 
                  text-primary-600 rounded-lg font-medium hover:bg-primary-50 
                  dark:hover:bg-primary-900/20 transition-colors text-sm sm:text-base touch-target">
                  View Cart
                </button>
              </Link>
              <Link to="/checkout" onClick={onClose}>
                <button className="w-full btn-primary flex items-center justify-center">
                  <span>Checkout</span>
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CartDropdown;