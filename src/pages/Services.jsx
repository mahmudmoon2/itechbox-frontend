// src/pages/Services.jsx
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  // সার্ভিসের ডেটাগুলো একটি অ্যারেতে রাখা হয়েছে যাতে কোড পরিষ্কার থাকে
  const servicesData = [
    {
      id: 1,
      title: "ICT CONSULTANCY",
      description: "We consult for high-end technology implementation at clients' site or implementation of new technology according to the clients' requirement or upgrading, enhancing the existing facilities in the clients end with the new technology integrated with the existing one. iTECH BOX offers a full range of consulting services to help analyze your business requirements for effective implementation of solutions.",
      bullets: [
        "Strategy planning", 
        "Assessment", 
        "Procurement", 
        "Re-engineering solutions", 
        "Planning, audits, best practices etc"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
      reverse: false // ছবি ডানে থাকবে
    },
    {
      id: 2,
      title: "NETWORK & INFRASTRUCTURE SERVICES",
      description: "Growth in the solution integration (SI) services market is fueled by the need for seamless business processes across an organization's complete value chain of customers, partners, suppliers, and employees. iTECH BOX's services enable clients to identify, develop, and implement the best-fit solutions which are equipped to meet their changing business requirements.",
      bullets: [
        "Leverage IT investments", 
        "Minimize risks", 
        "Maximize compatibility", 
        "Maximize interoperability"
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000",
      reverse: true // ছবি বামে থাকবে
    },
    {
      id: 3,
      title: "HARDWARE SALES & SUPPORT SERVICES",
      description: "We offer servers, computers, computer accessories and services by sourcing from local market and from international market as well. Our team of experts is ready to serve you when you are worried due to lack of confidence in 'commitment of service'. You are hereby requested to call us for any kind of requirement of computers, computer parts and services wherever and whenever you need.",
      bullets: [
        "Laptop & Desktop", 
        "Phone & TAB", 
        "IT accessories", 
        "Structured Cabling Systems", 
        "KASPERSKY antivirus", 
        "PC, Server & Storage", 
        "Microsoft Licensing"
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
      reverse: false
    },
    {
      id: 4,
      title: "DOOR TO DOOR EXPRESS DELIVERY",
      description: "Door to Door delivery is the most common and convenient way of delivering products for the customer. We are in charge of all the process beginning with product collection, arrange shipment, customs clearance and deliver at destination. One of the most important parts in the process is storage, consolidation and inland transportation of your products. Door to door delivery is most of all convenience and speed of the process. We will provide you with all the export documentation support in every step.",
      bullets: [],
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000",
      reverse: true
    }
  ];

  return (
    <main className="min-h-screen bg-bgOffWhite">
      
      {/* Hero Section */}
      <section className="bg-textBlack text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primaryOrange/10"></div> {/* Subtle overlay pattern */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">Our Services</h1>
          <div className="flex items-center justify-center gap-2 font-medium text-gray-400">
            <span className="hover:text-primaryOrange cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span className="text-white">Services</span>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col gap-20 md:gap-32">
          {servicesData.map((service, index) => (
            <div 
              key={service.id} 
              // 'lg:flex-row-reverse' ব্যবহার করে ছবি ডানে বা বামে নেওয়া হয়েছে
              className={`flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
            >
              
              {/* Text Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                {/* 01, 02 Watermark style number */}
                <div className="text-6xl font-black text-gray-200 leading-none mb-[-20px]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-textBlack uppercase tracking-tight">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-justify md:text-left">
                  {service.description}
                </p>
                
                {/* Bullet Points */}
                {service.bullets.length > 0 && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 pt-4">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-primaryOrange shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
                  {/* Image with hover zoom effect */}
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay for premium look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="bg-primaryOrange py-20 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-sm tracking-tight">
            Are You Ready to Start a Project?
          </h2>
          <p className="text-white/90 font-medium max-w-2xl mx-auto mb-10 text-lg">
            Let's discuss your requirements and find the best technological solutions for your business.
          </p>
          
          <button 
            onClick={() => navigate('/contact')}
            className="group bg-textBlack text-white hover:bg-white hover:text-textBlack transition-all duration-300 font-bold text-lg px-8 py-4 rounded-full shadow-xl flex items-center justify-center gap-3 mx-auto"
          >
            GET STARTED
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </main>
  );
};

export default Services;