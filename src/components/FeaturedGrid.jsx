import React from 'react';

const FeaturedGrid = ({ large, smallTop, smallBottom }) => {
  if (!large && !smallTop && !smallBottom) return null;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
        
        {/* Big Vertical Card */}
        {large && (
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-md group cursor-pointer bg-textBlack">
             <img src={large.image} alt={large.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
             <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-4xl font-black text-white mb-2">{large.title}</h3>
                {large.subtitle && <p className="text-gray-200">{large.subtitle}</p>}
             </div>
          </div>
        )}

        {/* Small Stacked Cards */}
        <div className="flex flex-col gap-6">
           {smallTop && (
             <div className="flex-1 relative rounded-3xl overflow-hidden shadow-md group cursor-pointer bg-textBlack">
                <img src={smallTop.image} alt={smallTop.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
                <div className="absolute top-8 left-8 z-20 pr-4">
                  <h4 className="text-2xl font-bold text-white mb-1">{smallTop.title}</h4>
                  {smallTop.subtitle && <p className="text-sm text-gray-300">{smallTop.subtitle}</p>}
                </div>
             </div>
           )}
           
           {smallBottom && (
             <div className="flex-1 relative rounded-3xl overflow-hidden shadow-md group cursor-pointer bg-textBlack">
                <img src={smallBottom.image} alt={smallBottom.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
                <div className="absolute top-8 left-8 z-20 pr-4">
                  <h4 className="text-2xl font-bold text-white mb-1">{smallBottom.title}</h4>
                  {smallBottom.subtitle && <p className="text-sm text-gray-300">{smallBottom.subtitle}</p>}
                </div>
             </div>
           )}
        </div>

      </div>
    </section>
  );
};

export default FeaturedGrid;