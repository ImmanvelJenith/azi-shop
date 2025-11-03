import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';

interface ImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallback?: string;
  lazy?: boolean;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallback,
  lazy = true 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultFallback = 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop';
  const imageSrc = error ? (fallback || defaultFallback) : (src || defaultFallback);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <ImageOff className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <motion.img
        src={imageSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

export default Image;

