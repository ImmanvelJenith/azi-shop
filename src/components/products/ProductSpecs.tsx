import React from 'react';

interface ProductSpecsProps {
  specs: {
    [key: string]: string;
  };
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">Specifications</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <tbody>
          {Object.entries(specs).map(([key, value]) => (
            <tr key={key} className="border-b last:border-b-0">
              <td className="px-4 py-2 font-semibold bg-gray-50 w-1/3">{key}</td>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecs;
