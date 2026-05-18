// src/pages/MacCustomization.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Info } from 'lucide-react';

const MacCustomization = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [activeSubCats, setActiveSubCats] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/store/products/${slug}/`);
        const data = response.data;
        setProduct(data);

        const initialSelected = {};
        const initialActive = {};

        data.customization_categories?.forEach(cat => {
          if (cat.sub_categories && cat.sub_categories.length > 0) {
            const defaultSubCat = cat.sub_categories[0];
            initialActive[String(cat.id)] = String(defaultSubCat.id);

            if (defaultSubCat.options && defaultSubCat.options.length > 0) {
              const defaultOpt = defaultSubCat.options.find(o => o.is_default) || defaultSubCat.options[0];
              if (defaultOpt) {
                initialSelected[String(cat.id)] = {
                  id: String(defaultOpt.id),
                  name: defaultOpt.name,
                  extra_price: defaultOpt.extra_price,
                  is_default: defaultOpt.is_default,
                  depends_on: defaultOpt.depends_on ? defaultOpt.depends_on.map(String) : [],
                  catId: String(cat.id),
                  catName: cat.name
                };
              }
            } else {
               initialSelected[String(cat.id)] = {
                  id: `sub-${defaultSubCat.id}`,
                  name: defaultSubCat.name,
                  extra_price: 0,
                  is_default: true,
                  depends_on: defaultSubCat.depends_on ? defaultSubCat.depends_on.map(String) : [],
                  catId: String(cat.id),
                  catName: cat.name
               };
            }
          }
        });
        
        setActiveSubCats(initialActive);
        setSelectedOptions(initialSelected);
      } catch (error) {
        console.error("Error fetching Mac details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProductDetails();
  }, [slug]);

  const isOptionEnabled = (option, currentSelections) => {
    if (!option.depends_on || option.depends_on.length === 0) return true;
    const selectedIds = Object.values(currentSelections).map(opt => String(opt?.id)).filter(Boolean);
    return option.depends_on.some(depId => selectedIds.includes(String(depId)));
  };

  const isSubCategoryVisible = (subCat, currentSelections) => {
    if (!subCat.depends_on || subCat.depends_on.length === 0) return true;
    const selectedIds = Object.values(currentSelections).map(opt => String(opt?.id)).filter(Boolean);
    return subCat.depends_on.some(depId => selectedIds.includes(String(depId)));
  };

  const isCategoryVisible = (category, currentSelections) => {
    if (!category.depends_on || category.depends_on.length === 0) return true;
    const selectedIds = Object.values(currentSelections).map(opt => String(opt?.id)).filter(Boolean);
    return category.depends_on.some(depId => selectedIds.includes(String(depId)));
  };

  const handleSubCategoryActivate = (catId, subCat) => {
    const catIdStr = String(catId);
    setActiveSubCats(prev => ({ ...prev, [catIdStr]: String(subCat.id) }));
    
    if (subCat.options && subCat.options.length > 0) {
      const firstEnabledOpt = subCat.options.find(opt => isOptionEnabled(opt, selectedOptions));
      if (firstEnabledOpt) {
        setSelectedOptions(prev => ({
          ...prev,
          [catIdStr]: {
            id: String(firstEnabledOpt.id),
            name: firstEnabledOpt.name,
            extra_price: firstEnabledOpt.extra_price,
            is_default: firstEnabledOpt.is_default,
            depends_on: firstEnabledOpt.depends_on ? firstEnabledOpt.depends_on.map(String) : [],
            catId: catIdStr,
            catName: product.customization_categories.find(c => String(c.id) === catIdStr)?.name
          }
        }));
      }
    } else {
      setSelectedOptions(prev => ({
        ...prev,
        [catIdStr]: {
          id: `sub-${subCat.id}`,
          name: subCat.name,
          extra_price: 0,
          is_default: true,
          depends_on: subCat.depends_on ? subCat.depends_on.map(String) : [],
          catId: catIdStr,
          catName: product.customization_categories.find(c => String(c.id) === catIdStr)?.name
        }
      }));
    }
  };

  const handleOptionSelect = (cat, subCat, option) => {
    const catIdStr = String(cat.id);
    
    setSelectedOptions(prev => {
      const nextSelections = { 
        ...prev, 
        [catIdStr]: { 
          id: String(option.id),
          name: option.name,
          extra_price: option.extra_price,
          is_default: option.is_default,
          depends_on: option.depends_on ? option.depends_on.map(String) : [],
          catId: catIdStr,
          catName: cat.name
        } 
      };

      product.customization_categories.forEach(c => {
        const sCId = String(c.id);
        if (sCId !== catIdStr) {
          const visibleSubCats = c.sub_categories?.filter(sc => isSubCategoryVisible(sc, nextSelections)) || [];
          if (visibleSubCats.length > 0) {
            let currentActiveSubCatId = activeSubCats[sCId];
            if (!visibleSubCats.find(sc => String(sc.id) === String(currentActiveSubCatId))) {
               currentActiveSubCatId = String(visibleSubCats[0].id);
               setActiveSubCats(prevActive => ({...prevActive, [sCId]: currentActiveSubCatId}));
            }

            const activeSubCat = visibleSubCats.find(sc => String(sc.id) === String(currentActiveSubCatId));
            const currentSelectedOpt = nextSelections[sCId];
            
            if (activeSubCat && (!currentSelectedOpt || !isOptionEnabled(currentSelectedOpt, nextSelections))) {
              if (activeSubCat.options && activeSubCat.options.length > 0) {
                const validOpt = activeSubCat.options.find(o => isOptionEnabled(o, nextSelections));
                if (validOpt) {
                  nextSelections[sCId] = { 
                    id: String(validOpt.id),
                    name: validOpt.name,
                    extra_price: validOpt.extra_price,
                    is_default: validOpt.is_default,
                    depends_on: validOpt.depends_on ? validOpt.depends_on.map(String) : [],
                    catId: sCId,
                    catName: c.name
                  };
                }
              } else {
                nextSelections[sCId] = { 
                  id: `sub-${activeSubCat.id}`,
                  name: activeSubCat.name,
                  extra_price: 0,
                  is_default: true,
                  depends_on: activeSubCat.depends_on ? activeSubCat.depends_on.map(String) : [],
                  catId: sCId,
                  catName: c.name
                };
              }
            }
          }
        }
      });

      return nextSelections;
    });
  };

  const activeBuildItems = useMemo(() => {
    if (!product) return [];
    return Object.values(selectedOptions).filter(opt => {
      const cat = product.customization_categories?.find(c => String(c.id) === String(opt.catId));
      if (!cat) return false;
      return isCategoryVisible(cat, selectedOptions) && isOptionEnabled(opt, selectedOptions);
    });
  }, [product, selectedOptions]);

  const handleWhatsAppOrder = () => {
    if (activeBuildItems.length === 0) {
      alert("Please select your custom build features before ordering.");
      return;
    }

    const configList = activeBuildItems
      .map(item => `  • *${item.catName}:* ${item.name}`)
      .join('\n');

    const message = `Hello iTechBox Team, 👋\n\nI would like to request a quotation for a custom-built Mac.\n\n💻 *Device:* ${product.name}\n\n⚙️ *Selected Specifications:*\n${configList}\n\nCould you please let me know the final price and estimated delivery time?\n\nThank you!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/8801730789571?text=${encodedMessage}`, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]"><div className="w-12 h-12 border-4 border-[#0071e3] border-t-transparent rounded-full animate-spin"></div></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]"><h2 className="text-2xl font-bold">Mac not found.</h2></div>;

  return (
    <main className="min-h-screen bg-[#fbfbfd] pt-24 pb-40 font-sans" style={{ overflow: 'visible' }}>
      
      {/* HEADER BREADCRUMB */}
      <div className="container mx-auto px-4 lg:px-8 mb-6 border-b border-gray-200/60 pb-4 animate-fade-in">
        <button onClick={() => navigate('/build-your-mac')} className="flex items-center gap-1 text-[#0071e3] hover:text-[#005bb5] font-medium text-[15px] transition-colors">
          <ChevronLeft className="w-5 h-5" /> All Macs
        </button>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 relative" style={{ overflow: 'visible' }}>
          
          {/* LEFT SIDE: Apple Style Fixed Image Card */}
          <div 
            className="w-full lg:w-[45%] xl:w-[40%] lg:sticky self-start z-10"
            style={{ position: 'sticky', top: '130px', height: 'fit-content' }}
          >
            <div className="mb-6">
              <p className="text-[#bf4800] font-semibold uppercase tracking-widest text-[11px] mb-2">Custom Build</p>
              <h1 className="text-4xl lg:text-[44px] font-bold text-[#1d1d1f] tracking-tight leading-tight mb-2">
                Customize your <br /><span className="font-extrabold">{product.name}</span>
              </h1>
            </div>
            
            {/* Image Box */}
            <div className="bg-white p-10 flex justify-center items-center rounded-[32px] border border-gray-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-transform duration-500 hover:scale-[1.02]">
              <img src={product.images?.[0]?.image || product.image} alt={product.name} className="w-full max-w-md object-contain drop-shadow-lg" />
            </div>
            
            {/* Info Box */}
            <div className="bg-gray-100/80 rounded-2xl p-5 mt-6 hidden lg:flex items-start gap-3 border border-gray-200/50">
              <Info className="w-5 h-5 text-[#86868b] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#1d1d1f] leading-relaxed font-medium">Pricing varies based on components. Send configuration via WhatsApp for final quotation.</p>
            </div>
          </div>

          {/* RIGHT SIDE: Customization Architecture */}
          <div className="w-full lg:w-[55%] xl:w-[60%] lg:pt-4" style={{ overflow: 'visible' }}>
            <div className="space-y-12">
              
              {product.customization_categories?.filter(cat => isCategoryVisible(cat, selectedOptions)).map(cat => {
                const visibleSubCats = cat.sub_categories?.filter(subCat => isSubCategoryVisible(subCat, selectedOptions)) || [];
                if (visibleSubCats.length === 0) return null;

                let currentActiveSubCatId = activeSubCats[String(cat.id)];
                if (!visibleSubCats.find(sc => String(sc.id) === String(currentActiveSubCatId))) {
                   currentActiveSubCatId = String(visibleSubCats[0].id);
                }

                return (
                  <div key={cat.id} className="pb-10 border-b border-gray-200/60 last:border-0 animate-fade-in">
                    <h2 className="text-[22px] md:text-[26px] font-bold text-[#1d1d1f] tracking-tight mb-6">
                      {cat.name}
                    </h2>

                    <div className="flex flex-col gap-4">
                      {visibleSubCats.map(subCat => {
                        const isActive = String(currentActiveSubCatId) === String(subCat.id);

                        return (
                          <div key={subCat.id} className="flex flex-col">
                            
                            {/* Apple Sub-Category Card (Mother Option) */}
                            <div 
                              onClick={() => !isActive && handleSubCategoryActivate(cat.id, subCat)}
                              className={`rounded-2xl p-6 transition-all duration-300 flex justify-between items-start gap-4 border-[2px] ${
                                isActive 
                                  ? 'border-[#0071e3] ring-1 ring-[#0071e3] shadow-[0_2px_15px_rgba(0,113,227,0.15)] bg-white cursor-default transform scale-[1.01]' 
                                  : 'border-[#d2d2d7] hover:border-[#86868b] bg-white hover:bg-gray-50 cursor-pointer'
                              }`}
                            >
                              <div className="flex-1 pr-4">
                                <h3 className={`text-[17px] tracking-tight ${isActive ? 'font-bold text-[#1d1d1f]' : 'font-semibold text-[#1d1d1f]'}`}>{subCat.name}</h3>
                                {subCat.description && <p className="text-[13px] text-[#515154] mt-2 leading-relaxed font-medium">{subCat.description}</p>}
                              </div>
                            </div>

                            {/* Level 3 Options Box (Smooth Expanding Container) */}
                            {subCat.options && subCat.options.length > 0 && (
                              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                <div className="bg-[#f5f5f7] p-5 md:p-6 rounded-[24px] border border-gray-200/60">
                                  <div className="flex flex-col gap-3">
                                    {subCat.options.map(option => {
                                      const isSelected = String(selectedOptions[String(cat.id)]?.id) === String(option.id);
                                      const enabled = isActive && isOptionEnabled(option, selectedOptions);

                                      return (
                                        <div 
                                          key={option.id}
                                          onClick={() => enabled && handleOptionSelect(cat, subCat, option)}
                                          className={`relative rounded-xl p-5 transition-all duration-300 flex justify-between items-start gap-4 border-[2px] ${
                                            !enabled 
                                              ? 'opacity-30 cursor-not-allowed border-gray-200 bg-white/50' 
                                              : isSelected 
                                                ? 'border-[#0071e3] ring-1 ring-[#0071e3] z-10 shadow-sm bg-white cursor-default' 
                                                : 'border-gray-200 hover:border-[#86868b] bg-white cursor-pointer hover:shadow-sm'
                                          }`}
                                        >
                                          <div className="flex-1 pr-2">
                                            <h4 className={`text-[15px] tracking-tight ${!enabled ? 'text-gray-400 font-semibold' : isSelected ? 'font-bold text-[#1d1d1f]' : 'font-semibold text-[#1d1d1f]'}`}>{option.name}</h4>
                                            {option.description && <p className={`text-[13px] mt-1.5 leading-relaxed ${!enabled ? 'text-gray-400' : 'text-[#515154] font-medium'}`}>{option.description}</p>}
                                          </div>

                                          <div className="text-right shrink-0">
                                            <span className={`text-[14px] ${!enabled ? 'text-gray-400 font-semibold' : isSelected ? 'font-bold text-[#1d1d1f]' : 'font-semibold text-[#1d1d1f]'}`}>
                                              {option.is_default ? 'Included' : Number(option.extra_price) > 0 ? `+ ৳${Number(option.extra_price).toLocaleString()}` : ''}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM STICKY BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#fbfbfd]/90 backdrop-blur-xl border-t border-gray-200/80 z-50 py-5 px-4 lg:px-8 shadow-[0_-12px_40px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="hidden md:flex flex-1 items-center gap-3 overflow-x-auto scrollbar-hide pr-4">
            <span className="font-bold text-[#1d1d1f] text-[14px] whitespace-nowrap tracking-tight">Your Build:</span>
            {activeBuildItems.map((item) => (
              <span key={item.id} className="bg-white text-[#1d1d1f] text-[13px] font-semibold px-4 py-2 rounded-full whitespace-nowrap border border-gray-200 shadow-sm transition-all duration-300 ease-in-out">
                {item.name}
              </span>
            ))}
          </div>

          <div className="w-full md:w-auto flex justify-center shrink-0">
            <button 
              onClick={handleWhatsAppOrder} 
              className="w-full md:w-auto bg-[#25D366] hover:bg-[#1da851] text-white px-10 py-4 rounded-full font-bold text-[16px] tracking-tight transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-[0_8px_25px_rgba(37,211,102,0.25)] active:scale-95"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Send Build to WhatsApp
            </button>
          </div>
          
        </div>
      </div>

    </main>
  );
};

export default MacCustomization;