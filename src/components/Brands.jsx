// src/components/Brands.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom'; // নেভিগেশনের জন্য ইমপোর্ট করা হলো
import 'swiper/css';

const Brands = () => {
  const { brands } = useContext(StoreContext);
  const navigate = useNavigate(); // নেভিগেট করার হুক

  if (!brands || brands.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-textBlack tracking-tight">Popular Brands</h2>
      </div>
      
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={2.5} 
        autoplay={{
          delay: 2000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // মাউস রাখলে স্লাইডার সাময়িকভাবে থেমে যাবে
        }}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 8 }, 
        }}
        // হোভার করার সময় শ্যাডো যেন কেটে না যায় তাই নিচে একটু প্যাডিং দেওয়া হলো
        className="w-full !pb-4 pt-2" 
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            {/* onClick ইভেন্ট যোগ করা হয়েছে */}
            <div 
              onClick={() => navigate(`/brand/${brand.slug}`)}
              className="bg-white border border-gray-200 rounded-xl py-6 px-4 flex items-center justify-center cursor-pointer hover:border-primaryOrange hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition-all duration-300 group h-24"
            >
              {brand.logo ? (
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                />
              ) : (
                <span className="font-bold text-gray-500 group-hover:text-primaryOrange transition-colors text-center text-sm md:text-base inline-block group-hover:scale-110 duration-300">
                  {brand.name}
                </span>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Brands;