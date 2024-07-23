import React from 'react';

const ReorderRecommendations = () => {
  const recommendations = [
    { item: 'Item A', currentStock: 20, recommendedReorder: 50 },
    { item: 'Item B', currentStock: 15, recommendedReorder: 40 },
    { item: 'Item C', currentStock: 10, recommendedReorder: 30 },
    { item: 'Item D', currentStock: 25, recommendedReorder: 60 },
  ];

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg text-white mt-6">
      <h2 className="text-2xl font-semibold mb-4">Reorder Recommendations</h2>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex justify-between border-b border-light-blue pb-2">
            <span>{rec.item}</span>
            <span>{`Current Stock: ${rec.currentStock}`}</span>
            <span>{`Recommended Reorder: ${rec.recommendedReorder}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReorderRecommendations;
