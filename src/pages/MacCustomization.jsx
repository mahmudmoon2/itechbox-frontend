// src/pages/MacCustomization.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ShieldCheck, Truck, MessageCircle, Info } from 'lucide-react';

const MacCustomization = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Selected configuration state: { category_id: { ...option, categoryName } }
  const [selectedOptions, setSelectedOptions] = useState({});

  // Fetch Product Data
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/store/products/${slug}/`);
        const data = response.data;
        setProduct(data);

        // Set default options automatically
        const defaults = {};
        if (data.customization_categories) {
          data.customization_categories.forEach(category => {
            const defaultOption = category.options.find(opt => opt.is_default) || category.options[0];
            if (defaultOption) {
              defaults[category.id] = { ...defaultOption, categoryName: category.name };
            }
          });
        }
        setSelectedOptions(defaults);
      } catch (error) {
        console.error("Error fetching Mac details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProductDetails();
  }, [slug]);

  // Handle Option Selection
  const handleOptionSelect = (categoryId, categoryName, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryId]: { ...option, categoryName }
    }));
  };

  // Direct WhatsApp Order Logic with Professional Message Format
  const handleWhatsAppOrder = () => {
    if (!product) return;

    // সুন্দর করে সাজানো কনফিগারেশন লিস্ট
    const configList = Object.values(selectedOptions)
      .map(opt => `   • *${opt.categoryName}:* ${opt.name}`)
      .join('\n');

    // প্রফেশনাল মেসেজ টেমপ্লেট
    const message = `Hello iTechBox Team, 👋\n\nI would like to request a quotation for a custom-built Mac.\n\n💻 *Device:* ${product.name}\n\n⚙️ *Selected Specifications:*\n${configList}\n\nCould you please let me know the final price and estimated delivery time for this configuration?\n\nThank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "8801730789571"; // আপনার WhatsApp নাম্বার
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <div className="w-12 h-12 border-4 border-primaryOrange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Mac not found.</h2>
        <button onClick={() => navigate('/build-your-mac')} className="text-primaryOrange font-bold hover:underline">
          Go back to selection
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] pt-24 pb-36 font-sans">
      
      {/* Top Header / Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 mb-8">
        <button 
          onClick={() => navigate('/build-your-mac')}
          className="flex items-center gap-1 text-primaryOrange hover:text-[#e66a00] font-semibold transition-colors"
        >
          <ChevronLeft className="w-5 h-5" /> All Macs
        </button>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* --- LEFT SIDE: Sticky Product Image & Summary --- */}
          <div className="w-full lg:w-[45%] xl:w-[40%]">
            <div className="sticky top-28">
              
              <div className="text-center md:text-left mb-6">
                <p className="text-primaryOrange font-bold uppercase tracking-widest text-[11px] mb-3">Custom Build</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-textBlack tracking-tight leading-tight mb-2">
                  Customize your <br/> <span className="font-black">{product.name}</span>
                </h1>
              </div>

              {/* Main Image */}
              <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex justify-center items-center mb-6 relative">
                <img 
                  src={product.images?.[0]?.image || product.image} 
                  alt={product.name} 
                  className="w-full max-w-sm object-contain transform transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Info Box */}
              <div className="bg-gray-100/80 rounded-2xl p-5 flex gap-3 hidden lg:flex items-start">
                <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                  Pricing varies based on your selected components. Please send us your desired configuration via WhatsApp, and our team will provide a tailored quotation and delivery timeline.
                </p>
              </div>

            </div>
          </div>

          {/* --- RIGHT SIDE: Customization Options --- */}
          <div className="w-full lg:w-[55%] xl:w-[60%]">
            
            {product.customization_categories && product.customization_categories.length > 0 ? (
              <div className="space-y-12">
                {product.customization_categories.map((category) => (
                  <div key={category.id} className="pb-4">
                    
                    <div className="mb-5">
                      <h2 className="text-xl font-bold text-textBlack">{category.name}</h2>
                      {category.description && (
                        <p className="text-gray-500 text-[13px] mt-1 font-medium">{category.description}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      {category.options.map((option) => {
                        const isSelected = selectedOptions[category.id]?.id === option.id;
                        
                        return (
                          <div 
                            key={option.id}
                            onClick={() => handleOptionSelect(category.id, category.name, option)}
                            className={`relative rounded-xl p-5 cursor-pointer transition-all duration-200 flex items-center gap-4 bg-white border-2 ${
                              isSelected 
                                ? 'border-primaryOrange shadow-[0_2px_15px_rgba(255,102,0,0.12)] bg-orange-50/30' 
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {/* Apple-style Radio Circle */}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-primaryOrange' : 'border-gray-300'}`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-primaryOrange rounded-full"></div>}
                            </div>

                            <div className="flex-1">
                              <h3 className={`font-semibold text-[15px] ${isSelected ? 'text-textBlack' : 'text-gray-700'}`}>
                                {option.name}
                              </h3>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500 font-bold text-lg">No customization options available for this model yet.</p>
              </div>
            )}

            {/* Guarantees Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4">
                <ShieldCheck className="w-7 h-7 text-gray-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-textBlack text-[15px]">Official Warranty</h4>
                  <p className="text-[13px] text-gray-500 mt-1 font-medium">1 Year Apple Official Coverage.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-start gap-4">
                <Truck className="w-7 h-7 text-gray-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-textBlack text-[15px]">Secure Delivery</h4>
                  <p className="text-[13px] text-gray-500 mt-1 font-medium">Safe delivery across Bangladesh.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* --- BOTTOM STICKY BAR (Summary & WhatsApp Checkout) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50 py-4 px-4 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Quick Summary in Bar */}
          <div className="hidden md:flex flex-1 items-center gap-3 overflow-x-auto scrollbar-hide pr-4">
            <span className="font-bold text-gray-800 text-[13px] whitespace-nowrap">Your Build:</span>
            {Object.values(selectedOptions).map((opt, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 text-[12px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                {opt.name}
              </span>
            ))}
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full md:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-3.5 rounded-full font-bold text-[15px] shadow-lg shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5" /> Send to WhatsApp
            </button>
          </div>
          
        </div>
      </div>

    </main>
  );
};

export default MacCustomization;