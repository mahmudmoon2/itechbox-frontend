/* eslint-disable no-unused-vars */
// src/pages/Checkout.jsx
import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal, setCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // ফর্মের ডেটা
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // ১. Unique Order ID জেনারেট করা
    const orderId = `ITB-${Date.now().toString().slice(-6)}`;

    // ২. WhatsApp মেসেজ ফরম্যাট করা
    let message = `*New Order! (ID: ${orderId})*\n`;
    message += `-------------------------\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n\n`;
    
    message += `*Order Items:*\n`;
    cart.forEach((item, index) => {
      const price = item.discount_price ? item.discount_price : item.price;
      message += `${index + 1}. ${item.name} x ${item.quantity} - ৳${(price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Total Price: ৳${cartTotal.toLocaleString()}*\n`;
    message += `-------------------------\n`;
    message += `Please confirm my order.`;

    // ৩. WhatsApp API Link তৈরি করা (আপনার নাম্বারটি দিন)
    const whatsappNumber = "8801730789571"; // এখানে আপনার হোয়াটসঅ্যাপ নাম্বার দিন (880 সহ)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // ৪. WhatsApp-এ রিডাইরেক্ট করা
    window.open(whatsappUrl, '_blank');

    // (ঐচ্ছিক) অর্ডার প্লেস হওয়ার পর কার্ট ক্লিয়ার করে হোমপেজে পাঠানো
    // setCart([]); 
    // navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-primaryOrange hover:underline font-medium">Go back to shopping</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-3xl font-black mb-8 text-textBlack">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side - Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Delivery Details</h2>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="name" required onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primaryOrange" placeholder="e.g. Mahmudul Hasan Moon" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" name="phone" required onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primaryOrange" placeholder="01XXX-XXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
              <textarea name="address" required onChange={handleInputChange} rows="3" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primaryOrange" placeholder="House/Flat, Road, Area, City"></textarea>
            </div>
            <button type="submit" className="w-full bg-primaryOrange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-md mt-6">
              Place Order via WhatsApp
            </button>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate pr-4">{item.quantity}x {item.name}</span>
                <span className="font-bold">৳{(item.quantity * (item.discount_price || item.price)).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center text-lg">
            <span className="font-bold text-gray-500">Total:</span>
            <span className="font-black text-primaryOrange text-2xl">৳{cartTotal.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;