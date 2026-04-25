/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/Search.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const Search = () => {
  // URL থেকে সার্চের কিওয়ার্ডটি (যেমন: ?q=apple) বের করে আনছি
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; 
  
  const { products = [] } = useContext(StoreContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      
      // প্রোডাক্টের নাম, ক্যাটাগরি, ব্র্যান্ড বা ডেসক্রিপশনে সার্চের শব্দটি আছে কি না চেক করছি
      const results = products.filter(product => 
        product.name?.toLowerCase().includes(lowerCaseQuery) ||
        product.category_name?.toLowerCase().includes(lowerCaseQuery) ||
        product.brand_name?.toLowerCase().includes(lowerCaseQuery) ||
        product.description?.toLowerCase().includes(lowerCaseQuery)
      );
      
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  return (
    <main className="min-h-screen bg-bgOffWhite pt-8 pb-20">
      <div className="container mx-auto px-4">
        
        {/* পেজের হেডার */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl md:text-4xl font-black text-textBlack uppercase tracking-tight">
            Search Results
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            {query ? `Showing results for "${query}"` : 'Please enter a search term'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {filteredProducts.length} items found
          </p>
        </div>

        {/* সার্চ রেজাল্ট গ্রিড */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <span className="text-6xl mb-4 text-gray-300">🔍</span>
            <h2 className="text-2xl font-bold text-gray-500 text-center">No results found!</h2>
            <p className="text-gray-400 text-center mt-2">Try checking your spelling or searching for another brand or category.</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default Search;