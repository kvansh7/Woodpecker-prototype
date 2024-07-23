import React from 'react';
import { Link } from 'react-router-dom';
const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/Dashboard" },
  { label: "Upload Bill", href: "/UploadBill" },
  { label: "Services", href: "/RetailerPage" },
  { label: "GenieAI", href: "/Talk" },
];
const Navbar = () => {
  return (
    <div className="m-5 w-full bg-transparent text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* DataAI link on the leftmost corner */}
        <Link
          to="/"
          className="text-2xl font-bold cursor-pointer"
        >
          DataAI
        </Link>
        
        {/* Centered navigation items */}
        <ul className="flex flex-grow justify-center space-x-12">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                smooth={true} // Enable smooth scrolling
                duration={500} // Duration of the scroll animation
                className="text-white hover:text-secondary cursor-pointer"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
