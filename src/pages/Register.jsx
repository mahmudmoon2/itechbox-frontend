// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // পাসওয়ার্ড ম্যাচিং চেক
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    setLoading(true);
    const res = await register(formData.fullName, formData.email, formData.password);
    setLoading(false);

    if (res.success) {
      alert("Registration successful! Please login.");
      navigate('/login');
    } else {
      // ব্যাকএন্ড থেকে আসা এরর মেসেজ হ্যান্ডেল করা
      setError(typeof res.message === 'object' ? "Registration failed. Try again." : res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bgCloud px-4 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-textBlack tracking-tight">
            Create <span className="text-primaryOrange">Account</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Join the iTechBox community today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryOrange/50 focus:border-primaryOrange transition-all"
              onChange={handleInputChange}
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryOrange/50 focus:border-primaryOrange transition-all"
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryOrange/50 focus:border-primaryOrange transition-all"
              onChange={handleInputChange}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryOrange/50 focus:border-primaryOrange transition-all"
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-textBlack text-white py-4 rounded-xl font-bold text-lg hover:bg-primaryOrange transition-all shadow-lg transform hover:-translate-y-1 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t pt-6 border-gray-100">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primaryOrange font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;