import React from 'react';
import type { Product } from '../../types/type';
import ProductCard from './ProductCard';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { motion } from 'framer-motion';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products, 
  title = 'Related Products' 
}) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
