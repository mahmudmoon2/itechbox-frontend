// src/components/MidPromo.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MidPromo = ({ leftData, rightData }) => {
  const navigate = useNavigate();
  if (!leftData && !rightData) return null;

  const handleLink = (link) => {
    if (link) link.startsWith('http') ? window.location.href = link : navigate(link);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Banner */}
        {leftData && (
          <div 
            onClick={() => handleLink(leftData.button_link)}
            className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-lg bg-gray-100"
          >
            <img 
              src={leftData.image} 
              alt={leftData.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        )}

        {/* Right Banner */}
        {rightData && (
          <div 
            onClick={() => handleLink(rightData.button_link)}
            className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-lg bg-gray-100"
          >
            <img 
              src={rightData.image} 
              alt={rightData.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default MidPromo;