// src/components/ReviewsSection.jsx
import React from 'react';
import { Star, Quote, UserCircle2, CalendarDays } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rakib Hossain',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      date: '15 Mar 2025',
      text: 'Absolutely love my new MacBook M3! The delivery was super fast and the product is 100% genuine. iTechBox is my go-to store for all gadgets now.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      product: 'MacBook Pro M3'
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      location: 'Chittagong',
      rating: 5,
      date: '10 Mar 2025',
      text: 'Excellent service and support. They helped me choose the perfect iPhone 15 Pro. The EMI option made it affordable. Highly recommended!',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      product: 'iPhone 15 Pro'
    },
    {
      id: 3,
      name: 'Tanvir Ahmed',
      location: 'Sylhet',
      rating: 4,
      date: '05 Mar 2025',
      text: 'Great experience with IT Consultancy. They set up our office network perfectly. Professional and quick service. Will definitely come back.',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      product: 'IT Consultancy'
    },
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 font-['Montserrat']">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-primaryOrange font-bold text-sm uppercase tracking-wider bg-orange-50 px-4 py-1.5 rounded-full inline-block mb-3">
          Customer Stories
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryOrange to-amber-500">Customers Say</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Real reviews from real people who trusted iTechBox</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Top quote icon */}
            <div className="relative pt-6 px-6">
              <Quote className="absolute top-4 right-6 w-10 h-10 text-orange-100 opacity-60 group-hover:opacity-100 transition" />
              <div className="flex items-center gap-1 mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-4 italic z-10 relative">
                "{review.text}"
              </p>
            </div>
            {/* Footer with user info */}
            <div className="bg-gray-50/80 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                ) : (
                  <UserCircle2 className="w-10 h-10 text-gray-400" />
                )}
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-primaryOrange bg-orange-50 px-2 py-1 rounded-full">
                  {review.product}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                  <CalendarDays className="w-3 h-3" />
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all button */}
      <div className="text-center mt-10">
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-primaryOrange hover:text-white hover:border-primaryOrange transition-all duration-300">
          Read All Reviews
          <Star className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ReviewsSection;