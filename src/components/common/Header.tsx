import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut, isAdmin, userProfile } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-deep-blue">
          Azi Accessories
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
          <Search className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent focus:outline-none ml-2 w-full"
          />
        </form>

        {/* Navigation & Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="text-charcoal-gray w-6 h-6" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-bright-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                >
                  {count > 9 ? '9+' : count}
                </motion.span>
              )}
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User className="text-charcoal-gray w-6 h-6" />
                  <ChevronDown className="text-gray-500 w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold">{userProfile?.full_name || user.email}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-deep-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="text-charcoal-gray w-6 h-6" />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-bright-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search className="text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none ml-2 w-full"
                />
              </form>
              
              <nav className="flex flex-col space-y-3">
                <Link 
                  to="/products" 
                  className="text-charcoal-gray hover:text-bright-orange py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="text-charcoal-gray hover:text-bright-orange py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="text-charcoal-gray hover:text-bright-orange py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="text-left text-red-600 hover:text-red-700 py-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-charcoal-gray hover:text-bright-orange py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
