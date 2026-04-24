// src/components/Footer.jsx
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react'; // UI আইকনগুলো Lucide থেকে
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; // ব্র্যান্ড আইকনগুলো react-icons থেকে

const Footer = () => {
  return (
    <footer className="bg-textBlack text-white pt-16 pb-8 border-t-4 border-primaryOrange">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight italic mb-6">
              <span className="text-white">iTech</span>
              <span className="text-primaryOrange">Box</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premium destination for authentic gadgets, smartphones, and accessories in Bangladesh. We bring the latest tech right to your doorstep.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-primaryOrange transition-colors"><FaFacebookF className="w-4 h-4" /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-primaryOrange transition-colors"><FaInstagram className="w-4 h-4" /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-primaryOrange transition-colors"><FaTwitter className="w-4 h-4" /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-primaryOrange transition-colors"><FaYoutube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">Store Locator</li>
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">EMI Policy</li>
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">Terms & Conditions</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">Track Order</li>
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">Return Policy</li>
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">Warranty Claim</li>
              <li className="hover:text-primaryOrange cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primaryOrange flex-shrink-0 mt-0.5" />
                <span>Level 5, Bashundhara City Shopping Complex, Panthapath, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primaryOrange flex-shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primaryOrange flex-shrink-0" />
                <span>support@itechbox.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} iTechBox. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-6 bg-white p-1 rounded" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 bg-white p-1 rounded" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;