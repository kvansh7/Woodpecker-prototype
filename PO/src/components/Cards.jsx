import React from 'react';
import { useNavigate } from 'react-router-dom';
import { email, icon, text } from '../assets'; // Make sure these paths are correct

const cardsData = [
  { title: "Upload PDF", description: "Upload a PDF to instantly check stock data and update the inventory in real-time, ensuring you never run out of essential items.", route: "/UploadSales", image: icon },
  { title: "Fetch Email", description: "Fetch email data to automatically update and manage your inventory efficiently, reducing manual input and errors.", route: "/FetchEmail", image: email },
  { title: "Voice to Text", description: "Convert voice commands to text for quick inventory updates, making it easier to manage your stock hands-free.", route: "/Speech", image: text }
];

const Cards = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex gap-6 justify-center w-full">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="relative w-1/3 h-64 bg-cover bg-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
          style={{ backgroundImage: `url(${card.image})` }}
          onClick={() => handleCardClick(card.route)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg transition-opacity duration-300 hover:bg-opacity-75">
            <h2 className="text-lg font-bold text-white mb-2">{card.title}</h2>
            <p className="text-white text-sm">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
