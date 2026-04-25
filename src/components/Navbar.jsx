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
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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
      {/* নোট: এখানে 'fixed' ব্যবহার করা হয়েছে যাতে এটি ১০০% স্টিকি থাকে। 
        এর ফলে আপনার Home.jsx বা মেইন কন্টেইনারে 'pt-20' বা 'pt-24' প্যাডিং দিতে হতে পারে।
      */}
      <header className="bg-white text-textBlack w-full fixed top-0 left-0 z-[100] shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 py-2 md:py-3 flex items-center justify-between">
          
          {/* 1. Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -ml-2 text-gray-800 hover:text-primaryOrange transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>

          {/* 2. Logo - বোরো সাইজ (h-14 এবং md:h-20) */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center lg:mr-10" 
            onClick={() => navigate('/')}
          >
            <img 
              src="/logo.png" 
              alt="iTechBox Logo" 
              className="h-14 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
          </div>

          {/* 3. Main Navigation (Desktop) */}
          <nav className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-8 font-semibold tracking-wide text-sm uppercase">
            
            <div 
              onClick={() => navigate('/')} 
              className={`cursor-pointer transition-colors hover:text-primaryOrange ${isActive('/') ? 'text-primaryOrange' : 'text-gray-700'}`}
            >
              HOME
            </div>

            <div className="relative group cursor-pointer py-4">
              <div className="flex items-center gap-1 text-gray-700 hover:text-primaryOrange transition-colors">
                ABOUT US <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* OUR PRODUCTS with Nested Dropdown */}
            <div className="relative group cursor-pointer py-4">
              <div className="flex items-center gap-1 text-gray-700 hover:text-primaryOrange transition-colors">
                OUR PRODUCTS <ChevronDown className="w-4 h-4" />
              </div>

              <div className="absolute top-[70px] left-0 w-64 bg-white rounded-lg shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <ul className="py-2">
                  {categories && categories.map((category) => (
                    <li key={category.id} className="relative group/sub">
                      <div 
                        onClick={() => navigate(`/category/${category.slug}`)}
                        className="px-5 py-3 text-gray-700 text-sm hover:bg-primaryOrange hover:text-white transition-colors flex justify-between items-center capitalize"
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
              className={`cursor-pointer transition-colors hover:text-primaryOrange ${isActive('/services') ? 'text-primaryOrange' : 'text-gray-700'}`}
            >
              OUR SERVICES
            </div>
            
            <div 
              onClick={() => navigate('/contact')} 
              className={`cursor-pointer transition-colors hover:text-primaryOrange ${isActive('/contact') ? 'text-primaryOrange' : 'text-gray-700'}`}
            >
              CONTACT US
            </div>

          </nav>

          {/* 4. Action Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6 ml-auto">
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1 text-gray-700 hover:text-primaryOrange transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer text-gray-700 hover:text-primaryOrange transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primaryOrange text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md">
                  {cart.length}
                </span>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <button 
                  onClick={logout} 
                  className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-full transition-colors text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <div 
                  onClick={() => navigate('/login')}
                  className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-primaryOrange hover:text-white transition-colors p-2.5 rounded-full border border-gray-200"
                >
                  <User className="w-6 h-6" />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Expandable Search Bar */}
        <div 
          className={`w-full bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
            isSearchOpen ? 'max-h-24 py-4' : 'max-h-0 py-0'
          }`}
        >
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for gadget, category, or brand..." 
                className="w-full bg-gray-50 text-textBlack border border-gray-200 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:border-primaryOrange focus:bg-white transition-colors"
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="absolute right-4 top-3 text-gray-400 hover:text-primaryOrange">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* স্পেসার যাতে কন্টেন্ট নেভবারের নিচে না চলে যায় */}
      <div className="h-20 md:h-24"></div>

      {/* Mobile Sidebar Drawer */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm transition-opacity lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeMobileMenu}
      />

      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[210] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-12 w-auto object-contain" 
          />
          <button onClick={closeMobileMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-5">
          <ul className="flex flex-col space-y-4 font-bold text-gray-700">
            <li onClick={() => { navigate('/'); closeMobileMenu(); }} className="hover:text-primaryOrange uppercase">HOME</li>
            <li className="hover:text-primaryOrange uppercase">ABOUT US</li>
            <li onClick={() => { navigate('/products'); closeMobileMenu(); }} className="hover:text-primaryOrange uppercase">OUR PRODUCTS</li>
            <li onClick={() => { navigate('/services'); closeMobileMenu(); }} className="hover:text-primaryOrange uppercase">OUR SERVICES</li>
            <li onClick={() => { navigate('/contact'); closeMobileMenu(); }} className="hover:text-primaryOrange uppercase">CONTACT US</li>
          </ul>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50">
          {user ? (
            <button onClick={() => { logout(); closeMobileMenu(); }} className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold">Logout</button>
          ) : (
            <button onClick={() => { navigate('/login'); closeMobileMenu(); }} className="w-full bg-textBlack text-white py-3 rounded-xl font-bold">Login / Register</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;