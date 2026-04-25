// src/components/ProductSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductSection = ({ title, productsList }) => {
  if (!productsList || productsList.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-textBlack tracking-tight uppercase italic">{title}</h2>
        <Link to={`/collection/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primaryOrange font-bold hover:underline text-sm">
          VIEW ALL
        </Link>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={15}
        slidesPerView={1.5}
        autoplay={{
          delay: 2500, // ২.৫ সেকেন্ড পর পর নিজে নিজেই স্লাইড হবে
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
        }}
        className="product-swiper"
      >
        {productsList.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSection;