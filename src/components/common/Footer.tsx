import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-gray text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-bright-orange">Azi Accessories</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium Indian bike accessories. Quality products for every rider.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-bright-orange transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-bright-orange transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-bright-orange transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-bright-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-bright-orange transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-bright-orange transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-bright-orange transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-bright-orange transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-bright-orange transition-colors">
                  Helmets
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-bright-orange transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-bright-orange transition-colors">
                  Safety Gear
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-bright-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">support@aziaccessories.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-bright-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">+91 123-456-7890</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-bright-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Mumbai, Maharashtra<br />India
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-300 text-sm">
              &copy; 2025 Azi Accessories. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-bright-orange transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-bright-orange transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-bright-orange transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

