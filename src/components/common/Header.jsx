import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, 
  FiMonitor, FiHeadphones, FiPhone, FiMail, FiUser, 
  FiSun, FiMoon, FiHome, FiTool, FiInfo, FiMessageSquare
} from 'react-icons/fi';
import { HiDesktopComputer } from 'react-icons/hi';
import { GiProcessor } from 'react-icons/gi';
import { MdLaptop } from 'react-icons/md';
import SearchBar from '../ui/SearchBar';
import CartDropdown from '../cart/CartDropdown';

const Header = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const mobileMenuRef = useRef(null);
  
  const cartItems = useSelector(state => state.cart.totalQuantity);
  const wishlistItems = useSelector(state => state.wishlist.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

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

  const mobileNavItems = [
    { name: 'Home', icon: <FiHome className="w-5 h-5" />, link: '/' },
    { name: 'Products', icon: <FiMonitor className="w-5 h-5" />, link: '/products', hasSubmenu: true },
    { name: 'Services', icon: <FiTool className="w-5 h-5" />, link: '/services' },
    { name: 'About', icon: <FiInfo className="w-5 h-5" />, link: '/about' },
    { name: 'Contact', icon: <FiMessageSquare className="w-5 h-5" />, link: '/contact' },
  ];

  const handleMobileNavClick = (item) => {
    if (item.hasSubmenu) {
      setActiveCategory(activeCategory === item.name ? null : item.name);
    } else {
      navigate(item.link);
      setShowMobileMenu(false);
    }
  };

  const handleSubcategoryClick = (link) => {
    navigate(link);
    setShowMobileMenu(false);
    setActiveCategory(null);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-dark-bg shadow-sm'
      }`}>
        
        {/* Top Bar - Hidden on mobile */}
        <div className="hidden md:block bg-primary-600 dark:bg-primary-800 text-white py-2 text-sm">
          <div className="mobile-container flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FiPhone className="mr-2 w-4 h-4" /> 1-800-TECHHUB
              </span>
              <span className="hidden lg:flex items-center">
                <FiMail className="mr-2 w-4 h-4" /> support@techhub.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden lg:block">Free Shipping on Orders Over $500</span>
              <button className="flex items-center hover:opacity-80 transition-opacity">
                <FiUser className="mr-1 w-4 h-4" /> Account
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <nav className="mobile-container py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target"
              aria-label="Toggle mobile menu">
              {showMobileMenu ? (
                <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 mr-4 lg:mr-0">
              <div className="bg-primary-600 rounded-lg p-2">
                <FiMonitor className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                TechHub<span className="text-primary-600">Pro</span>
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="nav-link">Home</Link>
              
              <div className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}>
                <button className="nav-link flex items-center">
                  Products <FiMenu className="ml-1 w-4 h-4" />
                </button>
                
                <AnimatePresence>
                  {showMegaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-[800px] mt-2 bg-white dark:bg-dark-card 
                        rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
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
                                    transition-colors text-sm">
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
                            hover:text-primary-700 text-sm">
                            View All Products →
                          </Link>
                          <div className="flex space-x-4 text-xs text-gray-500">
                            <span>🔥 Hot Deals</span>
                            <span>🆕 New Arrivals</span>
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
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Search Button - Mobile */}
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target lg:hidden"
                aria-label="Toggle search">
                <FiSearch className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              {/* Search Button - Desktop */}
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target"
                aria-label="Toggle search">
                <FiSearch className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target"
                aria-label="Toggle dark mode">
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* Wishlist - Hidden on small mobile */}
              <Link to="/wishlist" className="hidden sm:flex relative p-2 hover:bg-gray-100 
                dark:hover:bg-gray-800 rounded-lg touch-target">
                <FiHeart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                    text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                    {wishlistItems > 99 ? '99+' : wishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <div className="relative">
                <button 
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                  className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target"
                  aria-label="Toggle shopping cart">
                  <FiShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white 
                      text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                      {cartItems > 99 ? '99+' : cartItems}
                    </span>
                  )}
                </button>
                
                <AnimatePresence>
                  {showCartDropdown && (
                    <CartDropdown onClose={() => setShowCartDropdown(false)} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 lg:mt-4">
                <SearchBar onClose={() => setShowSearch(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-dark-bg 
                shadow-2xl z-50 lg:hidden overflow-y-auto safe-area-top safe-area-bottom">
              
              {/* Mobile Menu Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 
                bg-white dark:bg-dark-bg z-10">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center space-x-2" 
                    onClick={() => setShowMobileMenu(false)}>
                    <div className="bg-primary-600 rounded-lg p-2">
                      <FiMonitor className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-800 dark:text-white">
                      TechHub<span className="text-primary-600">Pro</span>
                    </span>
                  </Link>
                  <button 
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-target"
                    aria-label="Close menu">
                    <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4">
                <div className="space-y-1">
                  {mobileNavItems.map((item, index) => (
                    <div key={index}>
                      <button
                        onClick={() => handleMobileNavClick(item)}
                        className="w-full flex items-center justify-between mobile-nav-link 
                          hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        {item.hasSubmenu && (
                          <motion.div
                            animate={{ rotate: activeCategory === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        )}
                      </button>

                      {/* Submenu */}
                      <AnimatePresence>
                        {item.hasSubmenu && activeCategory === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-lg mt-2">
                            <div className="py-2">
                              {categories.map((category, catIndex) => (
                                <div key={catIndex} className="mb-4 last:mb-0">
                                  <div className="px-4 py-2 text-sm font-semibold text-gray-500 
                                    dark:text-gray-400 flex items-center">
                                    {category.icon}
                                    <span className="ml-2">{category.title}</span>
                                  </div>
                                  {category.subcategories.map((sub, subIndex) => (
                                    <button
                                      key={subIndex}
                                      onClick={() => handleSubcategoryClick(sub.link)}
                                      className="w-full text-left px-6 py-2 text-gray-700 
                                        dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                                        hover:text-primary-600 dark:hover:text-primary-400 
                                        transition-colors min-h-[44px] flex items-center">
                                      {sub.name}
                                    </button>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Mobile-only links */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-1">
                  <Link 
                    to="/wishlist" 
                    onClick={() => setShowMobileMenu(false)}
                    className="mobile-nav-link hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiHeart className="w-5 h-5" />
                      <span>Wishlist</span>
                    </div>
                    {wishlistItems > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {wishlistItems > 99 ? '99+' : wishlistItems}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <FiPhone className="w-4 h-4" />
                      <span>1-800-TECHHUB</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <FiMail className="w-4 h-4" />
                      <span>support@techhub.com</span>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;