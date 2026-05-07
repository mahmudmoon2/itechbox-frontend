/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/Collection.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { ChevronDown, ChevronRight, Filter, X } from 'lucide-react';

const Collection = ({ type: propType }) => {
  const { type: paramType, slug } = useParams();
  const navigate = useNavigate();
  
  const { products = [], homeSections = [] } = useContext(StoreContext);
  
  const [baseProducts, setBaseProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState('All Products');
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [appliedPrice, setAppliedPrice] = useState({ min: null, max: null });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableStorages, setAvailableStorages] = useState([]);

  useEffect(() => {
    const currentType = paramType || propType;
    let initialProds = [];
    let title = 'All Collection';

    if (currentType === 'exclusive' || currentType === 'exclusive-products')  {
      initialProds = products.filter(p => p.is_exclusive);
      title = 'Exclusive Products';
    } else if (currentType === 'top-deals' || currentType === 'top_deal') {
      initialProds = products.filter(p => p.is_top_deal);
      title = 'Top Deals';
    } else if (currentType === 'all') {
      initialProds = products;
    } else if (slug) { 
      initialProds = products.filter(p => 
        p.category?.slug === slug || p.category_name?.toLowerCase() === slug.toLowerCase() ||
        p.brand?.slug === slug || p.brand_name?.toLowerCase() === slug.toLowerCase()
      );
      title = slug.replace('-', ' ').toUpperCase();
    } else if (currentType) { 
      const section = homeSections.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === currentType);
      if (section) {
        initialProds = section.products;
        title = section.title;
      }
    }

    setBaseProducts(initialProds);
    setPageTitle(title);

    const brandsSet = new Set();
    const storagesSet = new Set();
    
    initialProds.forEach(p => {
      if (p.brand_name || p.brand?.name) brandsSet.add(p.brand_name || p.brand?.name);
      if (p.storages) {
        p.storages.forEach(s => storagesSet.add(s.name));
      }
    });
    
    setAvailableBrands([...brandsSet]);
    setAvailableStorages([...storagesSet]);

    setAppliedPrice({ min: null, max: null });
    setPriceMin('');
    setPriceMax('');
    setSelectedBrands([]);
    setSelectedStorages([]);
    setSortOption('default');

  }, [propType, paramType, slug, products, homeSections]);

  useEffect(() => {
    let result = [...baseProducts];

    if (appliedPrice.min !== null) {
      result = result.filter(p => Number(p.discount_price || p.price) >= appliedPrice.min);
    }
    if (appliedPrice.max !== null) {
      result = result.filter(p => Number(p.discount_price || p.price) <= appliedPrice.max);
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand_name || p.brand?.name));
    }

    if (selectedStorages.length > 0) {
      result = result.filter(p => 
        p.storages && p.storages.some(s => selectedStorages.includes(s.name))
      );
    }

    if (sortOption === 'price-low-high') {
      result.sort((a, b) => Number(a.discount_price || a.price) - Number(b.discount_price || b.price));
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => Number(b.discount_price || b.price) - Number(a.discount_price || a.price));
    }

    setDisplayProducts(result);
  }, [baseProducts, appliedPrice, selectedBrands, selectedStorages, sortOption]);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    setAppliedPrice({
      min: priceMin !== '' ? Number(priceMin) : null,
      max: priceMax !== '' ? Number(priceMax) : null
    });
  };

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev => prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]);
  };

  const toggleStorage = (storageName) => {
    setSelectedStorages(prev => prev.includes(storageName) ? prev.filter(s => s !== storageName) : [...prev, storageName]);
  };

  return (
    <main className="min-h-screen bg-bgOffWhite pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-2">
              <span className="cursor-pointer hover:text-primaryOrange" onClick={() => navigate('/')}>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">{pageTitle}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-textBlack uppercase tracking-tight">
              {pageTitle}
            </h1>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4">
            <button 
              className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden sm:block">Showing: ({displayProducts.length} items)</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full px-4 py-2 focus:outline-none focus:border-primaryOrange cursor-pointer shadow-sm"
              >
                <option value="default">Sort By: Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          {/* ফিক্স: lg:z-10 অ্যাড করা হয়েছে যাতে এটি নেভবারকে ওভারল্যাপ না করে */}
          <div className={`fixed inset-y-0 left-0 z-[200] lg:z-10 w-72 bg-white shadow-2xl lg:shadow-none lg:bg-transparent lg:w-1/4 xl:w-[22%] lg:relative lg:block transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            
            <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
              <span className="font-bold text-lg flex items-center gap-2"><Filter className="w-5 h-5"/> Filters</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 bg-gray-100 rounded-full text-gray-600 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-full overflow-y-auto lg:overflow-visible p-4 lg:p-0">
              
              {/* ফিক্স: top-28 থেকে বাড়িয়ে top-36 করা হয়েছে যাতে স্টিকি হওয়ার সময় নেভবারের নিচে থাকে */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-36">
                
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-lg text-textBlack">Filters</h3>
                  {(selectedBrands.length > 0 || selectedStorages.length > 0 || appliedPrice.min || appliedPrice.max) && (
                    <button 
                      onClick={() => { setAppliedPrice({min:null, max:null}); setPriceMin(''); setPriceMax(''); setSelectedBrands([]); setSelectedStorages([]); }}
                      className="text-xs text-primaryOrange font-bold hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="mb-6 border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-3 cursor-pointer">
                    <span className="font-bold text-sm text-gray-800">Price Range</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <form onSubmit={handlePriceSubmit} className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="0" 
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-primaryOrange" 
                    />
                    <span className="text-gray-400">-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-primaryOrange" 
                    />
                    <button type="submit" className="bg-orange-50 text-primaryOrange hover:bg-primaryOrange hover:text-white p-2 rounded-md transition-colors border border-orange-200">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {availableStorages.length > 0 && (
                  <div className="mb-6 border-b border-gray-100 pb-6">
                    <div className="flex items-center justify-between mb-3 cursor-pointer">
                      <span className="font-bold text-sm text-gray-800">Storage</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-2.5 mt-3 max-h-48 overflow-y-auto scrollbar-hide">
                      {availableStorages.map(storage => (
                        <label key={storage} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedStorages.includes(storage)}
                            onChange={() => toggleStorage(storage)}
                            className="w-4 h-4 text-primaryOrange bg-gray-100 border-gray-300 rounded focus:ring-primaryOrange cursor-pointer accent-primaryOrange" 
                          />
                          <span className="text-sm text-gray-600 group-hover:text-primaryOrange transition-colors">{storage}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {availableBrands.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3 cursor-pointer">
                      <span className="font-bold text-sm text-gray-800">Brands</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-2.5 max-h-48 overflow-y-auto scrollbar-hide">
                      {availableBrands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-4 h-4 text-primaryOrange bg-gray-100 border-gray-300 rounded focus:ring-primaryOrange cursor-pointer accent-primaryOrange" 
                          />
                          <span className="text-sm text-gray-600 group-hover:text-primaryOrange transition-colors capitalize">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-[150] lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
          )}

          {/* --- RIGHT CONTENT (PRODUCTS GRID) --- */}
          <div className="w-full lg:w-3/4 xl:w-[78%]">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {displayProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl border border-gray-200">
                <span className="text-6xl mb-4">🔍</span>
                <h2 className="text-2xl font-bold text-gray-500">No exact matches found</h2>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => { setAppliedPrice({min:null, max:null}); setSelectedBrands([]); setSelectedStorages([]); }}
                  className="mt-6 bg-primaryOrange text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-[#e66a00]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};

export default Collection;