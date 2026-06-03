// src/components/BlogSection.jsx
import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Gadgets to Buy in 2025',
      excerpt: 'From AI-powered laptops to next-gen smartphones, here are the must-have devices this year...',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format',
      date: 'April 2, 2025',
      author: 'Samiul Islam',
      readTime: '5 min read',
      category: 'Tech Trends',
      slug: 'top-gadgets-2025'
    },
    {
      id: 2,
      title: 'How to Build Your Own Custom Mac for Less',
      excerpt: 'Step-by-step guide to configuring the perfect Mac setup without breaking the bank...',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&auto=format',
      date: 'March 28, 2025',
      author: 'Farhana Akter',
      readTime: '8 min read',
      category: 'DIY',
      slug: 'build-custom-mac'
    },
    {
      id: 3,
      title: 'Why SSD is a Game-Changer for Your PC',
      excerpt: 'Upgrade your old hard drive to SSD and experience blazing fast boot times and app loading...',
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: 'March 20, 2025',
      author: 'Rafiqul Islam',
      readTime: '4 min read',
      category: 'Hardware',
      slug: 'ssd-game-changer'
    },
    {
      id: 4,
      title: 'The Ultimate Gaming Chair Buying Guide',
      excerpt: 'Ergonomics, material, and budget – everything you need to know before buying...',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&auto=format',
      date: 'March 15, 2025',
      author: 'Mehedi Hasan',
      readTime: '6 min read',
      category: 'Gaming',
      slug: 'gaming-chair-guide'
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 font-['Montserrat']">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-center md:text-left">
          <span className="text-primaryOrange font-bold text-sm uppercase tracking-wider bg-orange-50 px-4 py-1.5 rounded-full inline-block mb-3">
            Our Journal
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryOrange to-amber-500">Blog Posts</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl">Insights, tips and news from the tech world</p>
        </div>
        <button className="text-primaryOrange font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300 border-b border-primaryOrange pb-1">
          View All Articles <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full text-primaryOrange">
                {post.category}
              </div>
            </div>
            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primaryOrange transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
                <button className="text-primaryOrange text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;