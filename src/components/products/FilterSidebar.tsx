import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';

const categories = ['Electronics', 'Books', 'Home & Kitchen'];
const brands = ['Brand A', 'Brand B', 'Brand C'];

const FilterSidebar: React.FC = () => {
  const { filters, setCategory, setPriceRange, setBrand, setRating, resetFilters } = useProducts();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newCategories = checked
      ? [...filters.category, value]
      : filters.category.filter((cat) => cat !== value);
    setCategory(newCategories);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newBrands = checked
      ? [...filters.brand, value]
      : filters.brand.filter((brand) => brand !== value);
    setBrand(newBrands);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is a simplified range input. A dual-thumb slider would be better.
    setPriceRange([0, Number(e.target.value)]);
  };

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <button onClick={resetFilters} className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4">
        Reset Filters
      </button>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat} className="mb-1">
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  value={cat}
                  checked={filters.category.includes(cat)}
                  onChange={handleCategoryChange}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange[1]} // Using the upper bound for a single slider
          onChange={handlePriceRangeChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>$0</span>
          <span>${filters.priceRange[1]}+</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Brand</h3>
        <ul>
          {brands.map((brand) => (
            <li key={brand} className="mb-1">
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  value={brand}
                  checked={filters.brand.includes(brand)}
                  onChange={handleBrandChange}
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Rating</h3>
        <ul>
          {[5, 4, 3, 2, 1].map((star) => (
            <li key={star} className="mb-1">
              <label>
                <input
                  type="radio"
                  name="rating"
                  className="mr-2"
                  value={star}
                  checked={filters.rating === star}
                  onChange={handleRatingChange}
                />
                {'\u{2B50}'.repeat(star)} & Up
              </label>
            </li>
          ))}
          <li className="mb-1">
            <label>
              <input
                type="radio"
                name="rating"
                className="mr-2"
                value={0}
                checked={filters.rating === 0}
                onChange={handleRatingChange}
              />
              Any Rating
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
