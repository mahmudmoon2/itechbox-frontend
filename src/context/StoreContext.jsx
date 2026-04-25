/* eslint-disable react-refresh/only-export-components */
// src/context/StoreContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]); 
  
  // 👉 নতুন স্টেট: জ্যাঙ্গো থেকে আসা ডাইনামিক সেকশন রাখার জন্য
  const [homeSections, setHomeSections] = useState([]); 
  
  const [loading, setLoading] = useState(true);
  
  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const BASE_URL = 'http://127.0.0.1:8000/api/store';

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // 👉 home-sections এর নতুন API কল যোগ করা হলো
        const [productsRes, categoriesRes, brandsRes, bannersRes, sectionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/products/`),
          axios.get(`${BASE_URL}/categories/`),
          axios.get(`${BASE_URL}/brands/`),
          axios.get(`${BASE_URL}/banners/`),
          axios.get(`${BASE_URL}/home-sections/`) // <--- নতুন API কল
        ]);
        
        // পেজিনেশন থাকলেও যেন কাজ করে তাই .results চেক করা হয়েছে
        setProducts(productsRes.data.results || productsRes.data);
        setCategories(categoriesRes.data.results || categoriesRes.data);
        setBrands(brandsRes.data.results || brandsRes.data);
        setBanners(bannersRes.data.results || bannersRes.data); 
        
        // 👉 ডাইনামিক সেকশন সেভ করা হলো
        setHomeSections(sectionsRes.data.results || sectionsRes.data); 
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // --- Cart Functions ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // যদি আগে থেকেই কার্টে থাকে, কোয়ান্টিটি ১ বাড়াবো
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // নতুন আইটেম হলে কার্টে অ্যাড করব
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // অ্যাড করার সাথে সাথে কার্ট ড্রয়ার ওপেন হয়ে যাবে
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; // কোয়ান্টিটি যেন ০ না হয়
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = item.discount_price ? item.discount_price : item.price;
    return total + (price * item.quantity);
  }, 0);

  const contextValue = {
    products, categories, brands, loading,
    banners, 
    homeSections, // 👉 অ্যাপে ব্যবহারের জন্য পাস করে দেওয়া হলো
    cart, addToCart, removeFromCart, updateQuantity, cartTotal,
    isCartOpen, setIsCartOpen
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};