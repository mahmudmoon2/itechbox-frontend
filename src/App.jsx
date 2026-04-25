// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Collection from './pages/Collection'; // View All পেজ
import Login from './pages/Login';           // লগইন পেজ
import Register from './pages/Register';     // রেজিস্ট্রেশন পেজ
import Search from './pages/Search';         // সার্চ রেজাল্ট পেজ

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bgOffWhite relative flex flex-col">
        <Navbar />
        <CartDrawer />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            
            {/* View All / Collection Routes */}
            <Route path="/products" element={<Collection type="all" />} />
            <Route path="/collection/:type" element={<Collection />} />
            <Route path="/category/:slug" element={<Collection />} />

            {/* Checkout Route */}
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;