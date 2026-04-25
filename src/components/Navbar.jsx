/* eslint-disable no-unused-vars */
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
  
  // Mobile Dropdown States
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);
  
  const { cart, setIsCartOpen, categories, products } = useContext(StoreContext);
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setMobileActiveCategory(null);
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
      {/* Header */}
      <header className="bg-textBlack text-white w-full fixed top-0 left-0 z-[100] shadow-2xl">
        <div className="container mx-auto px-4 lg:px-8 py-2 md:py-3 flex items-center justify-between">
          
          {/* 1. Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -ml-2 text-gray-300 hover:text-primaryOrange transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>

          {/* 2. Logo & Techy Brand Name */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-3 lg:mr-10 py-1 group" 
            onClick={() => navigate('/')}
          >
            {/* Circular Logo */}
            <img 
              src="/logo.png" 
              alt="iTechBox Logo" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 border border-gray-700 shadow-lg" 
            />
            {/* Techy Style Text */}
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
                iTech<span className="text-primaryOrange">BOX</span>
              </span>
              <span className="ml-1.5 md:ml-2 bg-primaryOrange/10 text-primaryOrange border border-primaryOrange/30 text-[10px] md:text-xs font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-widest shadow-sm">
                BD
              </span>
            </div>
          </div>

          {/* 3. Main Navigation (Desktop) */}
          <nav className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-8 font-semibold tracking-wide text-sm uppercase">
            
            <div 
              onClick={() => navigate('/')} 
              className={`cursor-pointer transition-colors hover:text-primaryOrange ${isActive('/') ? 'text-primaryOrange' : 'text-white'}`}
            >
              HOME
            </div>

            {/* About Us (Dropdown removed) */}
            <div 
              onClick={() => navigate('/about')} 
              className={`cursor-pointer transition-colors hover:text-primaryOrange ${isActive('/about') ? 'text-primaryOrange' : 'text-white'}`}
            >
              ABOUT US
            </div>

            {/* OUR PRODUCTS with Nested Dropdown */}
            <div className="relative group cursor-pointer py-4">
              <div className="flex items-center gap-1 text-white hover:text-primaryOrange transition-colors">
                OUR PRODUCTS <ChevronDown className="w-4 h-4" />
              </div>

              <div className="absolute top-[70px] left-0 w-64 bg-white rounded-lg shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <ul className="py-2">
                  {categories && categories.map((category) => (
                    <li key={category.id} className="relative group/sub">
                      <div 
                        onClick={() => navigate(`/category/${category.slug}`)}
                        className="px-5 py-3 text-gray-800 text-sm hover:bg-primaryOrange hover:text-white transition-colors flex justify-between items-center capitalize"
                      >
                        {category.name}
                        <ChevronRight className="w-4 h-4" />
                      </div>

                      <div className="absolute top-0 left-full ml-1 w-72 bg-white rounded-lg shadow-2xl border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50">
                        <ul className="py-2">
                          {products?.filter(p => p.category?.id === category.id || p.category_name?.toLowerCase() === category.name?.toLowerCase())
                            .slice(0, 5)
                            .map(product => (
                            <li 
                              key={product.id}
                              onClick={() => navigate(`/product/${product.slug}`)} 
                              className="px-5 py-2.5 text-gray-600 text-sm hover:bg-gray-50 hover:text-primaryOrange transition-colors border-b border-gray-50 truncate"
                            >
                              {product.name}
                            </li>
                          ))}
                          <li 
                            onClick={() => navigate(`/category/${category.slug}`)}
                            className="px-5 py-3 text-primaryOrange text-sm font-bold hover:bg-gray-50 transition-colors text-center"
                          >
                            View All {category.name}
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div 
              onClick={() => navigate('/services')} 
              className={`cursor-pointer transition-colors hover:text-primaryOrange ${isActive('/services') ? 'text-primaryOrange' : 'text-white'}`}
            >
              OUR SERVICES
            </div>
            
            <div 
              onClick={() => navigate('/contact')} 
              className={`cursor-pointer transition-colors hover:text-primaryOrange ${isActive('/contact') ? 'text-primaryOrange' : 'text-white'}`}
            >
              CONTACT US
            </div>

          </nav>

          {/* 4. Action Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6 ml-auto">
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1 text-gray-200 hover:text-primaryOrange transition-colors"
            >
              <Search className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer text-gray-200 hover:text-primaryOrange transition-colors">
              <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primaryOrange text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md border-2 border-textBlack">
                  {cart.length}
                </span>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <button 
                  onClick={logout} 
                  className="flex items-center gap-2 bg-gray-800 hover:bg-red-600 px-4 py-2 rounded-full transition-colors text-xs font-bold text-white"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <div 
                  onClick={() => navigate('/login')}
                  className="cursor-pointer bg-gray-800 text-white hover:bg-primaryOrange transition-colors p-2.5 rounded-full border border-gray-700"
                >
                  <User className="w-6 h-6" />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Expandable Search Bar */}
        <div 
          className={`w-full bg-gray-900 border-t border-gray-800 transition-all duration-300 overflow-hidden ${
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
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-6 py-3.5 pr-12 focus:outline-none focus:border-primaryOrange focus:bg-gray-850 transition-colors"
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="absolute right-4 top-4 text-gray-400 hover:text-primaryOrange">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20"></div>

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
          
          {/* Mobile Menu Logo & Text */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-10 w-10 rounded-full object-cover border border-gray-200" 
            />
            <div className="flex items-center">
              <span className="text-xl font-black tracking-tighter text-textBlack uppercase">
                iTech<span className="text-primaryOrange">BOX</span>
              </span>
            </div>
          </div>

          <button onClick={closeMobileMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
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
            <button onClick={() => { logout(); closeMobileMenu(); }} className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold">Logout</button>
          ) : (
            <button onClick={() => { navigate('/login'); closeMobileMenu(); }} className="w-full bg-textBlack text-white py-4 rounded-xl font-bold">Login / Register</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;