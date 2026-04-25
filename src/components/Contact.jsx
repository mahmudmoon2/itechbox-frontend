// src/pages/Contact.jsx
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // আপনার দেওয়া WhatsApp নাম্বার (Country code সহ, কিন্তু + ছাড়া)
    const phoneNumber = "8801730789571";
    
    // WhatsApp এর জন্য মেসেজ ফরম্যাট তৈরি
    const text = `*New Contact Request from iTechBox*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    
    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    
    // নতুন ট্যাবে WhatsApp ওপেন করা
    window.open(whatsappUrl, '_blank');
    
    // মেসেজ সেন্ড করার পর ফর্ম ক্লিয়ার করা (ঐচ্ছিক)
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-bgOffWhite pt-10 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-textBlack uppercase tracking-tight mb-4">
            Get in <span className="text-primaryOrange">Touch</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Have a question about our products, services, or your order? Fill out the form below and we'll reply to your WhatsApp directly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Left Side: Contact Info & Map */}
          <div className="bg-textBlack text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primaryOrange">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full text-primaryOrange">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Our Location</h3>
                    <p className="text-gray-400 mt-1">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full text-primaryOrange">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone / WhatsApp</h3>
                    <p className="text-gray-400 mt-1">+880 1730-789571</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full text-primaryOrange">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email Us</h3>
                    <p className="text-gray-400 mt-1">support@itechbox.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full text-primaryOrange">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Business Hours</h3>
                    <p className="text-gray-400 mt-1">Saturday - Thursday<br/>10:00 AM - 08:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps iframe */}
            <div className="mt-10 rounded-2xl overflow-hidden border border-gray-700 h-[250px] w-full">
              <iframe 
                src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="iTechBox Location"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Contact Form (WhatsApp Integration) */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-black text-textBlack mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-8 font-medium">We usually reply within a few minutes via WhatsApp.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-textBlack rounded-xl px-5 py-3 focus:outline-none focus:border-primaryOrange focus:bg-white transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-textBlack rounded-xl px-5 py-3 focus:outline-none focus:border-primaryOrange focus:bg-white transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-textBlack rounded-xl px-5 py-3 focus:outline-none focus:border-primaryOrange focus:bg-white transition-colors"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-gray-50 border border-gray-200 text-textBlack rounded-xl px-5 py-3 focus:outline-none focus:border-primaryOrange focus:bg-white transition-colors resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Send via WhatsApp
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Contact;