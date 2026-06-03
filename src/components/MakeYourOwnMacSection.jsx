// src/components/MakeYourOwnMacSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings2, Zap, MonitorPlay } from 'lucide-react';

const MakeYourOwnMacSection = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 lg:px-8 my-10">
      <div 
        className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 shadow-xl border border-gray-200/50 group cursor-pointer transition-all duration-500 hover:shadow-2xl" 
        onClick={() => navigate('/build-your-mac')}
      >
        
        {/* Background Glowing Effects (Light Version) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primaryOrange rounded-full blur-[150px] opacity-10 group-hover:opacity-25 transition-opacity duration-700"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-300 rounded-full blur-[150px] opacity-10 group-hover:opacity-25 transition-opacity duration-700"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/70 shadow-sm">
              <Settings2 className="w-4 h-4 text-primaryOrange" />
              <span className="text-xs font-bold tracking-widest uppercase text-gray-600">Pro Studio Setup</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-gray-800">
              Make Your <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryOrange to-amber-500">Own Mac.</span>
            </h2>
            
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-lg mx-auto md:mx-0">
              Tailor your workstation exactly to your needs. Choose your chip, memory, and storage to build the ultimate powerhouse.
            </p>
            
            <button className="bg-gradient-to-r from-primaryOrange to-amber-500 hover:from-primaryOrange/90 hover:to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
              Start Building <MonitorPlay className="w-5 h-5" />
            </button>
          </div>

          {/* Abstract Mac Illustration (with light overlay) */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
            <img 
              src="https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=1232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Custom Mac" 
              className="w-3/4 object-contain transform group-hover:scale-105 transition-transform duration-700 drop-shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MakeYourOwnMacSection;