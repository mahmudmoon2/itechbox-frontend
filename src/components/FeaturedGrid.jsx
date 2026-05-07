// src/components/FeaturedGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedGrid = ({ large, smallTop, smallBottom }) => {
  const navigate = useNavigate();
  if (!large && !smallTop && !smallBottom) return null;

  const handleLink = (link) => {
    if (link) link.startsWith('http') ? window.location.href = link : navigate(link);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[700px]">
        
        {/* Big Vertical Card (Left) */}
        {large && (
          <div 
            onClick={() => handleLink(large.button_link)}
            className="md:col-span-2 relative h-[400px] md:h-full rounded-3xl overflow-hidden shadow-xl group cursor-pointer bg-gray-100"
          >
             <img 
               src={large.image} 
               alt={large.title} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
             />
          </div>
        )}

        {/* Small Stacked Cards (Right) */}
        <div className="flex flex-col gap-6 h-[600px] md:h-full">
           {smallTop && (
             <div 
               onClick={() => handleLink(smallTop.button_link)}
               className="flex-1 relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer bg-gray-100"
             >
                <img 
                  src={smallTop.image} 
                  alt={smallTop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
             </div>
           )}
           
           {smallBottom && (
             <div 
               onClick={() => handleLink(smallBottom.button_link)}
               className="flex-1 relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer bg-gray-100"
             >
                <img 
                  src={smallBottom.image} 
                  alt={smallBottom.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
             </div>
           )}
        </div>

      </div>
    </section>
  );
};

export default FeaturedGrid;