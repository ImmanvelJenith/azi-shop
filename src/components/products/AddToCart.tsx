import React, { useState } from 'react';

interface AddToCartProps {
  productId: string;
  onAddToCart: (productId: string, quantity: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    onAddToCart(productId, quantity);
    alert(`${quantity} of product ${productId} added to cart!`); // Placeholder for actual cart logic
  };

  return (
    <div className="flex items-center mb-6">
      <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mr-2">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        min="1"
        onChange={handleQuantityChange}
        className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={handleAddToCart}
        className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
