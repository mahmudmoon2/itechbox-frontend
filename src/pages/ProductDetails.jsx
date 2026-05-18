// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronRight, Minus, Plus, MessageCircle, Truck } from 'lucide-react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  // StoreContext থেকে categories ডেটাও নিয়ে আসলাম
  const { addToCart, categories } = useContext(StoreContext);

  // States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  
  // Variants States
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specification');

  // Zoom Effect States
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: '50%', y: '50%' });

  // API Call
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/store/products/${slug}/`);
        const data = response.data;
        setProduct(data);
        
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0].image);
        } else if (data.image) {
          setMainImage(data.image);
        }

        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        if (data.storages && data.storages.length > 0) setSelectedStorage(data.storages[0]);
        if (data.regions && data.regions.length > 0) setSelectedRegion(data.regions[0]);

      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProductDetails();
  }, [slug]);

  // Handlers
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity(prev => prev + 1);

  const handleColorSelect = (colorObj) => {
    setSelectedColor(colorObj);
    if (colorObj.image) {
      setMainImage(colorObj.image);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x: `${x}%`, y: `${y}%` });
  };

  // --- স্মার্ট ক্যাটাগরি ফাইন্ডার ---
  // ব্যাকএন্ড থেকে ID বা Object যা-ই আসুক, এটি সঠিক Slug ও Name বের করে আনবে
  const getCategoryInfo = () => {
    if (!product) return { name: "Category", slug: "" };
    
    // ১. যদি ব্যাকএন্ড সরাসরি নেস্টেড অবজেক্ট পাঠায়
    if (product.category && typeof product.category === 'object') {
      return {
        name: product.category.name || product.category_name || "Category",
        slug: product.category.slug || product.category_slug || ""
      };
    }
    
    // ২. যদি ব্যাকএন্ড শুধু ID (যেমন: 1, 2) পাঠায়, তাহলে StoreContext থেকে মিলিয়ে নেওয়া
    if (categories && categories.length > 0) {
      const foundCat = categories.find(c => c.id === product.category);
      if (foundCat) {
        return { name: foundCat.name, slug: foundCat.slug };
      }
    }

    // ফলব্যাক
    return { 
      name: product.category_name || "Category", 
      slug: product.category_slug || "" 
    };
  };

  const categoryInfo = getCategoryInfo();

  const dummyStorages = [{ id: 1, name: '128GB' }, { id: 2, name: '256GB' }, { id: 3, name: '512GB' }];
  const dummyRegions = [{ id: 1, name: 'CN - Dual SIM' }, { id: 2, name: 'E-Sim JP' }, { id: 3, name: 'E-Sim USA' }, { id: 4, name: 'SIM+eSIM IND' }];

  const availableStorages = product?.storages || dummyStorages;
  const availableRegions = product?.regions || dummyRegions;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgOffWhite">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primaryOrange border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bgOffWhite">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Product Not Found!</h2>
        <button onClick={() => navigate('/')} className="bg-primaryOrange text-white px-8 py-3 rounded-xl font-bold shadow-lg">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bgOffWhite pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
          <span className="cursor-pointer hover:text-primaryOrange transition" onClick={() => navigate('/')}>Home</span>
          <ChevronRight className="w-4 h-4" />
          {/* UPDATED: Dynamic Category Link */}
          <span 
            className={`cursor-pointer hover:text-primaryOrange transition ${!categoryInfo.slug ? 'pointer-events-none' : ''}`}
            onClick={() => categoryInfo.slug && navigate(`/category/${categoryInfo.slug}`)}
          >
            {categoryInfo.name}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-textBlack truncate max-w-[200px] md:max-w-md">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery with Zoom */}
            <div className="w-full lg:w-[45%] p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              
              {/* Magnifier Container */}
              <div 
                className="relative rounded-2xl bg-white border border-gray-100 aspect-square flex items-center justify-center mb-6 overflow-hidden cursor-crosshair group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className={`w-full h-full object-contain p-4 transition-transform duration-200 ${isZoomed ? '' : 'group-hover:scale-105'}`}
                  style={isZoomed ? { 
                    transformOrigin: `${zoomPos.x} ${zoomPos.y}`, 
                    transform: 'scale(2.5)' 
                  } : {}}
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center">
                  {product.images.map((imgObj, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setMainImage(imgObj.image)}
                      className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded-xl border-2 flex items-center justify-center bg-white overflow-hidden transition-all ${
                        mainImage === imgObj.image ? 'border-primaryOrange shadow-sm' : 'border-gray-200 hover:border-primaryOrange/50'
                      }`}
                    >
                      <img src={imgObj.image} alt="thumbnail" className="max-h-full p-2 object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-[55%] p-6 md:p-8 flex flex-col">
              
              <div className="mb-2">
                <span className="text-[#0052cc] font-black uppercase text-xs tracking-wider">
                  {product.brand_name || product.brand || "SAMSUNG"}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-[32px] font-bold text-textBlack leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price & Meta Info */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 pb-6 border-b border-gray-100 text-sm">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-textBlack">
                    ৳{Number(product.discount_price || product.price).toLocaleString()}
                  </span>
                  <span className="text-gray-500 mb-1">(Cash Price)</span>
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <div className="text-gray-600">
                  <span className="font-bold text-textBlack">Availability:</span> 
                  <span className={product.stock > 0 || product.is_in_stock ? 'text-green-600 font-medium ml-1' : 'text-red-600 font-medium ml-1'}>
                    {product.stock > 0 || product.is_in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <div className="text-gray-600">
                  <span className="font-bold text-textBlack">Code:</span> {product.product_code || "1-8"}
                </div>
              </div>

              {/* Variants Grid (Color, Region, Storage) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                
                {/* Color Box */}
                <div className="border border-gray-200 p-4 rounded-xl">
                  <span className="font-bold text-textBlack text-sm block mb-3">Color:</span>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors && product.colors.length > 0 ? (
                      product.colors.map((colorObj, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleColorSelect(colorObj)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[13px] font-medium transition-all bg-white ${
                            selectedColor?.id === colorObj.id ? 'border-primaryOrange text-textBlack ring-1 ring-primaryOrange' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: colorObj.hex_code || colorObj.name.toLowerCase() }}></span>
                          {colorObj.name}
                        </button>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Default Color</span>
                    )}
                  </div>
                </div>

                {/* Region Box */}
                <div className="border border-gray-200 p-4 rounded-xl">
                  <span className="font-bold text-textBlack text-sm block mb-3">Region:</span>
                  <div className="flex gap-2 flex-wrap">
                    {availableRegions.map((region, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedRegion(region)}
                        className={`px-3 py-1.5 rounded-full border text-[13px] font-medium transition-all bg-white ${
                          selectedRegion?.id === region.id ? 'border-primaryOrange text-primaryOrange ring-1 ring-primaryOrange' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Box */}
                <div className="border border-gray-200 p-4 rounded-xl md:col-span-1">
                  <span className="font-bold text-textBlack text-sm block mb-3">Storage:</span>
                  <div className="flex gap-2 flex-wrap">
                    {availableStorages.map((storage, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-4 py-1.5 rounded-full border text-[13px] font-bold transition-all bg-white ${
                          selectedStorage?.id === storage.id ? 'border-primaryOrange text-primaryOrange ring-1 ring-primaryOrange' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {storage.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Warranty Info Text */}
              <div className="mb-6 text-[15px] font-bold text-textBlack">
                1 Year Official Warranty Support <span className="text-gray-500 font-medium">(Except USA Variant)</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <span className="font-bold text-textBlack text-sm block mb-3">Select Quantity:</span>
                <div className="flex items-center bg-gray-50 rounded-full w-max border border-gray-200">
                  <button onClick={handleDecrease} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primaryOrange transition bg-white rounded-l-full border-r border-gray-200"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold text-textBlack">{quantity}</span>
                  <button onClick={handleIncrease} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primaryOrange transition bg-white rounded-r-full border-l border-gray-200"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="bg-primaryOrange hover:bg-[#e66a00] text-white font-bold py-3.5 rounded-full transition-colors shadow-md flex justify-center items-center gap-2"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => addToCart({...product, quantity, selectedColor, selectedStorage, selectedRegion})}
                  className="bg-white border-2 border-gray-200 text-textBlack hover:border-textBlack font-bold py-3.5 rounded-full transition-colors flex justify-center items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Add To Cart
                </button>
              </div>

              {/* EMI & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm font-medium">
                <div className="flex items-center justify-between bg-orange-50 border border-orange-100 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">%</span> 
                    <span className="text-gray-700">EMI Available</span>
                  </div>
                  <a href="#" className="text-textBlack underline font-bold">View Plans</a>
                </div>
                <button 
                  onClick={() => window.open(`https://wa.me/8801730789571?text=Hi, I am interested in ${product.name}`, '_blank')}
                  className="flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-4 py-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" /> Whatsapp
                </button>
              </div>

              {/* Delivery Timescale */}
              <div className="flex items-center gap-3 border border-gray-200 px-4 py-3 rounded-xl text-sm mt-auto">
                <Truck className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Delivery Timescale:</span>
                <span className="font-bold text-textBlack">{product.delivery_timescale || "3-5 Days"}</span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section: Tabs & Recently Viewed */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area (Tabs) */}
          <div className="w-full lg:w-3/4">
            
            {/* Tab Buttons */}
            <div className="flex gap-2 md:gap-4 mb-6 border-b border-gray-200 pb-2 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setActiveTab('specification')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'specification' ? 'bg-primaryOrange text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                Specification
              </button>
              <button 
                onClick={() => setActiveTab('description')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'description' ? 'bg-primaryOrange text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('warranty')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'warranty' ? 'bg-primaryOrange text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                Warranty
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[400px]">
              
              {/* Specification Tab */}
              {activeTab === 'specification' && (
                <div>
                  <h3 className="text-xl font-bold text-textBlack mb-6">Specification</h3>
                  {product.specifications ? (
                    <div className="prose max-w-none text-gray-600 w-full"
                      dangerouslySetInnerHTML={{ __html: product.specifications }} 
                    />
                  ) : (
                    <p className="text-gray-500">No specifications available.</p>
                  )}
                </div>
              )}

              {/* Description Tab */}
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-bold text-textBlack mb-6">Descriptions</h3>
                  <div className="prose max-w-none text-gray-600" 
                    dangerouslySetInnerHTML={{ __html: product.description || "<p>No description provided.</p>" }} 
                  />
                </div>
              )}

              {/* Warranty Tab */}
              {activeTab === 'warranty' && (
                <div>
                  <h3 className="text-xl font-bold text-textBlack mb-4">Warranty Information</h3>
                  <div className="prose max-w-none text-gray-600" 
                    dangerouslySetInnerHTML={{ __html: product.warranty_info || "<p>No special warranty available for this product.</p>" }} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Recently Viewed */}
          <div className="w-full lg:w-1/4">
            <h3 className="text-2xl font-bold text-textBlack mb-6">Recently Viewed</h3>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                <img src={mainImage} alt="recent" className="max-h-full p-2 object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-textBlack line-clamp-2 mb-2 hover:text-primaryOrange">
                  {product.name}
                </h4>
                <span className="font-extrabold text-sm text-textBlack">
                  ৳{Number(product.discount_price || product.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductDetails;