// src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { StoreContext } from '../context/StoreContext'; // Context ইমপোর্ট
import { useNavigate } from 'react-router-dom'; // রাউটিং এর জন্য ইমপোর্ট

const ProductCard = ({ product }) => {
  // Context থেকে addToCart ফাংশন নিয়ে আসলাম
  const { addToCart } = useContext(StoreContext);
  const navigate = useNavigate(); // navigate ইনিশিয়ালাইজ করলাম

  // যদি প্রোডাক্টের ডাটা না আসে তবে ক্র্যাশ এড়ানোর জন্য
  if (!product) return null;

  // জ্যাঙ্গো থেকে আসা ইমেজ চেক করা
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].image 
    : null;

  // কার্টে অ্যাড করার ফাংশন (যাতে ডিটেইলস পেজে রিডাইরেক্ট না হয়)
  const handleAddToCart = (e) => {
    e.stopPropagation(); // এই ইভেন্টটি কার্ডের মূল onClick কে ব্লক করবে
    addToCart(product);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.slug}`)} // কার্ডে ক্লিক করলে ডিটেইলস পেজে যাবে
      className="cursor-pointer bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-xl hover:border-primaryOrange transition-all duration-300 group flex flex-col justify-between h-full"
    >
      
      {/* Product Image Area */}
      <div className="relative aspect-square mb-4 bg-bgCloud rounded-xl overflow-hidden flex items-center justify-center">
        
        {/* Discount Badge (যদি জ্যাঙ্গোতে ডিসকাউন্ট লজিক থাকে) */}
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
          onClick={handleAddToCart} // আপডেট করা হ্যান্ডলার বসানো হলো
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
        <h3 className="font-bold text-sm text-textBlack mb-2 line-clamp-2 hover:text-primaryOrange transition-colors">
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