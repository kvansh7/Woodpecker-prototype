import React from 'react';

const dummyOrders = [
  { id: 1, name: 'Fresh Mart', ghee: 100, cheese: 50, milk: 50, totalCost: 7500 },
  { id: 2, name: 'Daily Dairy', ghee: 200, cheese: 80, milk: 120, totalCost: 9000 },
  { id: 3, name: 'Cheese Corner', ghee: 150, cheese: 60, milk: 90, totalCost: 5250 },
  { id: 4, name: 'Ghee Galore', ghee: 120, cheese: 40, milk: 70, totalCost: 6700 }, // New Card
  // Add more dummy data as needed
];

const SpeechCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 mt-8">
      {dummyOrders.map((order) => (
        <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-lg w-[300px] h-[250px] flex flex-col justify-between text-white">
          <div>
            <h3 className="text-xl font-bold mb-2">Order by: {order.name}</h3>
            <p className="text-lg">Ghee: {order.ghee} packs</p>
            <p className="text-lg">Cheese: {order.cheese} packs</p>
            <p className="text-lg">Milk: {order.milk} cartons</p>
          </div>
          <p className="text-lg font-bold mt-auto">Total Cost: Rs.{order.totalCost}</p>
        </div>
      ))}
    </div>
  );
};

export default SpeechCards;
