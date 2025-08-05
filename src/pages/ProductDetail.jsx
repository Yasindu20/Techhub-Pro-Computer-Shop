import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FiStar, FiHeart, FiShoppingCart, FiTruck, FiShield, 
  FiRefreshCw, FiCheck, FiMinus, FiPlus, FiShare2,
  FiArrowLeft, FiZoomIn
} from 'react-icons/fi';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const wishlist = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlist.some(item => item.id === parseInt(id));

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Product not found
          </h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
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
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <button onClick={() => navigate('/products')} 
              className="hover:text-primary-600 flex items-center">
              <FiArrowLeft className="mr-1" />
              Products
            </button>
            <span>•</span>
            <span>{product.category}</span>
            <span>•</span>
            <span className="text-gray-800 dark:text-white font-medium">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-xl 
              overflow-hidden shadow-lg group">
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 
                flex items-center justify-center text-white text-8xl font-bold">
                {product.brand ? product.brand[0] : 'P'}
              </div>
              
              {product.sale && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-2 rounded-full 
                    text-sm font-semibold">
                    -{product.salePercentage}% OFF
                  </span>
                </div>
              )}

              <button
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white 
                  rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FiZoomIn className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto">
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
                      flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
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
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {product.sale ? (
                <>
                  <span className="text-4xl font-bold text-gray-800 dark:text-white">
                    ${product.salePrice}
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 
                    px-3 py-1 rounded-full text-sm font-semibold">
                    Save ${product.price - product.salePrice}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-800 dark:text-white">
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
                  <span className="text-gray-500">• Ready to ship</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 bg-red-600 rounded-full" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  Key Features:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 
                      text-gray-600 dark:text-gray-400">
                      <FiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-800 dark:text-white">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 
                  rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 
                      disabled:opacity-50 disabled:cursor-not-allowed">
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[4rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 
                      disabled:opacity-50 disabled:cursor-not-allowed">
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 px-8 py-4 
                    rounded-lg font-semibold text-lg transition-all duration-300 ${
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

                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    isInWishlist
                      ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}>
                  <FiHeart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>

                <button className="p-4 border-2 border-gray-300 dark:border-gray-600 
                  rounded-lg hover:border-gray-400 transition-colors">
                  <FiShare2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 
              dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-600 
                dark:text-gray-400">
                <FiTruck className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-xs">On orders over $500</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 
                dark:text-gray-400">
                <FiShield className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium">Warranty</p>
                  <p className="text-xs">Up to 3 years</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 
                dark:text-gray-400">
                <FiRefreshCw className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-medium">Returns</p>
                  <p className="text-xs">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg mb-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {product.description}
                </p>
                {product.features && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Features & Benefits
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  Technical Specifications
                </h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b 
                        border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-800 dark:text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Detailed specifications coming soon.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Customer Reviews
                  </h3>
                  <button className="btn-primary">Write a Review</button>
                </div>
                
                <div className="flex items-center space-x-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white">
                      {product.rating}
                    </div>
                    <div className="flex justify-center mb-1">
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Based on {product.reviews} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                          {rating}★
                        </span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                          {Math.floor(Math.random() * 50)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center text-gray-600 dark:text-gray-400">
                  Individual reviews coming soon. Be the first to review this product!
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <FiTruck className="w-5 h-5 text-primary-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          Free Standard Shipping
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          On orders over $500. Delivery in 5-7 business days.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiTruck className="w-5 h-5 text-primary-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          Express Shipping
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          $15.99 - Delivery in 2-3 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Return Policy
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <FiRefreshCw className="w-5 h-5 text-primary-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          30-Day Returns
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Return items in original condition within 30 days for a full refund.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiShield className="w-5 h-5 text-primary-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          Warranty Coverage
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Manufacturer warranty up to 3 years depending on the product.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;