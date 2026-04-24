import React from 'react';
import { Link } from 'react-router-dom';

const CampaignBanner = ({ data }) => {
  if (!data) return null; // জ্যাঙ্গো থেকে ডেটা না আসা পর্যন্ত হাইড থাকবে

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden cursor-pointer group shadow-lg bg-textBlack">
        
        <img 
          src={data.image} 
          alt={data.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-10 left-10 md:left-20 z-20">
          {data.button_text && (
            <span className="bg-primaryOrange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              {data.button_text}
            </span>
          )}
          <h2 className="text-white text-3xl md:text-5xl font-black mb-4 uppercase italic leading-tight">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-gray-300 text-lg max-w-md hidden md:block">
              {data.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CampaignBanner;