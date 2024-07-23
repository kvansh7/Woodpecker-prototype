import React from 'react';
import { Link } from 'react-router-dom';
import { chatt, dash, emailf, ML, retail, upload } from '../assets';

const features = [
  {
    title: "Talk to Your Database",
    description: "Ask anything related to your inventory, sales, or purchases and get instant answers. No more complex queries—just straightforward communication.",
    video: chatt,
    route: "/Talk"
  },
  {
    title: "Update Inventory with New Stock",
    description: "Got new stock? Simply upload a PDF to update your inventory and make purchases from manufacturers seamlessly.",
    image: upload,
    route: "/UploadBill"
  },
  {
    title: "Update with New Orders",
    description: "Manage new orders effortlessly by updating your inventory using emails, PDFs, or voice-to-text commands.",
    image: retail,
    route: "/RetailerPage"
  },
  {
    title: "Visualize Your Numbers",
    description: "View and analyze your data with our dashboard. Get all your tables and visualize them in various graphs for better insights.",
    image: dash,
    route: "/Dashboard"
  },
  {
    title: "Forecast Your Stock",
    description: "Predict your stock for the next month using our ML model. Make informed decisions with accurate forecasts.",
    image: ML,
    route: "/ML"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl text-white text-center font-bold mb-12">Features</h2>

        {/* First Feature as Centered Video */}
        <div className="relative flex justify-center mb-12">
          <div className="relative w-2/3">
            <video
              src={features[0].video}
              autoPlay
              loop
              muted
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 rounded-lg" />
          </div>
        </div>
        <div className="text-center text-white mb-12">
          <h3 className="text-3xl font-bold mb-[20px]">{features[0].title}</h3>
          <p className="text-lg mb-4">{features[0].description}</p>
          <Link
            to={features[0].route}
            className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out text-lg font-semibold"
          >
            Learn More →
          </Link>
        </div>

        {/* Rest of the Features */}
        <div className="flex flex-col gap-12">
          {features.slice(1).map((feature, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-center`}
            >
              <div className="flex-1">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg mb-4">{feature.description}</p>
                <Link
                  to={feature.route}
                  className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out text-lg font-semibold"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
