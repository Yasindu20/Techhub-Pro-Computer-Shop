import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiMail, FiPhone, FiMapPin, FiCreditCard, FiMonitor,
  FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { SiVisa, SiMastercard, SiPaypal, SiApplepay } from 'react-icons/si';

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const footerLinks = {
    shop: [
      { name: 'Gaming PCs', link: '/products/gaming-pcs' },
      { name: 'Laptops', link: '/products/laptops' },
      { name: 'Components', link: '/products/components' },
      { name: 'Peripherals', link: '/products/peripherals' },
      { name: 'Deals', link: '/deals' },
    ],
    services: [
      { name: 'Computer Repair', link: '/services' },
      { name: 'Custom PC Building', link: '/services' },
      { name: 'Tech Support', link: '/services' },
      { name: 'Business Solutions', link: '/services' },
      { name: 'Warranty Services', link: '/warranty' },
    ],
    company: [
      { name: 'About Us', link: '/about' },
      { name: 'Contact', link: '/contact' },
      { name: 'Careers', link: '/careers' },
      { name: 'Blog', link: '/blog' },
      { name: 'Press', link: '/press' },
    ],
    support: [
      { name: 'Help Center', link: '/help' },
      { name: 'Shipping Info', link: '/shipping' },
      { name: 'Returns', link: '/returns' },
      { name: 'Order Tracking', link: '/tracking' },
      { name: 'FAQs', link: '/faqs' },
    ],
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FooterSection = ({ title, links, sectionKey }) => {
    const isExpanded = expandedSections[sectionKey];

    return (
      <div className="md:block">
        {/* Mobile Accordion Header */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className="md:hidden w-full flex items-center justify-between py-4 text-left 
            border-b border-gray-700 touch-target">
          <h3 className="font-semibold text-white text-lg">{title}</h3>
          {isExpanded ? (
            <FiChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <FiChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {/* Desktop Header */}
        <h3 className="hidden md:block font-semibold text-white mb-4 text-lg">
          {title}
        </h3>

        {/* Links - Always visible on desktop, accordion on mobile */}
        <AnimatePresence>
          {(isExpanded || window.innerWidth >= 768) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:block overflow-hidden">
              <ul className="space-y-3 pb-4 md:pb-0">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.link} 
                      className="footer-link text-gray-300 hover:text-white transition-colors 
                        text-base block py-1 touch-target">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="mobile-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-600 rounded-lg p-2">
                <FiMonitor className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                TechHub<span className="text-primary-400">Pro</span>
              </span>
            </Link>
            <p className="mb-6 text-gray-400 text-base leading-relaxed">
              Your trusted partner for all computing needs. From gaming rigs to business solutions, 
              we've got you covered with top-quality products and expert services.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon p-3 bg-gray-800 rounded-lg hover:bg-primary-600 
                  transition-all duration-300 touch-target">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon p-3 bg-gray-800 rounded-lg hover:bg-primary-600 
                  transition-all duration-300 touch-target">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon p-3 bg-gray-800 rounded-lg hover:bg-primary-600 
                  transition-all duration-300 touch-target">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="social-icon p-3 bg-gray-800 rounded-lg hover:bg-primary-600 
                  transition-all duration-300 touch-target">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          <FooterSection title="Shop" links={footerLinks.shop} sectionKey="shop" />
          <FooterSection title="Services" links={footerLinks.services} sectionKey="services" />
          <FooterSection title="Company" links={footerLinks.company} sectionKey="company" />
          <FooterSection title="Support" links={footerLinks.support} sectionKey="support" />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
            <FiPhone className="w-6 h-6 text-primary-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Call Us</p>
              <p className="font-semibold text-white text-lg">1-800-TECHHUB</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
            <FiMail className="w-6 h-6 text-primary-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-white text-lg">support@techhub.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
            <FiMapPin className="w-6 h-6 text-primary-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Visit Us</p>
              <p className="font-semibold text-white text-lg">123 Tech Street, Silicon Valley</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="mobile-container">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 text-center md:text-left">
              © 2024 TechHub Pro. All rights reserved. | 
              <Link to="/privacy" className="ml-2 hover:text-white transition-colors">Privacy Policy</Link> | 
              <Link to="/terms" className="ml-2 hover:text-white transition-colors">Terms of Service</Link>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 mr-2 hidden sm:block">We Accept:</span>
              <div className="flex items-center space-x-2">
                <SiVisa className="w-8 h-5 text-gray-400" />
                <SiMastercard className="w-8 h-5 text-gray-400" />
                <SiPaypal className="w-8 h-5 text-gray-400" />
                <SiApplepay className="w-8 h-5 text-gray-400" />
                <FiCreditCard className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;