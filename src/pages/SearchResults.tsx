import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { productService,type ProductFilters } from '../api/products';
import type { Product } from '../types/type';
import ProductGrid from '../components/products/ProductGrid';
import ProductFiltersComponent from '../components/products/ProductFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCategory } from '../context/CategoryContext';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { categories } = useCategory();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({ search: query });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);
        const searchFilters: ProductFilters = {
          ...filters,
          search: query || filters.search,
        };
        const results = await productService.getAll(searchFilters);
        setProducts(results);
      } catch (error) {
        console.error('Error searching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      setFilters((prev) => ({ ...prev, search: query }));
    }
    searchProducts();
  }, [query]);

  useEffect(() => {
    const fetchWithFilters = async () => {
      try {
        setLoading(true);
        const results = await productService.getAll(filters);
        setProducts(results);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWithFilters();
  }, [filters]);

  const categoryList = categories.filter((cat) => !cat.parent_id);
  const brands = Array.from(
    new Set(products.map((p) => p.brand).filter(Boolean) as string[])
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <SearchIcon className="w-6 h-6 text-gray-600" />
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        </div>
        {query ? (
          <p className="text-gray-600">
            Showing results for: <span className="font-semibold">"{query}"</span>
          </p>
        ) : (
          <p className="text-gray-600">Please enter a search query</p>
        )}
        {!loading && (
          <p className="text-gray-600 mt-2">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        )}
      </motion.div>

      {loading ? (
        <LoadingSpinner size="lg" message="Searching products..." />
      ) : products.length === 0 && query ? (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No products found</p>
          <p className="text-gray-400">Try adjusting your search terms or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              categories={categoryList}
              brands={brands}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={products}
              emptyMessage="No products match your search criteria"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
