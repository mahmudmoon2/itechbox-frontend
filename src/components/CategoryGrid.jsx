// src/components/CategoryGrid.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const CategoryGrid = () => {
  // StoreContext থেকে ডাইনামিক ক্যাটাগরিগুলো নিয়ে আসছি
  const { categories } = useContext(StoreContext);

  // যদি ক্যাটাগরি লোড হতে সময় লাগে বা না থাকে, তাহলে কিছুই দেখাবে না (অথবা আপনি চাইলে লোডার দিতে পারেন)
  if (!categories || categories.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-black text-textBlack mb-8 tracking-tight">Shop by Category</h2>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
        {categories.slice(0, 8).map((cat) => ( // ডিজাইন ঠিক রাখতে প্রথম ৮টি ক্যাটাগরি দেখাচ্ছি
          <div key={cat.id} className="flex flex-col items-center group cursor-pointer">
            
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md group-hover:border-primaryOrange transition-all duration-300 p-4">
              {/* জ্যাঙ্গো থেকে আইকন আসলে সেটি দেখাবে, না হলে নামের প্রথম অক্ষর দেখাবে */}
              {cat.icon ? (
                <img 
                  src={cat.icon} 
                  alt={cat.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              ) : (
                <span className="text-2xl font-black text-gray-300 uppercase">
                  {cat.name.charAt(0)}
                </span>
              )}
            </div>

            <span className="mt-3 text-xs md:text-sm font-bold text-gray-600 group-hover:text-primaryOrange transition-colors capitalize text-center">
              {cat.name}
            </span>

          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;