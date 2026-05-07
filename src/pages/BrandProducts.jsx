// src/pages/BrandProducts.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductSection from '../components/ProductSection'; // apnar ager toiri kora component

const BrandProducts = () => {
  const { slug } = useParams(); // URL theke brand er nam (slug) ta nibe
  const navigate = useNavigate();
  const { products, brands } = useContext(StoreContext);

  // URL er slug er sathe mil rekhe brand ta khuje ber kora
  const currentBrand = brands?.find(b => b.slug === slug);

  // oi brand er shob products filter kora
  const brandProducts = products?.filter(p => 
    p.brand?.slug === slug || 
    p.brand_name?.toLowerCase() === slug.replace('-', ' ') 
  );

  // Page load hole jeno ekdom upore theke shuru hoy
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!currentBrand) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-bgOffWhite">
        <h2 className="text-2xl font-bold mb-4 text-gray-600">Brand not found!</h2>
        <button onClick={() => navigate('/')} className="bg-primaryOrange text-white px-6 py-2 rounded-full font-bold">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bgOffWhite pt-10 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Brand Logo ba Name dekhano */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center justify-center">
          {currentBrand.logo ? (
            <img src={currentBrand.logo} alt={currentBrand.name} className="h-16 md:h-24 object-contain" />
          ) : (
            <h1 className="text-3xl md:text-5xl font-black text-textBlack uppercase tracking-widest">
              {currentBrand.name}
            </h1>
          )}
        </div>

        {/* Products dekhano (jodi thake) */}
        {brandProducts && brandProducts.length > 0 ? (
          <div className="bg-white py-10 shadow-sm border border-gray-100 rounded-2xl">
            <ProductSection title={`All Products from ${currentBrand.name}`} productsList={brandProducts} />
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl text-gray-500 font-bold">No products available for this brand right now.</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default BrandProducts;