import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Image from '../common/Image';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-deep-blue to-blue-700 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-heading">
              Premium Bike Accessories
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-blue-100 font-body">
              Your one-stop shop for quality Indian bike accessories. 
              From helmets to safety gear, we've got everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-bright-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-deep-blue transition-colors"
              >
                Explore
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1558980664-2506fca6bfc2?w=600&h=600&fit=crop"
                alt="Bike accessories"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
