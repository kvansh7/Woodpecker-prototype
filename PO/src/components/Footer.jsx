import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Genie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
