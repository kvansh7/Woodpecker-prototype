// src/components/InventoryInsights.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const InventoryInsights = () => {
  const [data, setData] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartType, setChartType] = useState('pie');

  // Color palette
  const colors = [
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
  ];

  useEffect(() => {
    // Fetch table data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory');
        setData(response.data.result);

        // Extract parameters (keys) from the data
        if (response.data.result.length > 0) {
          setParameters(Object.keys(response.data.result[0]));
        }
      } catch (error) {
        console.error('Error fetching data for inventory:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update chart data when parameters or chart type change
    if (selectedParameters.length === 2 && data.length > 0) {
      const labels = data.map(row => row[selectedParameters[0]]);
      const values = data.map(row => row[selectedParameters[1]]);

      // Generate colors for datasets if chart type is pie
      const datasetColors = chartType === 'pie' ? colors.slice(0, values.length) : [colors[0]];

      setChartData({
        labels: labels,
        datasets: [
          {
            label: selectedParameters[1],
            data: values,
            backgroundColor: datasetColors,
            borderColor: datasetColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1,
          },
        ],
      });
    }
  }, [selectedParameters, data, chartType]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-secondary text-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Inventory Insights</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Select Parameters:</label>
          <div className="flex space-x-4 mb-2">
            <select
              onChange={(e) => setSelectedParameters([e.target.value, selectedParameters[1]])}
              className="w-full p-2 border border-gray-600 rounded-lg bg-slate-800"
            >
              <option value="">Select Parameter 1</option>
              {parameters.map((param) => (
                <option key={param} value={param}>
                  {param}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedParameters([selectedParameters[0], e.target.value])}
              className="w-full p-2 border border-gray-600 rounded-lg bg-slate-800"
            >
              <option value="">Select Parameter 2</option>
              {parameters.map((param) => (
                <option key={param} value={param}>
                  {param}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Select Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-slate-800"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>

        {chartData.labels.length > 0 && (
          <div className="mt-4">
            {chartType === 'bar' && <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } } } }} />}
            {chartType === 'line' && <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } } } }} />}
            {chartType === 'pie' && <Pie data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } } } }} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryInsights;
