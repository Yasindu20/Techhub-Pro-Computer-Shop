import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiCreditCard, FiLock, FiCheck,
  FiUser, FiMail, FiPhone, FiMapPin
} from 'react-icons/fi';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const shipping = totalAmount > 500 ? 0 : 49;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + shipping + tax;

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const onSubmit = (data) => {
    // In a real app, this would process the payment
    console.log('Order data:', data);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-dark-card rounded-xl shadow-2xl p-8 max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full 
            flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <p className="text-lg font-semibold text-primary-600 mb-8">
            Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary">
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 
                  flex items-center">
                  <FiUser className="mr-2" />
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 
                      dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                        rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                        focus:border-transparent"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 
                      dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                        rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                        focus:border-transparent"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 
                      dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3 text-gray-400" />
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                          focus:border-transparent"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 
                      dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        type="tel"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                          focus:border-transparent"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 
                  flex items-center">
                  <FiMapPin className="mr-2" />
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 
                      dark:text-gray-300 mb-2">
                      Street Address
                    </label>
                    <input
                      {...register('address', { required: 'Address is required' })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                        rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                        focus:border-transparent"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 
                        dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        {...register('city', { required: 'City is required' })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                          focus:border-transparent"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 
                        dark:text-gray-300 mb-2">
                        State
                      </label>
                      <input
                        {...register('state', { required: 'State is required' })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                          focus:border-transparent"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 
                        dark:text-gray-300 mb-2">
                        ZIP Code
                      </label>
                      <input
                        {...register('zip', { required: 'ZIP code is required' })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                          focus:border-transparent"
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 
                  flex items-center">
                  <FiCreditCard className="mr-2" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === 'card'
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                      <FiCreditCard className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Credit Card</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                      <SiPaypal className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">PayPal</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                      <FiLock className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Bank Transfer</p>
                    </button>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 
                          dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          {...register('cardNumber', { 
                            required: paymentMethod === 'card' ? 'Card number is required' : false 
                          })}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                            rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                            focus:border-transparent"
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 
                            dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            {...register('cardExpiry', { 
                              required: paymentMethod === 'card' ? 'Expiry date is required' : false 
                            })}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                              rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                              focus:border-transparent"
                          />
                          {errors.cardExpiry && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardExpiry.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 
                            dark:text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            {...register('cardCvv', { 
                              required: paymentMethod === 'card' ? 'CVV is required' : false 
                            })}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                              rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                              focus:border-transparent"
                          />
                          {errors.cardCvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardCvv.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Accepted Cards */}
                      <div className="flex items-center space-x-2 text-gray-500">
                        <span className="text-sm">We accept:</span>
                        <SiVisa className="w-8 h-5" />
                        <SiMastercard className="w-8 h-5" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 
                      dark:border-blue-800 rounded-lg p-4 mt-6">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 
                      dark:border-yellow-800 rounded-lg p-4 mt-6">
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        Bank transfer details will be provided after placing the order.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Order Summary
                </h2>

                {/* Cart Items Summary */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 
                        rounded flex items-center justify-center text-white font-bold">
                        {item.brand ? item.brand[0] : 'P'}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-xl font-bold 
                    text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full btn-primary mt-6 flex items-center justify-center">
                  <FiLock className="mr-2" />
                  Place Order
                </button>

                {/* Security Notice */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center 
                    justify-center">
                    <FiLock className="mr-1" />
                    Secure 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;