// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) navigate('/');
    else alert(res.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgCloud px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-black mb-6 text-center">Login to iTech<span className="text-primaryOrange">Box</span></h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-xl focus:outline-primaryOrange" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl focus:outline-primaryOrange" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-primaryOrange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">Login</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-primaryOrange font-bold">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;