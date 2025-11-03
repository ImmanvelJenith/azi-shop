import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import type { ProductFilters } from '../../api/products';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories?: Array<{ id: string; name: string }>;
  brands?: string[];
}

const ProductFiltersComponent: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  categories = [],
  brands = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="ml-auto bg-bright-orange text-white text-xs px-2 py-1 rounded-full">
              {Object.keys(filters).length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 overflow-y-auto lg:static lg:w-auto lg:bg-transparent lg:shadow-none"
            >
              <div className="p-4 lg:p-0">
                <div className="flex items-center justify-between mb-4 lg:hidden">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Price Range
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Min Price (₹)</label>
                        <input
                          type="number"
                          value={filters.minPrice || ''}
                          onChange={(e) =>
                            updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
                          }
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Max Price (₹)</label>
                        <input
                          type="number"
                          value={filters.maxPrice || ''}
                          onChange={(e) =>
                            updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                          }
                          placeholder="No limit"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Filter */}
                  {categories.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Category</h4>
                      <select
                        value={filters.categoryId || ''}
                        onChange={(e) =>
                          updateFilter('categoryId', e.target.value || undefined)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
                      >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Brand Filter */}
                  {brands.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Brand</h4>
                      <select
                        value={filters.brand || ''}
                        onChange={(e) => updateFilter('brand', e.target.value || undefined)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
                      >
                        <option value="">All Brands</option>
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Stock Filter */}
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.inStock || false}
                        onChange={(e) =>
                          updateFilter('inStock', e.target.checked ? true : undefined)
                        }
                        className="w-4 h-4 text-bright-orange focus:ring-bright-orange rounded"
                      />
                      <span className="text-sm">In Stock Only</span>
                    </label>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop: Always show filters */}
      <div className="hidden lg:block">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6">
          {/* Same filter content as mobile */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Price Range
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min Price (₹)</label>
                <input
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Price (₹)</label>
                <input
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                  }
                  placeholder="No limit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {categories.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Category</h4>
              <select
                value={filters.categoryId || ''}
                onChange={(e) => updateFilter('categoryId', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {brands.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Brand</h4>
              <select
                value={filters.brand || ''}
                onChange={(e) => updateFilter('brand', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bright-orange focus:border-transparent"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) => updateFilter('inStock', e.target.checked ? true : undefined)}
                className="w-4 h-4 text-bright-orange focus:ring-bright-orange rounded"
              />
              <span className="text-sm">In Stock Only</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductFiltersComponent;

