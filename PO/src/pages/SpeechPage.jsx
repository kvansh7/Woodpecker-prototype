import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import Footer from '../components/Footer'; // Adjust the import path as necessary
import SpeechToText from '../components/SpeechToText'; // Adjust the import path as necessary
import SpeechCards from '../components/SpeechCards';

const SpeechPage = () => {
  return (
    <div className="flex flex-col h-screen text-white bg-universe">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-universe">
        <h1 className="text-5xl font-bold text-center  mt-[50px]">Record an Ongoing call</h1>
        <SpeechToText />
        <h1 className="text-5xl font-bold text-center mb-4">Orders from Voicemail</h1>
        <SpeechCards/>
      </main>

      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default SpeechPage;
