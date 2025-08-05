import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor } from 'react-icons/fi';

const LoadingSpinner = ({ size = 'large', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  if (size === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-white dark:bg-dark-bg flex items-center justify-center z-50">
        <div className="text-center">
          {/* Animated Logo */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8">
            <div className="bg-primary-600 rounded-lg p-4 mx-auto w-20 h-20 
              flex items-center justify-center">
              <FiMonitor className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              TechHub<span className="text-primary-600">Pro</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Loading your tech experience...
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <motion.div
                className="bg-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm text-gray-500 dark:text-gray-400">
              Please wait while we prepare everything for you
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      {/* Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 
            border-t-primary-600 rounded-full`}
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-2 border-2 border-gray-100 dark:border-gray-800 
            border-b-primary-400 rounded-full`}
        />
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-600 rounded-full" />
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`mt-4 font-medium text-gray-600 dark:text-gray-400 ${textSizes[size]}`}>
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Skeleton Loader for Product Cards
export const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden">
    <div className="animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200 dark:bg-gray-700" />
      
      <div className="p-6">
        {/* Category */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
        
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3" />
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
        
        {/* Button */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

// Page Loading Skeleton
export const PageSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse">
      {/* Header */}
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8" />
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default LoadingSpinner;