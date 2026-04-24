import React from 'react';

const MidPromo = ({ leftData, rightData }) => {
  if (!leftData && !rightData) return null;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Banner */}
        {leftData && (
          <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-md bg-textBlack">
            <img src={leftData.image} alt={leftData.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="absolute inset-y-0 left-10 flex flex-col justify-center z-20">
              <h3 className="text-white text-3xl font-black mb-2">{leftData.title}</h3>
              {leftData.subtitle && <p className="text-gray-300 mb-6">{leftData.subtitle}</p>}
              {leftData.button_text && (
                <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-primaryOrange hover:text-white transition-colors w-fit">
                  {leftData.button_text}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right Banner */}
        {rightData && (
          <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-md bg-textBlack">
            <img src={rightData.image} alt={rightData.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="absolute inset-y-0 left-10 flex flex-col justify-center z-20">
              <h3 className="text-white text-3xl font-black mb-2">{rightData.title}</h3>
              {rightData.subtitle && <p className="text-gray-300 mb-6">{rightData.subtitle}</p>}
              {rightData.button_text && (
                <button className="bg-primaryOrange text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-colors w-fit">
                  {rightData.button_text}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default MidPromo;