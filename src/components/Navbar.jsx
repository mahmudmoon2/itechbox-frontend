// src/components/Navbar.jsx
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Search, ShoppingCart, User, LogOut, Menu, X, ChevronDown, ChevronRight, MonitorPlay } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { cart, setIsCartOpen, categories, products, brands } = useContext(StoreContext);
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGroupedCategories = () => {
    const groups = {
      "Phones & Tablets": [],
      "Computers & IT": [],
      "Audio & Gadgets": [],
      "Gaming & Cameras": [],
      "Home & Appliances": [],
      "Accessories": []
    };
    categories?.forEach(cat => {
      const name = cat.name.toLowerCase();
      if (name.includes('phone') || name.includes('tablet') || name.includes('notebook') || name.includes('ipad') || name.includes('tab')) {
        groups["Phones & Tablets"].push(cat);
      } else if (name.includes('desktop') || name.includes('laptop') || name.includes('server') || name.includes('storage') || name.includes('network') || name.includes('software') || name.includes('mac') || name.includes('pc')) {
        groups["Computers & IT"].push(cat);
      } else if (name.includes('earbud') || name.includes('watch') || name.includes('sound') || name.includes('audio') || name.includes('vision') || name.includes('headphone') || name.includes('speaker')) {
        groups["Audio & Gadgets"].push(cat);
      } else if (name.includes('gaming') || name.includes('camera') || name.includes('cemer') || name.includes('graphic') || name.includes('console')) {
        groups["Gaming & Cameras"].push(cat);
      } else if (name.includes('appliance') || name.includes('home') || name.includes('starlink') || name.includes('smart')) {
        groups["Home & Appliances"].push(cat);
      } else {
        groups["Accessories"].push(cat);
      }
    });
    return Object.entries(groups).filter(([_, cats]) => cats.length > 0);
  };

  const groupedCategories = useMemo(() => getGroupedCategories(), [categories]);

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-[100] flex flex-col font-['Montserrat'] transition-all duration-300">
        
        {/* ----- Main Navbar - Enhanced Light Theme with Gradient Border & Glassmorphism ----- */}
        <div className={`w-full z-50 transition-all duration-500 relative ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20' 
            : 'bg-white/95 backdrop-blur-sm shadow-xl border-b border-transparent bg-gradient-to-r from-white via-white to-gray-50'
        } text-gray-800`}>
          
          {/* Animated gradient bottom border (only when not scrolled) */}
          {!isScrolled && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primaryOrange/60 to-transparent"></div>
          )}
          
          <div className="container mx-auto px-4 lg:px-8 py-2 md:py-3 flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 -ml-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 backdrop-blur-sm text-gray-700 hover:text-primaryOrange transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>

            {/* Logo with shine effect */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-3 lg:mr-8 py-1 group" 
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primaryOrange to-amber-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
                <img 
                  src="/logo.png" 
                  alt="iTechBox Logo" 
                  className="relative h-10 w-10 md:h-12 md:w-12 rounded-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 border-2 border-white shadow-md group-hover:shadow-lg z-10 bg-white" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl md:text-[22px] font-extrabold tracking-tight text-gray-800 leading-none">
                  iTech<span className="bg-gradient-to-r from-primaryOrange to-amber-500 bg-clip-text text-transparent">BOX</span>
                </span>
                <span className="text-[10px] text-gray-500 font-black tracking-[0.25em] uppercase mt-0.5 ml-0.5">
                  Bangladesh
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links - with glow on active */}
            <nav className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-8 text-[13px] tracking-wide uppercase font-extrabold">
              {[
                { path: '/', label: 'HOME' },
                { path: '/about', label: 'ABOUT US' },
                { path: '/services', label: 'OUR SERVICES' },
                { path: '/contact', label: 'CONTACT US' }
              ].map(item => (
                <div key={item.path} onClick={() => navigate(item.path)} className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                  <span className={`transition-all duration-300 ${isActive(item.path) ? 'text-primaryOrange font-extrabold drop-shadow-[0_0_4px_rgba(255,102,0,0.3)]' : 'text-gray-600 group-hover:text-primaryOrange'}`}>
                    {item.label}
                  </span>
                  <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-primaryOrange to-amber-400 rounded-full transform origin-left transition-transform duration-300 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </div>
              ))}

              {/* OUR PRODUCTS Dropdown (brands) - Enhanced */}
              <div className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                <div className={`flex items-center gap-1 transition-all duration-300 ${location.pathname.includes('/product') || location.pathname.includes('/brand') ? 'text-primaryOrange font-extrabold drop-shadow-sm' : 'text-gray-600 group-hover:text-primaryOrange'}`}>
                  OUR PRODUCTS <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <span className="absolute bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-primaryOrange to-amber-400 rounded-full transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>

                <div className="absolute top-[60px] left-0 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] transform translate-y-2 group-hover:translate-y-0">
                  <ul className="py-2">
                    {brands?.slice(0, 10).map((brand) => (
                      <li key={brand.id} className="relative group/sub">
                        <div 
                          onClick={() => navigate(`/brand/${brand.slug}`)}
                          className="px-5 py-3 text-gray-700 font-bold text-[13px] hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent hover:text-primaryOrange transition-all flex justify-between items-center capitalize"
                        >
                          {brand.name}
                          <ChevronRight className="w-4 h-4 opacity-60 group-hover/sub:opacity-100 transition" />
                        </div>
                        <div className="absolute top-0 left-full ml-1 w-72 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-[110] transform translate-x-2 group-hover/sub:translate-x-0">
                          <ul className="py-2">
                            {products?.filter(p => p.brand?.id === brand.id || p.brand_name?.toLowerCase() === brand.name?.toLowerCase()).slice(0, 5).map(product => (
                              <li key={product.id} onClick={() => navigate(`/product/${product.slug}`)} className="px-5 py-2.5 text-gray-600 text-[13px] font-medium hover:bg-gray-50 hover:text-primaryOrange transition-colors border-b border-gray-100 truncate">
                                {product.name}
                              </li>
                            ))}
                            <li onClick={() => navigate(`/brand/${brand.slug}`)} className="px-5 py-3 text-primaryOrange text-[13px] font-black hover:bg-orange-50 transition-colors text-center uppercase">
                              View All {brand.name}
                            </li>
                          </ul>
                        </div>
                      </li>
                    ))}
                    {brands?.length > 10 && (
                      <li onClick={() => navigate('/brands')} className="px-5 py-3 text-primaryOrange text-[13px] font-black hover:bg-orange-50 transition-colors text-center uppercase">
                        View All Brands
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* BUILD YOUR MAC - special gradient */}
              <div onClick={() => navigate('/build-your-mac')} className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                <span className={`flex items-center gap-1.5 transition-all duration-300 font-extrabold ${isActive('/build-your-mac') ? 'text-amber-600 drop-shadow-sm' : 'text-amber-600/80 group-hover:text-amber-500'}`}>
                  <MonitorPlay className="w-4 h-4" /> BUILD YOUR MAC
                </span>
                <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transform origin-left transition-transform duration-300 ${isActive('/build-your-mac') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </div>
            </nav>

            {/* Action Icons - with glass morphism */}
            <div className="flex items-center space-x-3 lg:space-x-4 ml-auto">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 text-gray-700 hover:text-primaryOrange transition-all duration-300 border border-gray-200/50 hover:border-primaryOrange/30 shadow-sm"
              >
                <Search className="w-5 h-5" />
              </button>

              <div 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-2.5 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 text-gray-700 hover:text-primaryOrange transition-all duration-300 border border-gray-200/50 hover:border-primaryOrange/30 cursor-pointer shadow-sm"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-primaryOrange to-amber-500 text-white text-[10px] font-black h-[22px] w-[22px] flex items-center justify-center rounded-full shadow-md border-2 border-white">
                    {cart.length}
                  </span>
                )}
              </div>

              <div className="hidden lg:flex items-center ml-2 pl-4 border-l border-gray-200/60">
                {user ? (
                  <button 
                    onClick={logout} 
                    className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200/50 hover:border-red-300 px-4 py-2.5 rounded-xl transition-all duration-300 text-[13px] font-bold shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 bg-gradient-to-r from-primaryOrange to-amber-500 text-white hover:shadow-lg hover:scale-105 px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-[13px] shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar - Enhanced */}
        <div 
          className={`w-full bg-white/60 backdrop-blur-md transition-all duration-300 overflow-hidden z-40 relative ${
            isSearchOpen ? 'max-h-28 py-5 border-b border-gray-200/50' : 'max-h-0 py-0'
          }`}
        >
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for gadget, category, or brand..." 
                className="w-full bg-white/90 backdrop-blur-sm border border-gray-200/80 text-gray-800 rounded-2xl px-6 py-3.5 pr-12 focus:outline-none focus:border-primaryOrange focus:ring-2 focus:ring-primaryOrange/20 transition-all shadow-inner font-['Montserrat']"
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="absolute right-4 top-4 text-gray-400 hover:text-primaryOrange transition">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Categories Sub-Navbar - Premium Light with soft shadow */}
        <div className={`hidden lg:block bg-white/70 backdrop-blur-sm w-full border-t border-gray-100 z-30 shadow-md relative transition-all duration-500 ${
          isScrolled ? 'max-h-0 opacity-0 overflow-hidden border-transparent pointer-events-none' : 'max-h-[100px] opacity-100 overflow-visible border-b border-gray-100'
        }`}>
          <div className="w-full px-4 lg:px-6 xl:px-8">
            <ul className="flex items-center justify-center flex-nowrap gap-x-6 lg:gap-x-10 py-3 w-full font-['Montserrat']">
              {groupedCategories.map(([groupName, groupCategories]) => (
                <li key={groupName} className="relative group/main shrink-0">
                  <div className="flex items-center gap-1.5 text-gray-700 hover:text-primaryOrange font-semibold tracking-wide text-[12px] xl:text-[13px] cursor-pointer transition-all duration-300 py-1 px-2 rounded-lg hover:bg-gray-100/50">
                    {groupName}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover/main:text-primaryOrange transition-colors" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 opacity-0 invisible group-hover/main:opacity-100 group-hover/main:visible transition-all duration-300 z-[120] transform translate-y-2 group-hover/main:translate-y-0">
                    <div className="w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
                      <ul className="py-2">
                        {groupCategories.map((cat) => (
                          <li key={cat.id}>
                            <div 
                              onClick={() => navigate(`/category/${cat.slug}`)}
                              className="px-5 py-3 text-gray-700 font-semibold text-[13px] hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent hover:text-primaryOrange transition-all duration-300 flex items-center capitalize cursor-pointer border-b border-gray-100 last:border-0 hover:pl-6"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2.5 group-hover/sub:bg-primaryOrange transition-colors"></span>
                              {cat.name}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="h-[70px] lg:h-[135px]"></div>

      {/* Mobile Sidebar - keep clean white but with glass elements */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden z-[200] ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeMobileMenu}
      />
      <div className={`fixed top-0 left-0 h-full w-[300px] bg-white/95 backdrop-blur-md z-[210] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col font-['Montserrat'] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm" />
            <div>
              <span className="text-xl font-black tracking-tight text-gray-800">iTech<span className="text-primaryOrange">BOX</span></span>
              <span className="text-[10px] text-gray-500 font-bold block tracking-wide">Bangladesh</span>
            </div>
          </div>
          <button onClick={closeMobileMenu} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-6">
          <ul className="flex flex-col space-y-6 font-extrabold text-gray-800 text-lg tracking-wide uppercase">
            <li onClick={() => { navigate('/'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">HOME</li>
            <li onClick={() => { navigate('/about'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">ABOUT US</li>
            <li onClick={() => { navigate('/products'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">OUR PRODUCTS</li>
            <li onClick={() => { navigate('/build-your-mac'); closeMobileMenu(); }} className="text-amber-600 hover:text-amber-700 cursor-pointer flex items-center gap-2">
              <MonitorPlay className="w-5 h-5" /> BUILD YOUR MAC
            </li>
            <li onClick={() => { navigate('/services'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">OUR SERVICES</li>
            <li onClick={() => { navigate('/contact'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">CONTACT US</li>
          </ul>
        </div>
        <div className="p-5 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          {user ? (
            <button onClick={() => { logout(); closeMobileMenu(); }} className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-red-50 hover:text-red-600 transition">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          ) : (
            <button onClick={() => { navigate('/login'); closeMobileMenu(); }} className="w-full bg-gradient-to-r from-primaryOrange to-amber-500 text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg transition-all">
              <User className="w-5 h-5" /> Sign In / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;