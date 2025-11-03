import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { type ProductFilters, productService } from '../api/products';
import type { Product } from '../types/type';
import ProductGrid from '../components/products/ProductGrid';
import ProductFiltersComponent from '../components/products/ProductFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCategory } from '../context/CategoryContext';

const Products: React.FC = () => {
  const { categories } = useCategory();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getAll(filters);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">
          {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} available`}
        </p>
      </motion.div>

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
          {loading ? (
            <LoadingSpinner size="lg" message="Loading products..." />
          ) : (
            <ProductGrid
              products={products}
              emptyMessage="No products found. Try adjusting your filters."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
