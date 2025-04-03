import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-orange-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">
          <span className="inline-block transform -rotate-3 mr-1">Retro</span>
          <span className="inline-block transform rotate-3">Art</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-amber-200 transition">
                Home
              </Link>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-amber-200 transition"
              >
                How It Works
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
