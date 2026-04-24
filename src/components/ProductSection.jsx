// src/components/ProductSection.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ title }) => {
  // ডামি প্রোডাক্ট ডেটা
  const dummyProducts = [
    { id: 1, name: "iPhone 16 Pro Max - 256GB", brand: "Apple", price: 155000, oldPrice: 165000, discount: 6 },
    { id: 2, name: "Samsung Galaxy S24 Ultra - 512GB", brand: "Samsung", price: 142000, oldPrice: null, discount: 0 },
    { id: 3, name: "Sony WH-1000XM5 Wireless Headphones", brand: "Sony", price: 38500, oldPrice: 42000, discount: 8 },
    { id: 4, name: "MacBook Air M3 - 16GB/512GB", brand: "Apple", price: 175000, oldPrice: null, discount: 0 },
    { id: 5, name: "Google Pixel 8 Pro - 128GB", brand: "Google", price: 95000, oldPrice: 105000, discount: 9 },
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-textBlack tracking-tight">{title}</h2>
        <button className="text-sm font-bold text-primaryOrange hover:underline">
          View All
        </button>
      </div>

      {/* Grid Layout for Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;