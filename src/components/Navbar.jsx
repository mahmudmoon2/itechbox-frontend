
// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Search, ShoppingCart, User, LogOut, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // StoreContext 
  const { cart, setIsCartOpen, categories, products, brands } = useContext(StoreContext);
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-[100] flex flex-col">
        
        {/* --- 1. Main Dark Navbar --- */}
        <div className="bg-textBlack text-white w-full z-50 shadow-lg relative">
          <div className="container mx-auto px-4 lg:px-8 py-2 md:py-3 flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 -ml-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-primaryOrange transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>

            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-3 lg:mr-10 py-1 group" 
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primaryOrange blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-full"></div>
                <img 
                  src="/logo.png" 
                  alt="iTechBox Logo" 
                  className="relative h-10 w-10 md:h-12 md:w-12 rounded-full object-cover transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-primaryOrange/50 shadow-lg z-10 bg-white" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl md:text-[22px] font-black tracking-tight text-white leading-none">
                  iTech<span className="text-primaryOrange drop-shadow-[0_0_8px_rgba(255,102,0,0.5)]">BOX</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-[0.2em] uppercase mt-0.5 ml-0.5">
                  Bangladesh
                </span>
              </div>
            </div>

            {/* Main Navigation (Desktop) - BEAUTIFIED */}
            <nav className="hidden lg:flex flex-1 justify-center items-center space-x-8 xl:space-x-10 text-[13px] tracking-wider uppercase">
              
              <div onClick={() => navigate('/')} className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                <span className={`transition-colors font-bold ${isActive('/') ? 'text-primaryOrange' : 'text-gray-300 group-hover:text-primaryOrange'}`}>HOME</span>
                <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-primaryOrange transform origin-left transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </div>

              <div onClick={() => navigate('/about')} className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                <span className={`transition-colors font-bold ${isActive('/about') ? 'text-primaryOrange' : 'text-gray-300 group-hover:text-primaryOrange'}`}>ABOUT US</span>
                <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-primaryOrange transform origin-left transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </div>

              {/* OUR PRODUCTS -> Brands Dropdown */}
              <div className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                <div className={`flex items-center gap-1 font-bold transition-colors ${location.pathname.includes('/product') || location.pathname.includes('/brand') ? 'text-primaryOrange' : 'text-gray-300 group-hover:text-primaryOrange'}`}>
                  OUR PRODUCTS <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-primaryOrange transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></span>

                <div className="absolute top-[60px] left-0 w-64 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] transform translate-y-2 group-hover:translate-y-0">
                  <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                  
                  <ul className="py-2">
                    {brands && brands.slice(0, 10).map((brand) => (
                      <li key={brand.id} className="relative group/sub">
                        <div 
                          onClick={() => navigate(`/brand/${brand.slug}`)}
                          className="px-5 py-3 text-gray-700 font-medium text-[13px] hover:bg-primaryOrange/10 hover:text-primaryOrange transition-colors flex justify-between items-center capitalize"
                        >
                          {brand.name}
                          <ChevronRight className="w-4 h-4" />
                        </div>

                        {/* Brand এর প্রোডাক্ট সাব-মেন্যু */}
                        <div className="absolute top-0 left-full ml-1 w-72 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-[110] transform translate-x-2 group-hover/sub:translate-x-0">
                          <ul className="py-2">
                            {products?.filter(p => p.brand?.id === brand.id || p.brand_name?.toLowerCase() === brand.name?.toLowerCase())
                              .slice(0, 5)
                              .map(product => (
                              <li 
                                key={product.id}
                                onClick={() => navigate(`/product/${product.slug}`)} 
                                className="px-5 py-2.5 text-gray-600 text-[13px] hover:bg-gray-50 hover:text-primaryOrange transition-colors border-b border-gray-50 truncate"
                              >
                                {product.name}
                              </li>
                            ))}
                            <li 
                              onClick={() => navigate(`/brand/${brand.slug}`)}
                              className="px-5 py-3 text-primaryOrange text-[13px] font-bold hover:bg-orange-50 transition-colors text-center"
                            >
                              View All {brand.name}
                            </li>
                          </ul>
                        </div>
                      </li>
                    ))}
                    {brands && brands.length > 10 && (
                       <li 
                         onClick={() => navigate(`/brands`)}
                         className="px-5 py-3 text-primaryOrange text-[13px] font-bold hover:bg-orange-50 transition-colors text-center"
                       >
                         View All Brands
                       </li>
                    )}
                  </ul>
                </div>
              </div>

              <div onClick={() => navigate('/services')} className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                <span className={`transition-colors font-bold ${isActive('/services') ? 'text-primaryOrange' : 'text-gray-300 group-hover:text-primaryOrange'}`}>OUR SERVICES</span>
                <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-primaryOrange transform origin-left transition-transform duration-300 ${isActive('/services') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </div>
              
              <div onClick={() => navigate('/contact')} className="relative group cursor-pointer py-4 flex flex-col items-center justify-center">
                <span className={`transition-colors font-bold ${isActive('/contact') ? 'text-primaryOrange' : 'text-gray-300 group-hover:text-primaryOrange'}`}>CONTACT US</span>
                <span className={`absolute bottom-3 left-0 w-full h-0.5 bg-primaryOrange transform origin-left transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </div>

            </nav>

            {/* Action Icons - BEAUTIFIED */}
            <div className="flex items-center space-x-3 lg:space-x-4 ml-auto">
              
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-primaryOrange transition-all duration-300 border border-white/5 hover:border-primaryOrange/30"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <div 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-primaryOrange transition-all duration-300 border border-white/5 hover:border-primaryOrange/30 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primaryOrange text-white text-[10px] font-black h-[22px] w-[22px] flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(255,102,0,0.6)] border-2 border-textBlack">
                    {cart.length}
                  </span>
                )}
              </div>

              {/* User / Login Button */}
              <div className="hidden lg:flex items-center ml-2 pl-4 border-l border-white/10">
                {user ? (
                  <button 
                    onClick={logout} 
                    className="flex items-center gap-2 bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-500 border border-transparent hover:border-red-500/50 px-4 py-2.5 rounded-full transition-all duration-300 text-[13px] font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 bg-gradient-to-r from-primaryOrange to-[#e66a00] text-white hover:shadow-[0_0_15px_rgba(255,102,0,0.4)] hover:scale-105 px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-[13px]"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* --- 2. Expandable Search Bar --- */}
        <div 
          className={`w-full bg-gray-900 border-t border-gray-800 transition-all duration-300 overflow-hidden z-40 relative ${
            isSearchOpen ? 'max-h-24 py-5' : 'max-h-0 py-0'
          }`}
        >
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for gadget, category, or brand..." 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-6 py-3.5 pr-12 focus:outline-none focus:border-primaryOrange focus:bg-gray-850 transition-colors shadow-inner"
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="absolute right-4 top-4 text-gray-400 hover:text-primaryOrange">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* --- 3. White Categories Sub-Navbar (Full Width & Single Line) --- */}
        <div className="hidden lg:block bg-white w-full border-b border-gray-200 z-30 shadow-sm relative">
          <div className="w-full px-2 lg:px-4 xl:px-8">
            
            <ul className="flex items-center justify-center flex-nowrap gap-x-3 lg:gap-x-4 xl:gap-x-6 py-2.5">
              {categories && categories.map((category) => (
                <li key={category.id} className="relative group/cat shrink-0">
                  
                  <div 
                    onClick={() => navigate(`/category/${category.slug}`)}
                    className="flex items-center gap-1 text-gray-700 hover:text-primaryOrange font-semibold text-[11px] lg:text-[12px] xl:text-[13px] cursor-pointer transition-colors py-1 capitalize whitespace-nowrap"
                  >
                    {category.name}
                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover/cat:text-primaryOrange transition-colors" />
                  </div>

                  {/* Category এর আন্ডারে থাকা Products Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-300 z-[120] transform translate-y-2 group-hover/cat:translate-y-0">
                    <div className="w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative">
                      <div className="absolute -top-3 left-0 w-full h-3 bg-transparent"></div>
                      
                      <ul className="py-1.5">
                        {products?.filter(p => p.category?.id === category.id || p.category_name?.toLowerCase() === category.name?.toLowerCase())
                          .slice(0, 5)
                          .map(product => (
                          <li 
                            key={product.id}
                            onClick={() => navigate(`/product/${product.slug}`)} 
                            className="px-4 py-2.5 text-gray-600 text-[12px] xl:text-[13px] hover:bg-orange-50 hover:text-primaryOrange transition-colors border-b border-gray-50 truncate cursor-pointer capitalize font-medium"
                          >
                            {product.name}
                          </li>
                        ))}
                        <li 
                          onClick={() => navigate(`/category/${category.slug}`)}
                          className="px-4 py-3 text-primaryOrange text-[12px] xl:text-[13px] font-bold hover:bg-orange-50 transition-colors text-center cursor-pointer capitalize"
                        >
                          View All {category.name}
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </header>

      {/* Spacer */}
      <div className="h-[70px] lg:h-[125px]"></div>

      {/* Mobile Sidebar Drawer */}
      <div 
        className={`fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm transition-opacity lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeMobileMenu}
      />

      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[210] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-textBlack leading-none">
                iTech<span className="text-primaryOrange">BOX</span>
              </span>
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-0.5">
                Bangladesh
              </span>
            </div>
          </div>
          <button onClick={closeMobileMenu} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-7 h-7 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-5">
          <ul className="flex flex-col space-y-5 font-bold text-gray-700 text-lg">
            <li onClick={() => { navigate('/'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">HOME</li>
            <li onClick={() => { navigate('/about'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">ABOUT US</li>
            <li onClick={() => { navigate('/products'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">OUR PRODUCTS</li>
            <li onClick={() => { navigate('/services'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">OUR SERVICES</li>
            <li onClick={() => { navigate('/contact'); closeMobileMenu(); }} className="hover:text-primaryOrange cursor-pointer">CONTACT US</li>
          </ul>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50">
          {user ? (
            <button onClick={() => { logout(); closeMobileMenu(); }} className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          ) : (
            <button onClick={() => { navigate('/login'); closeMobileMenu(); }} className="w-full bg-primaryOrange text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg">
              <User className="w-5 h-5" /> Sign In / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;