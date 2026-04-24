// src/components/Brands.jsx
import React from 'react';

const Brands = () => {
  // ডামি ব্র্যান্ড ডেটা
  const brands = ['Apple', 'Samsung', 'Google', 'Sony', 'OnePlus', 'Xiaomi', 'DJI', 'Marshall'];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-textBlack tracking-tight">Popular Brands</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {brands.map((brand, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-xl py-6 flex items-center justify-center cursor-pointer hover:border-primaryOrange hover:shadow-md transition-all group"
          >
            <span className="font-bold text-gray-500 group-hover:text-primaryOrange transition-colors">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;