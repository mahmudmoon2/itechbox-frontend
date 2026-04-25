/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/Collection.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const Collection = ({ type: propType }) => {
  const { type: paramType, slug } = useParams();
  
  // সেফটির জন্য ডিফল্ট ভ্যালু হিসেবে ফাঁকা অ্যারে [] দেওয়া হয়েছে
  const { products = [], homeSections = [] } = useContext(StoreContext);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState('All Products');

  useEffect(() => {
    // 🛠️ ফিক্স: URL এর paramType কে আগে প্রায়োরিটি দেওয়া হলো
    const currentType = paramType || propType;

    if (currentType === 'exclusive' || currentType === 'exclusive-products')  {
      setFilteredProducts(products.filter(p => p.is_exclusive));
      setPageTitle('Exclusive Products');

    // রাউট থেকে top-deals বা top_deal যাই আসুক, কাজ করবে
    } else if (currentType === 'top-deals' || currentType === 'top_deal') {
      setFilteredProducts(products.filter(p => p.is_top_deal));
      setPageTitle('Top Deals');

    } else if (currentType === 'all') {
      setFilteredProducts(products);
      setPageTitle('All Collection');

    } else if (slug) { 
      const catProducts = products.filter(p => 
        p.category?.slug === slug || p.category_name?.toLowerCase() === slug.toLowerCase()
      );
      setFilteredProducts(catProducts);
      setPageTitle(`${slug.replace('-', ' ')} Collection`);

    } else if (currentType) { 
      const section = homeSections.find(s => 
        s.title.toLowerCase().replace(/\s+/g, '-') === currentType
      );
      if (section) {
        setFilteredProducts(section.products);
        setPageTitle(section.title);
      } else {
        setFilteredProducts([]);
        setPageTitle('Collection Not Found');
      }
    }
  }, [propType, paramType, slug, products, homeSections]);

  return (
    <main className="min-h-screen bg-bgOffWhite pt-8 pb-20">
      <div className="container mx-auto px-4">
        
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl md:text-4xl font-black text-textBlack uppercase italic tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Showing {filteredProducts.length} items
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <span className="text-6xl mb-4">🛒</span>
            <h2 className="text-2xl font-bold text-gray-500">No products found here!</h2>
            <p className="text-gray-400">Try checking another category.</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default Collection;