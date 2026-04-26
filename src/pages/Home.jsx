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
  // StoreContext থেকে সব ডাইনামিক ডেটা নিয়ে আসছি
  const { banners = [], homeSections = [], products = [] } = useContext(StoreContext);

  // ব্যানারগুলোকে placement অনুযায়ী আলাদা করছি
  const heroBanners = banners.filter(b => b.placement === 'hero');
  const campaignBanner = banners.find(b => b.placement === 'campaign');
  const midLeftBanner = banners.find(b => b.placement === 'mid_promo_left');
  const midRightBanner = banners.find(b => b.placement === 'mid_promo_right');
  
  const featLarge = banners.find(b => b.placement === 'featured_large');
  const featSmallTop = banners.find(b => b.placement === 'featured_small_top');
  const featSmallBottom = banners.find(b => b.placement === 'featured_small_bottom');

  // Exclusive এবং Top Deals প্রোডাক্টগুলোকে আলাদা করছি (এগুলো মডেলে টিক দেওয়া থাকে)
  const exclusiveProducts = products.filter(p => p.is_exclusive);
  const topDealProducts = products.filter(p => p.is_top_deal);

  return (
    <main className="pb-20 space-y-4 bg-bgOffWhite overflow-x-hidden"> 
      
      {/* ১. হিরো স্লাইডার, ক্যাটাগরি এবং ব্র্যান্ডস */}
      <Hero data={heroBanners} />
      
      <Brands />

      {/* ২. Exclusive Products (যদি থাকে) */}
      {exclusiveProducts.length > 0 && (
        <ProductSection title="Exclusive Products" productsList={exclusiveProducts} />
      )}
      

      {/* ৩. ক্যাম্পেইন ব্যানার */}
      {campaignBanner && <CampaignBanner data={campaignBanner} />}

      <CategoryGrid />

      {/* ৪. Top Deals (যদি থাকে) */}
      {topDealProducts.length > 0 && (
        <div className="bg-white py-10 shadow-sm border-y border-gray-100 mt-4">
          <ProductSection title="Top Deals" productsList={topDealProducts} />
        </div>
      )}

      {/* ৫. মিড প্রোমো ব্যানার এবং ফিচারড গ্রিড */}
      <MidPromo leftData={midLeftBanner} rightData={midRightBanner} />
      <FeaturedGrid large={featLarge} smallTop={featSmallTop} smallBottom={featSmallBottom} />

      {/* ৬. ম্যাজিক অংশ! জ্যাঙ্গো এডমিন থেকে তৈরি করা ডাইনামিক সেকশনগুলো */}
      {/* এডমিন প্যানেলে আপনি যতগুলো সেকশন বানাবেন, এখানে সেগুলো একটার পর একটা অটোমেটিক চলে আসবে */}
      {homeSections && homeSections.map((section, index) => (
        <div 
          key={section.id} 
          // ব্যাকগ্রাউন্ড কালার চেঞ্জ করে সুন্দর ডিজাইন দেওয়ার জন্য একটু লজিক ব্যবহার করা হয়েছে
          className={`mt-4 ${index % 2 !== 0 ? 'bg-white py-10 shadow-sm border-y border-gray-100' : ''}`}
        >
          <ProductSection 
            title={section.title} 
            productsList={section.products} 
          />
        </div>
      ))}

    </main>
  );
};

export default Home;