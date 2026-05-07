// src/components/CampaignBanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignBanner = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return null;

  const handleLink = (link) => {
    if (link) link.startsWith('http') ? window.location.href = link : navigate(link);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div 
        onClick={() => handleLink(data.button_link)}
        className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden cursor-pointer group shadow-xl bg-gray-100"
      >
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
      </div>
    </section>
  );
};

export default CampaignBanner;