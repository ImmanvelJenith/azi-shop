import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <img src={mainImage} alt={productName} className="w-full max-h-96 object-contain rounded-lg shadow-md" />
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${productName} thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === image ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
