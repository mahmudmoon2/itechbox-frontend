// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Search, ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // States for Toggles
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cart, setIsCartOpen, categories } = useContext(StoreContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header className="bg-textBlack text-white w-full sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          
          {/* 1. Mobile Menu Button (Hamburger) */}
          <button 
            className="lg:hidden p-2 -ml-2 text-gray-300 hover:text-primaryOrange transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* 2. Logo */}
          <div className="flex-shrink-0 cursor-pointer flex items-center lg:mr-8" onClick={() => navigate('/')}>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight italic">
              <span className="text-white">iTech</span>
              <span className="text-primaryOrange">Box</span>
            </h1>
          </div>

          {/* 3. Main Navigation (Desktop Only) */}
          <nav className="hidden lg:flex flex-1 justify-center items-center space-x-5 xl:space-x-8 font-medium">
            {categories && categories.length > 0 ? (
              categories.slice(0, 8).map((category) => (
                <div 
                  key={category.id} 
                  className="hover:text-primaryOrange cursor-pointer transition-colors py-2 capitalize whitespace-nowrap text-sm xl:text-base"
                >
                  {category.name}
                </div>
              ))
            ) : (
               <div className="text-gray-500 text-sm">Loading...</div>
            )}
            <div 
              onClick={() => navigate('/contact')} 
              className="hover:text-primaryOrange cursor-pointer transition-colors py-2 whitespace-nowrap text-sm xl:text-base"
            >
              Contact Us
            </div>
          </nav>

          {/* 4. Action Icons (Search, Cart, User) */}
          <div className="flex items-center space-x-4 lg:space-x-6 ml-auto">
            
            {/* Search Icon Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1 text-gray-300 hover:text-primaryOrange transition-colors"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Cart Icon */}
            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer text-gray-300 hover:text-primaryOrange transition-colors">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute -top-2 -right-2 bg-primaryOrange text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-md">
                {cart.length}
              </span>
            </div>

            {/* Desktop User Profile / Logout (Hidden on mobile, moved to sidebar) */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <button 
                  onClick={logout} 
                  className="flex items-center gap-2 bg-gray-800 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors text-xs font-bold"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <div 
                  onClick={() => navigate('/login')}
                  className="cursor-pointer bg-gray-800 hover:bg-primaryOrange hover:text-white transition-colors p-1.5 rounded-full border border-gray-700"
                  title="Login"
                >
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* --- Expandable Search Bar (Appears below Navbar when clicked) --- */}
        <div 
          className={`w-full bg-gray-900 border-t border-gray-800 transition-all duration-300 overflow-hidden ${
            isSearchOpen ? 'max-h-24 py-4' : 'max-h-0 py-0 border-transparent'
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for smartphones, gadgets, accessories..." 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:border-primaryOrange transition-colors"
                autoFocus={isSearchOpen}
              />
              <button className="absolute right-4 top-3 text-gray-400 hover:text-primaryOrange">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Sidebar Drawer --- */}
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Content */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h1 className="text-2xl font-black tracking-tight italic">
            <span className="text-textBlack">iTech</span>
            <span className="text-primaryOrange">Box</span>
          </h1>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Sidebar Links (Categories & Contact) */}
        <div className="flex-1 overflow-y-auto py-4">
          <h3 className="px-5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</h3>
          <ul className="flex flex-col">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <li 
                  key={category.id} 
                  className="px-5 py-3 text-textBlack font-medium border-b border-gray-50 hover:bg-primaryOrange/10 hover:text-primaryOrange cursor-pointer capitalize"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li className="px-5 py-3 text-gray-500 text-sm">Loading...</li>
            )}
          </ul>

          <h3 className="px-5 text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-2">Support</h3>
          <div 
            className="px-5 py-3 text-textBlack font-medium border-b border-gray-50 hover:bg-primaryOrange/10 hover:text-primaryOrange cursor-pointer"
            onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
          >
            Contact Us
          </div>
        </div>

        {/* Sidebar Footer (Login/Logout) */}
        <div className="p-5 border-t border-gray-100 bg-gray-50">
          {user ? (
            <button 
              onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
              className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-3 rounded-xl font-bold hover:bg-red-200 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          ) : (
            <button 
              onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} 
              className="w-full flex items-center justify-center gap-2 bg-textBlack text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              <User className="w-5 h-5" /> Login / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;