// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import { Target, Eye, CheckCircle2, Lightbulb, ShieldCheck, Briefcase, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const About = () => {
  const navigate = useNavigate();

  // ব্যাকএন্ড থেকে আসা ক্লায়েন্ট লোগো রাখার স্টেট
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // কম্পোনেন্ট লোড হওয়ার সাথে সাথে Django API কল করা
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // আপনার urls.py অনুযায়ী সঠিক API এন্ডপয়েন্ট
        const response = await axios.get('http://127.0.0.1:8000/api/store/clients/'); 
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching client logos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <main className="min-h-screen bg-bgOffWhite">
      
      {/* Hero Section */}
      <section className="bg-textBlack text-white py-20 md:py-28 relative overflow-hidden mt-16 md:mt-24">
        <div className="absolute inset-0 bg-primaryOrange/5"></div> 
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">About Us</h1>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto mb-6 text-lg">
            A purely IT-based company providing one-stop automated solutions for your trade and industry.
          </p>
          <div className="flex items-center justify-center gap-2 font-medium text-gray-500">
            <span className="hover:text-primaryOrange cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Mission Card */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primaryOrange group">
            <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-primaryOrange" />
            </div>
            <h2 className="text-3xl font-black text-textBlack mb-4 uppercase tracking-tight">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              Our Mission is to achieve the reputation of a quality, high standard & reliable IT Product vendor in the ICT industry through utmost quality, dedicated services and commitment.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-textBlack group">
            <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-8 h-8 text-textBlack" />
            </div>
            <h2 className="text-3xl font-black text-textBlack mb-4 uppercase tracking-tight">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              Our Vision is to achieve 100% customer satisfaction by delivering quality products and services at an affordable cost. Our forward vision is to strive to become an entity in technology based corporate solutions, capable of demanding unconditional response from the targeted niche. We also believe that for our scope of improvisation - sky is the limit and we are always ready to take our achievements to the next level.
            </p>
          </div>

        </div>
      </section>

      {/* Story Sections (Who We Are & History) */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Who We Are */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Who We Are - Team" 
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h4 className="text-primaryOrange font-bold tracking-widest uppercase">Who We Are</h4>
              <h2 className="text-3xl md:text-4xl font-black text-textBlack uppercase tracking-tight">
                Professionals with Vivid Experience
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                The company has been formed by a group of professionals having vivid experience and wide exposure in Information Technology. People involved here are young qualified business graduates and qualified engineers from the renowned universities across Bangladesh.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                The resource personnel working in the company have been consistently providing reliable Authorize Product & services and consultancy to a wide variety of corporate houses either in the capacity of executive or as business partner or consultant. Bottom line of the company philosophy is building a long-term business partnership with its clients where interpersonal relationship, reliability, assured quality and target oriented modern technology are the major building blocks.
              </p>
            </div>
          </div>

          {/* Our History */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                  alt="Our History - Office" 
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="text-primaryOrange">
                    <Award className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-textBlack">Est. 2018</h3>
                    <p className="text-sm font-bold text-gray-500 uppercase">December</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h4 className="text-primaryOrange font-bold tracking-widest uppercase">Our History</h4>
              <h2 className="text-3xl md:text-4xl font-black text-textBlack uppercase tracking-tight">
                Advancing at a Tremendous Pace
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                <strong>iTechBox</strong> is a purely IT based company established in December 2018. iTechBox provides one stop automated solution for your trade and industry. Depending on the size and field of your organization, we have different products and services to meet your requirements. We provide Product delivery made for your organization.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                iTechBox is focusing exclusively in Best quality Products and cost-effective IT Solution development and implementation of services. We are advancing on a tremendous pace and with involvement of skilled and experienced people working in the organization. iTechBox is currently doing business in Banking, MNCs, Corporate, SME Company & IT companies.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h4 className="text-primaryOrange font-bold tracking-widest uppercase mb-2">Why Choose Us</h4>
          <h2 className="text-3xl md:text-5xl font-black text-textBlack uppercase tracking-tight max-w-3xl mx-auto">
            Providing Appropriate Business Solutions
          </h2>
          <p className="text-gray-600 mt-6 max-w-4xl mx-auto leading-relaxed">
            It is a company where professionals from both technical and functional field group together with an objective of providing appropriate business solutions. We constantly strive to be a leading technology firm with profound business and we want to establish ourselves as the best choice in Computing and Information Technology Services, Consultancy and Development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
          
          {/* Keys for Development */}
          <div>
            <h3 className="text-2xl font-black text-textBlack mb-6 flex items-center gap-3">
              <Lightbulb className="w-7 h-7 text-primaryOrange" />
              Our Keys for Development
            </h3>
            <ul className="space-y-4">
              {['Desire for Excellence', 'Trust and confidence build-up', 'Innovation', 'Transparency', 'Teamwork'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-primaryOrange transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-primaryOrange shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* We Believe In */}
          <div>
            <h3 className="text-2xl font-black text-textBlack mb-6 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-textBlack" />
              We Believe In
            </h3>
            <ul className="space-y-4">
              {['Motivation', 'Collective responsibility and leadership', 'Professionalism and ethics', 'Adding values to our client needs'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-textBlack transition-colors">
                  <Briefcase className="w-5 h-5 text-textBlack shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Happy Clients Section - DYNAMIC API DATA */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-textBlack uppercase tracking-tight mb-12">
            Our Happy Clients
          </h2>
          
          {loading ? (
            <div className="text-gray-500 font-bold animate-pulse">Loading clients...</div>
          ) : clients && clients.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {clients.map((client) => (
                <div 
                  key={client.id}
                  className="bg-white px-6 py-4 md:px-8 md:py-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primaryOrange transition-all duration-300 flex items-center justify-center min-w-[140px] md:min-w-[180px] h-[100px] group cursor-pointer"
                  title={client.name}
                >
                  <img 
                    src={client.logo} 
                    alt={`${client.name} Logo`} 
                    className="max-h-12 max-w-[120px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    onError={(e) => {
                      // ইমেজ না পেলে নাম দেখাবে
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="font-bold text-gray-600 uppercase text-sm tracking-wider hidden text-center">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No clients to show at the moment.</div>
          )}

        </div>
      </section>

    </main>
  );
};

export default About;