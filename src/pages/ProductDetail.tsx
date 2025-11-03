import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Minus, Plus, Heart } from 'lucide-react';
import { productService } from '../api/products';
import type { Product } from '../types/type';
import Image from '../components/common/Image';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RelatedProducts from '../components/products/RelatedProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await productService.getById(id);
        if (!productData) {
          navigate('/products');
          return;
        }
        setProduct(productData);

        // Fetch related products
        if (productData.category_id) {
          const related = await productService.getByCategory(productData.category_id);
          setRelatedProducts(related.filter((p) => p.id !== id).slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login?redirect=' + window.location.pathname);
      return;
    }

    if (!product || product.stock === 0) return;

    setIsAdding(true);
    try {
      await addItem(product.id, quantity);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner size="lg" message="Loading product..." />
      </div>
    );
  }

  if (!product) return null;

  const images = product.image_url ? [product.image_url] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <Image
              src={images[selectedImage] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx
                      ? 'border-bright-orange'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {product.brand && (
            <p className="text-lg text-gray-600 mb-4">Brand: {product.brand}</p>
          )}

          <div className="mb-6">
            <p className="text-3xl font-bold text-deep-blue mb-2">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            {product.stock > 0 ? (
              <p className="text-green-600 font-medium">
                {product.stock} in stock
              </p>
            ) : (
              <p className="text-red-600 font-medium">Out of stock</p>
            )}
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Max: {product.stock} available
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-bright-orange text-white hover:bg-orange-600'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
            </button>
          </div>

          {/* Product Specs */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
            <div className="space-y-2 text-sm">
              {product.sku && (
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
              )}
              {product.category && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
};

export default ProductDetail;
