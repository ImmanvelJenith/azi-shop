import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping = 0,
  tax = 0,
  onCheckout,
}) => {
  const total = subtotal + shipping + tax;
  const freeShippingThreshold = 1000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `₹${shipping.toLocaleString('en-IN')}`
            )}
          </span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{tax.toLocaleString('en-IN')}</span>
          </div>
        )}
        {remainingForFreeShipping > 0 && remainingForFreeShipping < freeShippingThreshold && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Add ₹{remainingForFreeShipping.toLocaleString('en-IN')} more for free shipping!
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-deep-blue">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {onCheckout ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCheckout}
          className="w-full bg-bright-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      ) : (
        <Link
          to="/checkout"
          className="block w-full bg-bright-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center flex items-center justify-center gap-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      )}

      <Link
        to="/products"
        className="block mt-4 text-center text-gray-600 hover:text-bright-orange transition-colors text-sm"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;

