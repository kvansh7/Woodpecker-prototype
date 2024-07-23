import React from 'react';
import PercentageMetrics from '../components/PercentageMetrics';
import SalesPrediction from '../components/SalesPrediction';
import ReorderRecommendations from '../components/ReorderRecommendations'; // Import the new component
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DataVisualizer from '../components/DataVisualizer';

const MLPage = () => {
  return (
    <div className="min-h-screen flex flex-col"> {/* Use flex column layout */}
      <div className="flex-1 p-6 pb-16 bg-[#04052E]"> {/* Adjust padding-bottom for space for footer */}
        <Navbar />
        <h1 className="text-4xl font-bold text-white text-center mb-10">ML Sales Analysis</h1>
        <div className="mb-6">
          <PercentageMetrics />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <SalesPrediction />
          <div className="w-full md:w-1/2">
            <DataVisualizer/>
          </div>
        </div>
        <ReorderRecommendations /> {/* Add the new component */}
      </div>
      <Footer className="fixed bottom-0 w-full" /> {/* Ensure footer is fixed */}
    </div>
  );
};

export default MLPage;
