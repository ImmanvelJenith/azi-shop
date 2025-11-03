import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, LayoutDashboard, Package, FolderTree, ShoppingBag, Users, BarChart3, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategory } from '../../context/CategoryContext';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onClose }) => {
  const location = useLocation();
  const { categoryTree, loading } = useCategory();
  const { isAdmin } = useAuth();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedAdmin, setExpandedAdmin] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const adminMenuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/categories', label: 'Categories', icon: FolderTree },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const sidebarContent = (
    <>
      {/* User Categories Section */}
      <div className="mb-6">
        <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Categories
        </h3>
        {loading ? (
          <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
        ) : (
          <nav className="mt-2">
            {categoryTree.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    isActive(`/category/${category.slug}`)
                      ? 'bg-blue-50 text-deep-blue font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <span>{category.name}</span>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <motion.div
                      animate={{
                        rotate: expandedCategories.includes(category.id) ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </button>
                <AnimatePresence>
                  {expandedCategories.includes(category.id) &&
                    category.subcategories &&
                    category.subcategories.map((subcategory) => (
                      <motion.div
                        key={subcategory.id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <Link
                          to={`/category/${subcategory.slug}`}
                          onClick={onClose}
                          className={`block pl-8 pr-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                            isActive(`/category/${subcategory.slug}`)
                              ? 'bg-blue-50 text-deep-blue font-medium'
                              : 'text-gray-600'
                          }`}
                        >
                          {subcategory.name}
                        </Link>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* Admin Section */}
      {isAdmin && (
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setExpandedAdmin(!expandedAdmin)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span>Admin</span>
            <motion.div
              animate={{ rotate: expandedAdmin ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedAdmin && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2"
              >
                {adminMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-deep-blue font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-deep-blue">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">{sidebarContent}</div>
        </motion.aside>
      </AnimatePresence>
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen overflow-y-auto">
      <div className="p-4">{sidebarContent}</div>
    </aside>
  );
};

export default Sidebar;
