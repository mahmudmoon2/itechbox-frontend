// src/components/CategoryGrid.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const CategoryGrid = () => {
  const { categories } = useContext(StoreContext);
  const navigate = useNavigate();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-black text-textBlack mb-8 tracking-tight">Shop by Category</h2>
      
      {/* গ্রিডের বদলে Flex Wrap ব্যবহার করা হয়েছে। 
        এতে যতোই ক্যাটাগরি আসুক, ৮টার পর অটোমেটিক নিচে নেমে যাবে এবং justify-center এর কারণে সুন্দর করে মাঝখানে থাকবে। 
      */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-x-10 md:gap-y-8">
        
        {/* slice(0, 8) রিমুভ করা হয়েছে, তাই এখন জ্যাঙ্গো থেকে আসা সবগুলো ক্যাটাগরি লুপ হবে */}
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => navigate(`/category/${cat.slug}`)}
            className="flex flex-col items-center group cursor-pointer w-[75px] md:w-[100px]" // ফিক্সড উইডথ যাতে এলাইনমেন্ট ঠিক থাকে
          >
            
            {/* ছবির মতো হালকা ব্যাকগ্রাউন্ড (bg-gray-50) এবং সুন্দর হোভার ইফেক্ট */}
            <div className="w-16 h-16 md:w-[90px] md:h-[90px] bg-gray-50 hover:bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md group-hover:border group-hover:border-primaryOrange transition-all duration-300 p-4">
              
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

            <span className="mt-3 text-[11px] md:text-sm font-bold text-gray-600 group-hover:text-primaryOrange transition-colors capitalize text-center leading-tight">
              {cat.name}
            </span>

          </div>
        ))}

      </div>
    </section>
  );
};

export default CategoryGrid;