import React from 'react';
import Cards from '../components/Cards';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RetailerPage = () => {
  return (
    <div className="min-h-screen bg-universe flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          Received an order from retailer?
        </h1>
        <div className="flex flex-wrap gap-6 justify-center w-full max-w-4xl">
          <Cards />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RetailerPage;
