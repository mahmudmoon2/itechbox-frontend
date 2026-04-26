// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // নেভিগেশনের জন্য

  // অটো-স্লাইডার লজিক
  useEffect(() => {
    if (data && data.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      }, 5000); 
      return () => clearInterval(timer);
    }
  }, [data]);

  if (!data || data.length === 0) return null;

  const nextSlide = () => setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  const prevSlide = () => setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);

  // বাটনে ক্লিক করলে লিংকে যাওয়ার লজিক
  const handleButtonClick = (link) => {
    if (!link) {
      navigate('/products'); // যদি জ্যাঙ্গোতে লিংক দেওয়া না থাকে, ডিফল্টভাবে প্রোডাক্ট পেজে যাবে
    } else if (link.startsWith('http')) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = link; // বাইরের কোনো লিংক হলে সরাসরি সেখানে যাবে
    } else {
      navigate(link); // ওয়েবসাইটের ভেতরের লিংক হলে রাউটার দিয়ে যাবে (যেমন: /category/gadgets)
    }
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-black group">
      
      {/* Slides */}
      {data.map((slide, index) => {
        const isActive = index === currentSlide;
        
        return (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`} 
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start text-center md:text-left px-10 md:px-24">
              
              <h1 className={`text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl italic tracking-tight transition-all duration-700 ease-out transform ${isActive ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}>
                {slide.title}
              </h1>
              
              {slide.subtitle && (
                <div className={`transition-all duration-700 ease-out transform ${isActive ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'}`}>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl drop-shadow-md font-medium md:border-l-4 md:border-primaryOrange md:pl-5">
                    {slide.subtitle}
                  </p>
                </div>
              )}
              
              {/* অ্যানিমেটেড বাটন + ক্লিক ফাংশন */}
              {slide.button_text && (
                <div className={`transition-all duration-700 ease-out transform ${isActive ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-10'}`}>
                  <button 
                    onClick={() => handleButtonClick(slide.button_link)} // এই লাইনটি অ্যাড করা হয়েছে
                    className="relative overflow-hidden group/btn bg-primaryOrange text-white px-8 py-3.5 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(255,102,0,0.5)] hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">{slide.button_text}</span>
                    <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover/btn:w-full z-0"></div>
                  </button>
                </div>
              )}
              
            </div>
          </div>
        );
      })}

      {/* Manual Controls */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-primaryOrange border border-white/20 rounded-full text-white transition-all duration-300 backdrop-blur-md hidden md:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-primaryOrange border border-white/20 rounded-full text-white transition-all duration-300 backdrop-blur-md hidden md:block opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {data.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${idx === currentSlide ? 'bg-primaryOrange w-10 shadow-[0_0_10px_rgba(255,102,0,0.8)]' : 'bg-white/40 w-2 hover:bg-white/80'}`}
          />
        ))}
      </div>
      
    </div>
  );
};

export default Hero;