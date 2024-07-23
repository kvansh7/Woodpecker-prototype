import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-universe">

      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default HomePage;
