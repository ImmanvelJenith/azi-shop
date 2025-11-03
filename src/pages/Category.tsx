import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService,type ProductFilters } from '../api/products';
import { categoryService } from '../api/categories';
import type { Product, Category } from '../types/type';
import ProductGrid from '../components/products/ProductGrid';
import ProductFiltersComponent from '../components/products/ProductFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCategory } from '../context/CategoryContext';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { categories } = useCategory();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryName) return;

      try {
        setLoading(true);
        const categoryData = await categoryService.getBySlug(categoryName);
        if (!categoryData) {
          setProducts([]);
          setCategory(null);
          return;
        }

        setCategory(categoryData);

        // Fetch products for this category
        const categoryFilters: ProductFilters = {
          ...filters,
          categoryId: categoryData.parent_id ? undefined : categoryData.id,
          subcategoryId: categoryData.parent_id ? categoryData.id : undefined,
        };

        const productsData = await productService.getAll(categoryFilters);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName, filters]);

  const categoryList = categories.filter((cat) => !cat.parent_id);
  const brands = Array.from(
    new Set(products.map((p) => p.brand).filter(Boolean) as string[])
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner size="lg" message="Loading category..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {category ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-gray-600">{category.description}</p>
            )}
          </>
        ) : (
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Category Not Found
          </h1>
        )}
        <p className="text-gray-600 mt-2">
          {products.length} product{products.length !== 1 ? 's' : ''} found
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
          <ProductGrid
            products={products}
            emptyMessage={`No products found in ${category?.name || 'this category'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
