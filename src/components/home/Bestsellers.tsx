import React from 'react';

const Bestsellers: React.FC = () => {
  const products = [
    { name: 'Product 1', price: '$19.99' },
    { name: 'Product 2', price: '$29.99' },
    { name: 'Product 3', price: '$39.99' },
    { name: 'Product 4', price: '$49.99' },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 font-heading">Our Bestsellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.name} className="bg-white p-6 shadow-md">
              <div className="bg-gray-200 h-40 mb-4"></div>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-charcoal-gray">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
