

import React from 'react';

const PercentageMetrics = () => {
  const metrics = [
    { percentage: '25%', label: 'Sales Growth' },
    { percentage: '15%', label: 'Customer Retention Rate' },
    { percentage: '5%', label: 'Return Rate' },
    { percentage: '40%', label: 'Market Share' },
  ];

  return (
    <div className="w-full p-6 bg-[#2E2A5C] shadow-md rounded-lg flex justify-between items-center">
      {metrics.map((metric, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-4xl font-bold text-[#72a4d2]">{metric.percentage}</span>
          <span className="text-sm text-white">{metric.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PercentageMetrics;
