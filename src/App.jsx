// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';

// এই নিচের দুইটা লাইন অবশ্যই যোগ করবেন
import Login from './pages/Login'; 
import Register from './pages/Register'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bgOffWhite relative flex flex-col">
        <Navbar />
        <CartDrawer />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* এখন এই লাইনগুলো কাজ করবে */}
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