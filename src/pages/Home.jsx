import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { 
  FiTruck, FiShield, FiRefreshCw, FiHeadphones,
  FiCpu, FiMonitor, FiHardDrive, FiTool
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
      icon: <FiTruck className="w-8 h-8" />,
      title: 'Free Shipping',
      description: 'On orders over $500',
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Warranty Protection',
      description: 'Up to 3 years warranty',
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: '30-Day Returns',
      description: 'Hassle-free returns',
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Expert tech support',
    },
  ];

  const categories = [
    {
      name: 'Gaming PCs',
      icon: <FiCpu className="w-12 h-12" />,
      image: '/images/categories/gaming-pc.jpg',
      link: '/products/gaming-pcs',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Laptops',
      icon: <FiMonitor className="w-12 h-12" />,
      image: '/images/categories/laptops.jpg',
      link: '/products/laptops',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Components',
      icon: <FiHardDrive className="w-12 h-12" />,
      image: '/images/categories/components.jpg',
      link: '/products/components',
      color: 'from-green-500 to-teal-500',
    },
    {
      name: 'Services',
      icon: <FiTool className="w-12 h-12" />,
      image: '/images/categories/services.jpg',
      link: '/services',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-full">
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`relative h-full bg-gradient-to-r ${slide.gradient}`}>
                <div className="absolute inset-0 bg-black/40" />
                <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-2xl mb-2">{slide.subtitle}</p>
                    <p className="text-lg mb-8 opacity-90">{slide.description}</p>
                    <Link to={slide.link}>
                      <button className="bg-white text-gray-900 px-8 py-4 rounded-lg 
                        font-bold text-lg hover:bg-gray-100 transform hover:scale-105 
                        transition-all duration-300 shadow-xl">
                        Shop Now →
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 bg-white dark:bg-dark-card 
                  p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-primary-600">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Find exactly what you need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}>
                <Link to={category.link}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} 
                      opacity-90 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative z-10 p-8 text-white text-center h-64 
                      flex flex-col items-center justify-center">
                      <div className="mb-4 transform group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="opacity-0 group-hover:opacity-100 transition-opacity">
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
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Handpicked for performance and value
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <div className="text-center mt-12">
            <Link to="/products">
              <button className="btn-primary">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with TechHub Pro
            </h2>
            <p className="mb-8 opacity-90">
              Get exclusive deals, new product announcements, and tech tips delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none 
                  focus:ring-4 focus:ring-white/30"
              />
              <button type="submit" className="bg-white text-primary-600 px-8 py-3 
                rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 
                transition-all duration-300">
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