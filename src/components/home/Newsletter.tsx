import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <div className="bg-bright-orange text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 font-heading">Subscribe to our Newsletter</h2>
        <p className="mb-8 font-body">Get the latest updates on new products and upcoming sales.</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-md text-charcoal-gray w-1/3"
          />
          <button className="bg-deep-blue text-white p-3 rounded-r-md">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
