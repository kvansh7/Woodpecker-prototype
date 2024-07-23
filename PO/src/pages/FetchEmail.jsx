import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Adjust path if necessary
import Footer from '../components/Footer'; // Adjust path if necessary

const FetchEmail = () => {
  const [processedData, setProcessedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [salesMessage, setSalesMessage] = useState('');
  const [salesLoading, setSalesLoading] = useState(false);
  const [insertedData, setInsertedData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [dataMessage, setDataMessage] = useState('');

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:5000/process-emails')
      .then(response => {
        setProcessedData(response.data.processed_data);
      })
      .catch(error => {
        console.error('Error processing emails:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSalesDeduction = (data) => {
    setSalesLoading(true);
    axios.post('http://localhost:5000/sales-deduction', { processed_data: data })
      .then(response => {
        setSalesMessage(response.data.message);
        setTimeout(() => setSalesMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(error => {
        console.error('Error performing sales deduction:', error);
        setSalesMessage('Error performing sales deduction');
      })
      .finally(() => {
        setSalesLoading(false);
      });
  };

  const fetchSalesData = () => {
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
    <div className="flex flex-col min-h-screen bg-universe text-white">
      <Navbar />

      <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Processed Emails</h1>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Fetch Processed Emails
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {processedData.length > 0 ? (
              processedData.map((data, index) => (
                <div key={index} className="bg-gray-800 shadow-md rounded-lg p-4 w-full md:w-2/3 lg:w-1/2 transform transition-all hover:scale-105">
                  <h2 className="text-lg font-semibold">Processed Data {index + 1}</h2>
                  <p className="text-sm text-gray-100 mt-2 whitespace-pre-wrap font-mono font-semibold">{data}</p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handleSalesDeduction(data)}
                      className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-200"
                    >
                      Perform Sales Deduction
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-200 mt-2">No processed data available.</p>
            )}
          </div>
        )}

        {salesLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        )}

        {salesMessage && (
          <div className="flex flex-col items-center mt-8 transition-opacity duration-300 ease-in-out">
            <div className="bg-gray-600 shadow-md rounded-lg p-4 w-full md:w-2/3 lg:w-1/2">
              <h2 className="text-lg font-semibold">Sales Deduction</h2>
              <p className="text-sm text-gray-200 mt-2">{salesMessage}</p>
            </div>
          </div>
        )}

        {/* Button to Fetch and Show/Hide Table */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={fetchSalesData}
            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            Fetch Sales Data
          </button>
        </div>

        {/* Table Display */}
        {showTable && insertedData.length > 0 && (
          <div className="mt-8 w-3xl flex justify-center h-80 overflow-y-scroll border border-gray-700 p-4">
            <h3 className="text-xl font-light mb-4 text-white">Inserted Data:</h3>
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

        {dataMessage && (
          <div className="mt-8 text-white text-lg">{dataMessage}</div>
        )}
        
      </main>

      <Footer />
    </div>
  );
};

export default FetchEmail;
