import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Adjust the path according to your directory structure
import Footer from '../components/Footer'; // Adjust the path according to your directory structure
import HowItWorks from '../components/HowItWorks';
import axios from 'axios';
import UploadBoxSales from '../components/UploadBoxSales';

const UploadPage = () => {
  const [dataMessage, setDataMessage] = useState('');
  const [insertedData, setInsertedData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleSuccess = () => {
    setDataMessage('Data successfully added');
  };

  const handleError = (error) => {
    setDataMessage(error || 'Error, please try again');
  };

  const fetchData = () => {
    axios.get('http://localhost:5000/fetch-sales')
      .then(response => {
        setInsertedData(response.data.result);
        setShowTable(true);
        setDataMessage('');
      })
      .catch(() => {
        setDataMessage('Error fetching data.');
      });
  };

  return (
    <div className="flex flex-col min-h-screen relative"
    style={{ 
        background: 'radial-gradient(circle at 20% 20%, #141527, #000011), radial-gradient(circle at 80% 80%, #d085e2, #a76eff), rgba(0, 0, 0, 0.8)', 
        transition: 'background 0.5s ease',
      }}>
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow flex flex-col items-center p-4 relative z-10">
        <h2 className="text-4xl font-bold mb-6 mt-[75px] text-white font-sans">
          UPLOAD YOUR BILL
        </h2>
        
        {/* Upload Box */}
        <div className="w-full max-w-7xl flex justify-center">
          <UploadBoxSales onSuccess={handleSuccess} onError={handleError} />
        </div>

        {/* Message Display */}
        {dataMessage && (
          <div className="mt-8 text-white text-lg">{dataMessage}</div>
        )}

        {/* Button to Show/Hide Table */}
        <div className="mt-8">
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-full bg-light-blue text-white hover:bg-blue-600 transition duration-200"
          >
            Fetch Data
          </button>
        </div>

        {/* Table Display */}
        {showTable && insertedData.length > 0 && (
          <div className="mt-8 w-full max-w-5xl h-80 overflow-y-scroll border border-gray-700 p-4">
            <h3 className="text-2xl font-light mb-4 text-white">Inserted Data:</h3>
            <table className="w-full text-white border-separate border-spacing-2">
              <thead>
                <tr className="bg-gray-800">
                <th className="border border-gray-600 p-2">Sr No.</th>
                  <th className="border border-gray-600 p-2">Product Name</th>
                  <th className="border border-gray-600 p-2">Quantity</th>
                  <th className="border border-gray-600 p-2">Price</th>
                  <th className="border border-gray-600 p-2">Total Price</th>
                  <th className="border border-gray-600 p-2">Sale Date</th>
                </tr>
              </thead>
              <tbody>
                {insertedData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-600 p-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* How It Works Section */}
        <div className="mt-24 relative z-10">
          <HowItWorks />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UploadPage;
