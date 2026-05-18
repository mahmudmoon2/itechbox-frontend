// src/components/Footer.jsx
import React from 'react';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-textBlack text-white pt-20 pb-8 border-t-[5px] border-primaryOrange relative overflow-hidden font-sans">
      
      {/* Background Decor (Optional glow) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primaryOrange rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-16">
          
          {/* 1. Brand Info */}
          <div className="space-y-7">
            
            {/* Logo Section - MATCHED WITH NAVBAR & ENHANCED */}
            <div className="flex items-center gap-4 group cursor-pointer w-max">
              <div className="relative">
                {/* Logo Glow Effect */}
                <div className="absolute inset-0 bg-primaryOrange blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 rounded-full"></div>
                <img 
                  src="/logo.png" 
                  alt="iTechBox Logo" 
                  className="relative h-14 w-14 rounded-full object-cover transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-primaryOrange/50 shadow-[0_0_15px_rgba(255,102,0,0.5)] z-10 bg-white" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[28px] font-black tracking-tight text-white leading-none">
                  iTech<span className="text-primaryOrange drop-shadow-[0_0_8px_rgba(255,102,0,0.5)]">BOX</span>
                </span>
                <span className="text-[11px] text-gray-400 font-bold tracking-[0.25em] uppercase mt-1.5 ml-0.5">
                  Bangladesh
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-[15px] leading-relaxed font-medium pr-4">
              Your premium destination for authentic gadgets, smartphones, and accessories. We bring the latest tech right to your doorstep.
            </p>
            
            <div className="flex space-x-3 pt-2">
              <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-primaryOrange hover:border-primaryOrange text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"><FaFacebookF className="w-4 h-4" /></a>
              <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-primaryOrange hover:border-primaryOrange text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"><FaInstagram className="w-4 h-4" /></a>
              <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-primaryOrange hover:border-primaryOrange text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"><FaTwitter className="w-4 h-4" /></a>
              <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-primaryOrange hover:border-primaryOrange text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"><FaYoutube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-primaryOrange rounded-full shadow-[0_0_8px_rgba(255,102,0,0.8)]"></span> Quick Links
            </h3>
            <ul className="space-y-4 text-[15px] text-gray-400 font-medium">
              {['About Us', 'Store Locator', 'EMI Policy', 'Privacy Policy', 'Terms & Conditions'].map((link, idx) => (
                <li key={idx} className="group flex items-center cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-primaryOrange opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out" />
                  <span className="group-hover:text-primaryOrange transition-colors duration-300">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Customer Support */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-primaryOrange rounded-full shadow-[0_0_8px_rgba(255,102,0,0.8)]"></span> Support
            </h3>
            <ul className="space-y-4 text-[15px] text-gray-400 font-medium">
              {['Track Order', 'Return Policy', 'Warranty Claim', 'FAQs', 'Contact Support'].map((link, idx) => (
                <li key={idx} className="group flex items-center cursor-pointer">
                  <ChevronRight className="w-4 h-4 text-primaryOrange opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out" />
                  <span className="group-hover:text-primaryOrange transition-colors duration-300">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-primaryOrange rounded-full shadow-[0_0_8px_rgba(255,102,0,0.8)]"></span> Contact Us
            </h3>
            <ul className="space-y-6 text-[15px] text-gray-400 font-medium">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="bg-white/5 p-2.5 rounded-lg group-hover:bg-primaryOrange transition-colors duration-300 shadow-md">
                  <MapPin className="w-5 h-5 text-primaryOrange group-hover:text-white transition-colors" />
                </div>
                <span className="mt-1 group-hover:text-gray-200 transition-colors leading-relaxed">Level 6, Bashundhara City Shopping Complex, Panthapath, Dhaka</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="bg-white/5 p-2.5 rounded-lg group-hover:bg-primaryOrange transition-colors duration-300 shadow-md">
                  <Phone className="w-5 h-5 text-primaryOrange group-hover:text-white transition-colors" />
                </div>
                <span className="group-hover:text-gray-200 transition-colors">+880 1730-789571</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="bg-white/5 p-2.5 rounded-lg group-hover:bg-primaryOrange transition-colors duration-300 shadow-md">
                  <Mail className="w-5 h-5 text-primaryOrange group-hover:text-white transition-colors" />
                </div>
                <span className="group-hover:text-gray-200 transition-colors">support@itechbox.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between text-[14px] text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} iTechBox BD. All rights reserved.</p>
          
          {/* Payment Methods */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="text-sm mr-2 hidden sm:block text-gray-400">Secure Payments:</span>
            <div className="flex gap-2">
              {/* Payment icons placeholder - You can add Bkash/Card icons here later */}
              <div className="h-6 w-10 bg-white/10 rounded"></div>
              <div className="h-6 w-10 bg-white/10 rounded"></div>
              <div className="h-6 w-10 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;