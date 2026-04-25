// src/components/Brands.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Brands = () => {
  const { brands } = useContext(StoreContext);

  if (!brands || brands.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-textBlack tracking-tight">Popular Brands</h2>
      </div>
      
      {/* আগের গ্রিডের বদলে Swiper ব্যবহার করা হয়েছে */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={2.5} // মোবাইলে আড়াইটা ব্র্যান্ড দেখাবে
        autoplay={{
          delay: 2000, // ২ সেকেন্ড পর পর স্লাইড হবে
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 8 }, // পিসিতে ৮টা দেখাবে
        }}
        className="w-full"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="bg-white border border-gray-200 rounded-xl py-6 px-4 flex items-center justify-center cursor-pointer hover:border-primaryOrange hover:shadow-md transition-all group h-24">
              {brand.logo ? (
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-10 w-auto object-contain opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300" 
                />
              ) : (
                <span className="font-bold text-gray-500 group-hover:text-primaryOrange transition-colors text-center text-sm md:text-base">
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