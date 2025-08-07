import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { 
  FiTruck, FiShield, FiRefreshCw, FiHeadphones,
  FiCpu, FiMonitor, FiHardDrive, FiTool, FiArrowRight
} from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import { featuredProducts } from '../data/products';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const heroSlides = [
    {
      id: 1,
      title: 'Ultimate Gaming PCs',
      subtitle: 'Experience Next-Level Performance',
      description: 'Built with the latest RTX 4090 graphics cards',
      image: '/images/banners/gaming-pc-banner.jpg',
      link: '/products/gaming-pcs',
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      id: 2,
      title: 'Professional Workstations',
      subtitle: 'Power Through Any Task',
      description: 'Designed for creators and professionals',
      image: '/images/banners/workstation-banner.jpg',
      link: '/products/workstations',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      title: 'Spring Sale - Up to 40% Off',
      subtitle: 'Limited Time Offer',
      description: 'Save big on laptops and accessories',
      image: '/images/banners/sale-banner.jpg',
      link: '/products',
      gradient: 'from-red-600 to-orange-600',
    },
  ];

  const features = [
    {
      icon: <FiTruck className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Free Shipping',
      description: 'On orders over $500',
    },
    {
      icon: <FiShield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Warranty Protection',
      description: 'Up to 3 years warranty',
    },
    {
      icon: <FiRefreshCw className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: '30-Day Returns',
      description: 'Hassle-free returns',
    },
    {
      icon: <FiHeadphones className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: '24/7 Support',
      description: 'Expert tech support',
    },
  ];

  const categories = [
    {
      name: 'Gaming PCs',
      icon: <FiCpu className="w-8 h-8 sm:w-12 sm:h-12" />,
      image: '/images/categories/gaming-pc.jpg',
      link: '/products/gaming-pcs',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Laptops',
      icon: <FiMonitor className="w-8 h-8 sm:w-12 sm:h-12" />,
      image: '/images/categories/laptops.jpg',
      link: '/products/laptops',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Components',
      icon: <FiHardDrive className="w-8 h-8 sm:w-12 sm:h-12" />,
      image: '/images/categories/components.jpg',
      link: '/products/components',
      color: 'from-green-500 to-teal-500',
    },
    {
      name: 'Services',
      icon: <FiTool className="w-8 h-8 sm:w-12 sm:h-12" />,
      image: '/images/categories/services.jpg',
      link: '/services',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-full">
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`relative h-full bg-gradient-to-r ${slide.gradient}`}>
                <div className="absolute inset-0 bg-black/40" />
                <div className="mobile-container h-full flex items-center relative z-10 safe-area-top">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl mb-2">{slide.subtitle}</p>
                    <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90">
                      {slide.description}
                    </p>
                    <Link to={slide.link}>
                      <button className="bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg 
                        font-bold text-sm sm:text-base lg:text-lg hover:bg-gray-100 transform hover:scale-105 
                        transition-all duration-300 shadow-xl flex items-center space-x-2 touch-target">
                        <span>Shop Now</span>
                        <FiArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation */}
          <div className="swiper-button-prev !left-4 !w-10 !h-10 sm:!w-12 sm:!h-12 !mt-0 
            !top-1/2 !-translate-y-1/2 !bg-white/20 !backdrop-blur-sm !rounded-full 
            hover:!bg-white/30 !text-white after:!text-sm sm:after:!text-base" />
          <div className="swiper-button-next !right-4 !w-10 !h-10 sm:!w-12 sm:!h-12 !mt-0 
            !top-1/2 !-translate-y-1/2 !bg-white/20 !backdrop-blur-sm !rounded-full 
            hover:!bg-white/30 !text-white after:!text-sm sm:after:!text-base" />
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-gray-100 dark:bg-gray-900">
        <div className="mobile-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 
                  bg-white dark:bg-dark-card p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl 
                  transition-shadow text-center sm:text-left">
                <div className="text-primary-600 flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 sm:py-16">
        <div className="mobile-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              Find exactly what you need
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}>
                <Link to={category.link}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl 
                    aspect-square sm:aspect-auto">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} 
                      opacity-90 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative z-10 p-6 sm:p-8 text-white text-center h-full
                      flex flex-col items-center justify-center min-h-[200px] sm:min-h-[250px]">
                      <div className="mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-sm sm:text-base">
                        Browse Collection →
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gray-100 dark:bg-gray-900">
        <div className="mobile-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              Handpicked for performance and value
            </p>
          </motion.div>

          <div className="product-grid">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/products">
              <button className="btn-primary text-sm sm:text-base">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-primary-600 dark:bg-primary-800">
        <div className="mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Stay Updated with TechHub Pro
            </h2>
            <p className="mb-6 sm:mb-8 opacity-90 text-base sm:text-lg">
              Get exclusive deals, new product announcements, and tech tips delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 rounded-lg text-gray-900 focus:outline-none 
                  focus:ring-4 focus:ring-white/30 text-base"
              />
              <button type="submit" className="bg-white text-primary-600 px-6 sm:px-8 py-3 
                rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 
                transition-all duration-300 touch-target text-base">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;