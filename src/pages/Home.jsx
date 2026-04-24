// src/pages/Home.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import ProductSection from '../components/ProductSection';
import CategoryGrid from '../components/CategoryGrid';
import MidPromo from '../components/MidPromo';
import CampaignBanner from '../components/CampaignBanner';
import FeaturedGrid from '../components/FeaturedGrid';

const Home = () => {
  // Fix: banners যদি undefined হয়, তবে ডিফল্টভাবে ফাঁকা অ্যারে [] বসবে
  const { banners = [] } = useContext(StoreContext);

  // এখন আর filter বা find করতে গিয়ে ক্র্যাশ করবে না
  const heroBanners = banners.filter(b => b.placement === 'hero');
  const campaignBanner = banners.find(b => b.placement === 'campaign');
  const midLeftBanner = banners.find(b => b.placement === 'mid_promo_left');
  const midRightBanner = banners.find(b => b.placement === 'mid_promo_right');
  
  const featLarge = banners.find(b => b.placement === 'featured_large');
  const featSmallTop = banners.find(b => b.placement === 'featured_small_top');
  const featSmallBottom = banners.find(b => b.placement === 'featured_small_bottom');

  return (
    <main className="pb-20 space-y-4 bg-bgOffWhite"> 
      
      <Hero data={heroBanners} />
      <CategoryGrid />
      <Brands />

      <ProductSection title="Exclusive Products" filterType="exclusive" />

      {campaignBanner && <CampaignBanner data={campaignBanner} />}

      <div className="bg-white py-10 shadow-sm border-y border-gray-100">
        <ProductSection title="Top Deals" filterType="top_deal" />
      </div>

      <MidPromo leftData={midLeftBanner} rightData={midRightBanner} />

      <FeaturedGrid large={featLarge} smallTop={featSmallTop} smallBottom={featSmallBottom} />

      <ProductSection title="Gaming Gear" category="gaming" />
      
      <div className="bg-white py-10 shadow-sm border-y border-gray-100 mt-4">
        <ProductSection title="Audio & Speakers" category="audio" />
      </div>

      <div className="mt-4">
        <ProductSection title="Cases & Protections" category="cases" />
      </div>

    </main>
  );
};

export default Home;