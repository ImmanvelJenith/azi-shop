import React from 'react';

const CategoriesGrid: React.FC = () => {
  const categories = [
    { name: 'Electronics', image: '' },
    { name: 'Clothing', image: '' },
    { name: 'Books', image: '' },
    { name: 'Home Goods', image: '' },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 font-heading">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="bg-gray-100 h-48 flex items-center justify-center">
              <h3 className="text-xl font-bold text-charcoal-gray">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;
