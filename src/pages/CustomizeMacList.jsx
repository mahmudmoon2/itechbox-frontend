// src/pages/CustomizeMacList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { Settings2, Cpu, ChevronRight } from 'lucide-react';

const CustomizeMacList = () => {
  const { products = [] } = useContext(StoreContext);
  const navigate = useNavigate();
  const [macs, setMacs] = useState([]);

  useEffect(() => {
    window.scrollTo(0,0);
    // যে প্রোডাক্টগুলোর is_customizable_mac ট্রু, শুধু সেগুলো আনবে
    // (আপাতত টেস্টিংয়ের জন্য ডামি ফিল্টার দিয়েছি, ব্যাকএন্ড রেডি হলে p.is_customizable_mac ইউজ করবেন)
    const customizableMacs = products.filter(p => p.is_customizable_mac || p.name.toLowerCase().includes('mac'));
    setMacs(customizableMacs);
  }, [products]);

  return (
    <main className="min-h-screen bg-bgOffWhite pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-textBlack tracking-tight mb-6">
            Choose your <span className="text-primaryOrange">Mac.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            Select a base model below to start customizing your processor, memory, storage, and more.
          </p>
        </div>

        {/* Product Grid */}
        {macs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {macs.map(mac => (
              <div 
                key={mac.id} 
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-primaryOrange/30 transition-all duration-500 group flex flex-col"
              >
                <div className="h-48 md:h-64 flex items-center justify-center mb-8 relative">
                  <img 
                    src={mac.images?.[0]?.image || mac.image} 
                    alt={mac.name} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="text-center mb-6 flex-grow">
                  <h3 className="text-2xl font-bold text-textBlack mb-2">{mac.name}</h3>
                  <p className="text-gray-500 font-medium text-sm">Starts from</p>
                  <p className="text-3xl font-black text-textBlack mt-1">
                    ৳{Number(mac.discount_price || mac.price).toLocaleString()}
                  </p>
                </div>

                <button 
                  onClick={() => navigate(`/build-your-mac/${mac.slug}`)}
                  className="w-full bg-gray-900 text-white hover:bg-primaryOrange px-6 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <Settings2 className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                  Customize & Buy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 font-bold text-xl">
            Loading customizable Macs...
          </div>
        )}

      </div>
    </main>
  );
};

export default CustomizeMacList;