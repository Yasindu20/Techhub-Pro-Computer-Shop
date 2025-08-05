import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiMail, FiPhone, FiMapPin, FiCreditCard
} from 'react-icons/fi';
import { SiVisa, SiMastercard, SiPaypal, SiApplepay } from 'react-icons/si';

const Footer = () => {
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

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 rounded-lg p-2">
                <FiMonitor className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                TechHub<span className="text-primary-400">Pro</span>
              </span>
            </Link>
            <p className="mb-4 text-gray-400">
              Your trusted partner for all computing needs. From gaming rigs to business solutions, 
              we've got you covered with top-quality products and expert services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="social-icon">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="social-icon">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="social-icon">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="social-icon">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <Link to={link.link} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.link} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link to={link.link} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link to={link.link} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <FiPhone className="w-5 h-5 text-primary-400" />
            <div>
              <p className="text-sm text-gray-500">Call Us</p>
              <p className="font-semibold text-white">1-800-TECHHUB</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FiMail className="w-5 h-5 text-primary-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-white">support@techhub.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FiMapPin className="w-5 h-5 text-primary-400" />
            <div>
              <p className="text-sm text-gray-500">Visit Us</p>
              <p className="font-semibold text-white">123 Tech Street, Silicon Valley</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © 2024 TechHub Pro. All rights reserved. | 
              <Link to="/privacy" className="ml-2 hover:text-white">Privacy Policy</Link> | 
              <Link to="/terms" className="ml-2 hover:text-white">Terms of Service</Link>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 mr-2">We Accept:</span>
              <SiVisa className="w-10 h-6 text-gray-400" />
              <SiMastercard className="w-10 h-6 text-gray-400" />
              <SiPaypal className="w-10 h-6 text-gray-400" />
              <SiApplepay className="w-10 h-6 text-gray-400" />
              <FiCreditCard className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          @apply text-gray-400 hover:text-white transition-colors;
        }
        
        .social-icon {
          @apply p-2 bg-gray-800 rounded-lg hover:bg-primary-600 
            transition-all duration-300 inline-flex;
        }
      `}</style>
    </footer>
  );
};

export default Footer;