import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '../../types/type';
import Image from '../common/Image';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (product.stock === 0) return;

    setIsAdding(true);
    try {
      await addItem(product.id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold bg-red-500 px-4 py-2 rounded">
                Out of Stock
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.stock > 0 && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                In Stock
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-bright-orange transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-deep-blue">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            {product.stock > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {product.stock} in stock
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-bright-orange text-white hover:bg-orange-600'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isAdding ? 'Adding...' : 'Add'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
