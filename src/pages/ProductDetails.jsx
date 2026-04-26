// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Check, ChevronRight, Minus, Plus, MessageCircle, Truck } from 'lucide-react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(StoreContext);

  // States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specification'); // Tabs

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

        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProductDetails();
  }, [slug]);

  // Quantity Handlers
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleIncrease = () => setQuantity(prev => prev + 1);

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
          <span className="cursor-pointer hover:text-primaryOrange transition" onClick={() => navigate(`/category/${product.category?.slug}`)}>
            {product.category_name || product.category?.name || "Category"}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-textBlack truncate max-w-[200px] md:max-w-md">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-[45%] p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="relative rounded-2xl bg-gray-50 aspect-square flex items-center justify-center mb-6">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="max-h-full w-auto object-contain p-4 transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((imgObj, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setMainImage(imgObj.image)}
                      className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded-xl border-2 flex items-center justify-center bg-white overflow-hidden transition-all ${
                        mainImage === imgObj.image ? 'border-primaryOrange' : 'border-gray-200 hover:border-gray-300'
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
              
              {/* Brand (Compare Button Removed) */}
              <div className="mb-2">
                <span className="text-red-500 font-bold uppercase text-xs tracking-wider">
                  {product.brand_name || product.brand || "Brand"}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-textBlack leading-tight mb-4">
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
                  <span className="font-bold text-textBlack">Code:</span> {product.product_code || "N/A"}
                </div>
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="font-bold text-textBlack text-sm block mb-3">Color:</span>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((colorObj, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(colorObj)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all bg-white ${
                          selectedColor?.id === colorObj.id ? 'border-primaryOrange text-primaryOrange shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: colorObj.hex_code || colorObj.name.toLowerCase() }}></span>
                        {colorObj.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <span className="font-bold text-textBlack text-sm block mb-3">Select Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-full w-max border border-gray-200">
                  <button onClick={handleDecrease} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primaryOrange transition"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold text-textBlack">{quantity}</span>
                  <button onClick={handleIncrease} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primaryOrange transition"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="bg-primaryOrange hover:bg-[#ff7a00] text-white font-bold py-3.5 rounded-full transition-colors shadow-md flex justify-center items-center gap-2"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => addToCart({...product, quantity, selectedColor})}
                  className="bg-white border-2 border-gray-200 text-textBlack hover:border-primaryOrange hover:text-primaryOrange font-bold py-3.5 rounded-full transition-colors flex justify-center items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Add To Cart
                </button>
              </div>

              {/* EMI & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm font-medium">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl">
                  <span className="text-gray-500">%</span> 
                  <span className="text-gray-700">EMI Available</span>
                  {product.emi_available && <a href="#" className="text-textBlack underline ml-auto font-bold">View Plans</a>}
                </div>
                <button 
                  onClick={() => window.open(`https://wa.me/8801730789571?text=Hi, I am interested in ${product.name}`, '_blank')}
                  className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-4 py-3 rounded-xl transition-colors"
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
              
              {/* Specification Tab - FIXED HTML RENDERING */}
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