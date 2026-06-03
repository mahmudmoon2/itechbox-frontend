// src/components/FeatureHighlights.jsx
import React from 'react';
import { Briefcase, PackageCheck, Truck, MonitorSmartphone, CloudCog, Server } from 'lucide-react';

const FeatureHighlights = () => {
  const features = [
    { icon: Briefcase, text: 'Corporate Deals' },
    { icon: PackageCheck, text: 'Official Product' },
    { icon: Truck, text: 'Fastest Delivery' },
    { icon: MonitorSmartphone, text: 'IT Consultancy' },
    { icon: CloudCog, text: 'Environment Setup' },
    { icon: Server, text: 'Server Setup' },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-10 font-['Montserrat']">
      {/* Super light orange background container */}
      <div className="relative bg-gradient-to-br from-orange-50/60 via-orange-50/30 to-amber-50/40 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-100/60 p-6 md:p-8 transition-all duration-500 hover:shadow-xl">
        
        {/* Grid layout - each feature as a card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            // different icon colors for variety
            const iconColors = [
              'text-blue-500', 'text-purple-500', 'text-red-500',
              'text-orange-500', 'text-emerald-500', 'text-indigo-500'
            ];
            return (
              <div
                key={idx}
                className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 cursor-default"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  {/* Icon with circular gradient background */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative bg-white p-3 rounded-full shadow-sm group-hover:shadow-md transition-all">
                      <Icon className={`w-8 h-8 ${iconColors[idx]}`} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-gray-800 font-bold text-base md:text-lg tracking-wide uppercase">
                    {feature.text}
                  </h3>
                  
                  {/* Decorative underline on hover */}
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primaryOrange to-amber-400 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-12"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: subtle corner decoration */}
        <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-20 h-20 bg-gradient-to-tr from-amber-200/30 to-transparent rounded-full blur-2xl pointer-events-none"></div>
      </div>
    </section>
  );
};

export default FeatureHighlights;