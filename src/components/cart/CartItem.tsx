import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types/type';
import Image from '../common/Image';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) {
      await handleRemove();
      return;
    }

    setIsUpdating(true);
    try {
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeItem(item.id);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const price = item.product?.price || 0;
  const subtotal = price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-lg"
    >
      <Link to={`/products/${item.product_id}`} className="flex-shrink-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.product?.image_url}
            alt={item.product?.name || 'Product'}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <Link to={`/products/${item.product_id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-bright-orange transition-colors">
              {item.product?.name || 'Product'}
            </h3>
          </Link>
          {item.product?.brand && (
            <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
          )}
          <p className="text-lg font-bold text-deep-blue mt-2">
            ₹{price.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating || (item.product && item.quantity >= item.product.stock)}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ₹{subtotal.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;

