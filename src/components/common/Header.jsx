import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, 
  FiMonitor, FiHeadphones,
  FiPhone, FiMail, FiUser, FiSun, FiMoon
} from 'react-icons/fi';
import { HiDesktopComputer } from 'react-icons/hi';
import { GiProcessor } from 'react-icons/gi';
import { MdLaptop } from 'react-icons/md';
import SearchBar from '../ui/SearchBar';
import CartDropdown from '../cart/CartDropdown';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const cartItems = useSelector(state => state.cart.totalQuantity);
  const wishlistItems = useSelector(state => state.wishlist.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      title: 'Computers',
      icon: <HiDesktopComputer className="w-5 h-5" />,
      subcategories: [
        { name: 'Gaming PCs', link: '/products/gaming-pcs' },
        { name: 'Workstations', link: '/products/workstations' },
        { name: 'All-in-One PCs', link: '/products/all-in-one' },
        { name: 'Mini PCs', link: '/products/mini-pcs' },
      ]
    },
    {
      title: 'Laptops',
      icon: <MdLaptop className="w-5 h-5" />,
      subcategories: [
        { name: 'Gaming Laptops', link: '/products/gaming-laptops' },
        { name: 'Business Laptops', link: '/products/business-laptops' },
        { name: 'Ultrabooks', link: '/products/ultrabooks' },
        { name: '2-in-1 Laptops', link: '/products/2-in-1-laptops' },
      ]
    },
    {
      title: 'Components',
      icon: <GiProcessor className="w-5 h-5" />,
      subcategories: [
        { name: 'Processors', link: '/products/processors' },
        { name: 'Graphics Cards', link: '/products/graphics-cards' },
        { name: 'Motherboards', link: '/products/motherboards' },
        { name: 'RAM', link: '/products/ram' },
        { name: 'Storage', link: '/products/storage' },
        { name: 'Power Supplies', link: '/products/power-supplies' },
      ]
    },
    {
      title: 'Peripherals',
      icon: <FiHeadphones className="w-5 h-5" />,
      subcategories: [
        { name: 'Monitors', link: '/products/monitors' },
        { name: 'Keyboards', link: '/products/keyboards' },
        { name: 'Mice', link: '/products/mice' },
        { name: 'Headsets', link: '/products/headsets' },
        { name: 'Webcams', link: '/products/webcams' },
      ]
    },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg' : 
        'bg-white dark:bg-dark-bg'}`}>
        
        {/* Top Bar */}
        <div className="bg-primary-600 dark:bg-primary-800 text-white py-2 text-sm">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FiPhone className="mr-2" /> 1-800-TECHHUB
              </span>
              <span className="hidden md:flex items-center">
                <FiMail className="mr-2" /> support@techhub.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:block">Free Shipping on Orders Over $500</span>
              <button className="flex items-center hover:opacity-80">
                <FiUser className="mr-1" /> Account
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 rounded-lg p-2">
                <FiMonitor className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                TechHub<span className="text-primary-600">Pro</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="nav-link">Home</Link>
              
              <div className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}>
                <button className="nav-link flex items-center">
                  Products <FiMenu className="ml-1" />
                </button>
                
                <AnimatePresence>
                  {showMegaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-[800px] mt-2 bg-white dark:bg-dark-card 
                        rounded-xl shadow-2xl p-6">
                      <div className="grid grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                          <div key={index}>
                            <h3 className="flex items-center font-semibold text-gray-800 
                              dark:text-white mb-3">
                              {category.icon}
                              <span className="ml-2">{category.title}</span>
                            </h3>
                            <ul className="space-y-2">
                              {category.subcategories.map((sub, idx) => (
                                <li key={idx}>
                                  <Link to={sub.link} 
                                    className="text-gray-600 dark:text-gray-300 
                                    hover:text-primary-600 dark:hover:text-primary-400 
                                    transition-colors">
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <Link to="/products" className="text-primary-600 font-semibold 
                            hover:text-primary-700">
                            View All Products →
                          </Link>
                          <div className="flex space-x-4">
                            <span className="text-sm text-gray-500">
                              🔥 Hot Deals
                            </span>
                            <span className="text-sm text-gray-500">
                              🆕 New Arrivals
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <FiSearch className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              <button onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 
                dark:hover:bg-gray-800 rounded-lg">
                <FiHeart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                    text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button onClick={() => setShowCartDropdown(!showCartDropdown)}
                  className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <FiShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white 
                      text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </button>
                
                <AnimatePresence>
                  {showCartDropdown && (
                    <CartDropdown onClose={() => setShowCartDropdown(false)} />
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                {showMobileMenu ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4">
                <SearchBar onClose={() => setShowSearch(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-dark-bg shadow-2xl 
                z-50 overflow-y-auto">
              <div className="p-6">
                <button onClick={() => setShowMobileMenu(false)}
                  className="absolute top-4 right-4 p-2">
                  <FiX className="w-6 h-6" />
                </button>
                
                <nav className="mt-8 space-y-4">
                  <Link to="/" className="block py-2 text-lg font-medium">Home</Link>
                  <Link to="/products" className="block py-2 text-lg font-medium">Products</Link>
                  <Link to="/services" className="block py-2 text-lg font-medium">Services</Link>
                  <Link to="/about" className="block py-2 text-lg font-medium">About</Link>
                  <Link to="/contact" className="block py-2 text-lg font-medium">Contact</Link>
                  <Link to="/blog" className="block py-2 text-lg font-medium">Blog</Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style jsx>{`
        .nav-link {
          @apply text-gray-700 dark:text-gray-300 hover:text-primary-600 
            dark:hover:text-primary-400 font-medium transition-colors;
        }
      `}</style>
    </>
  );
};

export default Header;