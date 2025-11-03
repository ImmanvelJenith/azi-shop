import React from 'react';
import type { Product } from '../../types/type';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false,
  emptyMessage = 'No products found' 
}) => {
  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" message="Loading products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
