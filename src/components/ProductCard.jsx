// src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { StoreContext } from '../context/StoreContext'; // Context ইমপোর্ট

const ProductCard = ({ product }) => {
  // Context থেকে addToCart ফাংশন নিয়ে আসলাম
  const { addToCart } = useContext(StoreContext);

  // জ্যাঙ্গো থেকে আসা ইমেজ চেক করা
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].image 
    : null;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-xl hover:border-primaryOrange transition-all duration-300 group flex flex-col justify-between h-full">
      
      {/* Product Image Area */}
      <div className="relative aspect-square mb-4 bg-bgCloud rounded-xl overflow-hidden flex items-center justify-center">
        
        {/* Discount Badge (যদি জ্যাঙ্গোতে ডিসকাউন্ট লজিক থাকে, আপাতত এটা ম্যানুয়ালি হাইড বা শো করাতে পারেন) */}
        {product.discount_price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
            SALE
          </div>
        )}
        
        {/* Dynamic Image */}
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="text-gray-400 font-medium group-hover:scale-110 transition-transform duration-500">
            📷 No Image
          </div>
        )}
        
        {/* Quick Add to Cart Button */}
        <button 
          onClick={() => addToCart(product)} // বাটনে ক্লিক করলে কার্টে অ্যাড হবে
          className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-textBlack hover:text-white hover:bg-primaryOrange transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <p className="text-xs text-gray-500 font-semibold mb-1">
          {product.brand_name || product.brand} {/* জ্যাঙ্গো API-এর নামের সাথে মিলানো */}
        </p>
        <h3 className="font-bold text-sm text-textBlack mb-2 line-clamp-2 hover:text-primaryOrange cursor-pointer transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-2 flex items-center gap-2">
          {/* Price Display Logic */}
          <span className="font-extrabold text-lg text-primaryOrange">
            ৳{Number(product.discount_price ? product.discount_price : product.price).toLocaleString()}
          </span>
          {product.discount_price && (
            <span className="text-xs text-gray-400 line-through font-medium">
              ৳{Number(product.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;