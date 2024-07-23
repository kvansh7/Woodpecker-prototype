import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Adjust path if necessary
import Footer from '../components/Footer'; // Adjust path if necessary
import DataVisualizer from '../components/DataVisualizer';

const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch total sales and purchases
    const fetchTotals = async () => {
      try {
        const salesResponse = await axios.get('http://localhost:5000/total-sales');
        const purchasesResponse = await axios.get('http://localhost:5000/total-purchases');
        setTotalSales(salesResponse.data.total);
        setTotalPurchases(purchasesResponse.data.total);
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    };

    fetchTotals();
  }, []);

  const handleButtonClick = async (table) => {
    try {
      const response = await axios.get(`http://localhost:5000/${table}`);
      setData(response.data.result);
      setSelectedTable(table);
    } catch (error) {
      console.error(`Error fetching ${table} data:`, error);
    }
  };

  return (
    <div className="bg-universe">
      <main className="flex-grow p-1">
      <Navbar/>
        <div className="flex flex-col items-center mb-8 mt-[50px]">
          <div className="bg-[#2E2A5C] shadow-lg rounded-lg p-6 w-full max-w-4xl">
            <h1 className="text-3xl font-semibold mb-6 text-gray-100">Dashboard</h1>
            <div className="flex justify-around mb-6">
              <div className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-4 shadow-md">
                <p className="text-sm font-medium">Total Sales</p>
                <p className="text-xl font-bold">{totalSales}</p>
              </div>
              <div className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-4 shadow-md">
                <p className="text-sm font-medium">Total Purchases</p>
                <p className="text-xl font-bold">{totalPurchases}</p>
              </div>
            </div>
            <div className="flex justify-around mb-6">
              <button
                onClick={() => handleButtonClick('inventory')}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300"
              >
                Inventory
              </button>
              <button
                onClick={() => handleButtonClick('sales')}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300"
              >
                Sales
              </button>
              <button
                onClick={() => handleButtonClick('purchases')}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300"
              >
                Purchases
              </button>
            </div>
          </div>
        </div>

        {selectedTable && (
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Table: {selectedTable}</h2>
            <div className="overflow-y-auto">
              <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg">
                <thead className="bg-gray-600 border-b border-gray-500">
                  <tr>
                    {data[0] && Object.keys(data[0]).map((key) => (
                      <th key={key} className="px-4 py-2 text-left text-gray-300">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-600">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="px-4 py-2 border-b border-gray-600 text-gray-200">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <DataVisualizer />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
