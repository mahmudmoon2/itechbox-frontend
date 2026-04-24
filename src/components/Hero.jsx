import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-textBlack">
      {/* Slides */}
      {data.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start text-center md:text-left px-10 md:px-24">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg italic">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
                {slide.subtitle}
              </p>
            )}
            {slide.button_text && (
              <button className="bg-primaryOrange text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg">
                {slide.button_text}
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Manual Controls */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors backdrop-blur-sm hidden md:block">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors backdrop-blur-sm hidden md:block">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {data.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-primaryOrange w-8' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;