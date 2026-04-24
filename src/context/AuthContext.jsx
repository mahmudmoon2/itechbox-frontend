/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://127.0.0.1:8000/api/auth';

  // অ্যাপ লোড হওয়ার সময় টোকেন চেক করা
  useEffect(() => {
    if (token) {
      // এখানে আপনি চাইলে একটি 'me' এন্ডপয়েন্ট কল করে ইউজারের ডিটেইলস আনতে পারেন
      // আপাতত আমরা টোকেন থাকলেই ইউজারকে অথেন্টিকেটেড ধরছি
      setUser({ loggedIn: true }); 
    }
    setLoading(false);
  }, [token]);

  const register = async (fullName, email, password) => {
    try {
      await axios.post(`${BASE_URL}/register/`, {
        full_name: fullName,
        email: email,
        password: password
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data || "Registration failed" };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login/`, { email, password });
      const { access } = response.data;
      localStorage.setItem('token', access);
      setToken(access);
      setUser({ loggedIn: true });
      return { success: true };
    } catch (error) {
      return { success: false, message: "Invalid email or password" };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};