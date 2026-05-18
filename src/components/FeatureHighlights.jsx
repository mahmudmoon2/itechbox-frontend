// src/components/FeatureHighlights.jsx
import React from 'react';
import { Briefcase, PackageCheck, BadgePercent, ArrowLeftRight, Truck, ShieldCheck } from 'lucide-react';

const FeatureHighlights = () => {
  const features = [
    { 
      icon: Briefcase, 
      text: 'Corporate Deals', 
      color: 'text-[#3b82f6]' // Blue
    },
    { 
      icon: PackageCheck, 
      text: 'Official Product', 
      color: 'text-[#8b5cf6]' // Purple
    },
    { 
      icon: BadgePercent, 
      text: '0% EMI', 
      color: 'text-[#eab308]' // Yellow/Gold
    },
    { 
      icon: ArrowLeftRight, 
      text: 'Exchange', 
      color: 'text-gray-800' // Dark Gray
    },
    { 
      icon: Truck, 
      text: 'Fastest Delivery', 
      color: 'text-[#ef4444]' // Red
    },
    { 
      icon: ShieldCheck, 
      text: '100% Secure Payment', 
      color: 'text-[#10b981]' // Green
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-8 font-sans">
      
      {/* 3D Box Container with subtle shadow and border */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 py-5 px-6 lg:px-10 flex flex-row items-center justify-between overflow-x-auto scrollbar-hide gap-8 lg:gap-0 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.09)]">
        
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <React.Fragment key={index}>
              {/* Feature Item */}
              <div className="flex items-center gap-3.5 flex-shrink-0 group cursor-default">
                <div className="transition-transform duration-300 group-hover:-translate-y-1 bg-gray-50 p-2.5 rounded-full border border-gray-100 group-hover:bg-white group-hover:shadow-sm">
                  <Icon className={`w-6 h-6 ${feature.color}`} strokeWidth={1.5} />
                </div>
                <span className="text-[#1e293b] font-bold text-[14px] md:text-[15px] whitespace-nowrap">
                  {feature.text}
                </span>
              </div>

              {/* Vertical Divider (খুব চিকন ও হালকা কালারের দাগ) */}
              {index !== features.length - 1 && (
                <div className="hidden lg:block w-[1px] h-10 bg-gray-200 shrink-0"></div>
              )}
            </React.Fragment>
          );
        })}

      </div>
      
    </section>
  );
};

export default FeatureHighlights;