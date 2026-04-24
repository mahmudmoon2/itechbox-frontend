// src/components/CartDrawer.jsx
import React, { useContext } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useContext(StoreContext);
  
  // useNavigate হুকটি অবশ্যই কম্পোনেন্টের ভেতরে থাকতে হবে
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[60] backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-black flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primaryOrange" />
            Your Cart <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{cart.length}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="font-medium text-lg">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-bgCloud p-3 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                {/* Product Image */}
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0].image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>

                {/* Info & Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-textBlack line-clamp-2 leading-tight">{item.name}</h4>
                    <p className="text-primaryOrange font-bold mt-1">৳{item.discount_price ? item.discount_price : item.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Control */}
                    <div className="flex items-center bg-white rounded-md border border-gray-200 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primaryOrange transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="px-3 text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primaryOrange transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    {/* Remove Button */}
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-xl font-black text-textBlack">৳{cartTotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => {
                setIsCartOpen(false); // ড্রয়ার বন্ধ হবে
                navigate('/checkout'); // চেকআউট পেজে যাবে
              }} 
              className="w-full bg-primaryOrange text-white py-3.5 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;