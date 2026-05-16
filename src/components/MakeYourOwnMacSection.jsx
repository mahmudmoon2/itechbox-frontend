// src/components/MakeYourOwnMacSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings2, Zap, MonitorPlay } from 'lucide-react';

const MakeYourOwnMacSection = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 lg:px-8 my-10">
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white shadow-2xl group cursor-pointer" onClick={() => navigate('/build-your-mac')}>
        
        {/* Background Glowing Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primaryOrange rounded-full blur-[150px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
              <Settings2 className="w-4 h-4 text-primaryOrange" />
              <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Pro Studio Setup</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Make Your <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryOrange to-yellow-500">Own Mac.</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg mx-auto md:mx-0">
              Tailor your workstation exactly to your needs. Choose your chip, memory, and storage to build the ultimate powerhouse.
            </p>
            
            <button className="bg-primaryOrange hover:bg-white text-white hover:text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center gap-3 mx-auto md:mx-0">
              Start Building <MonitorPlay className="w-5 h-5" />
            </button>
          </div>

          {/* Abstract Mac Illustration */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            <img 
              src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Custom Mac" 
              className="w-3/4 object-contain transform group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MakeYourOwnMacSection;