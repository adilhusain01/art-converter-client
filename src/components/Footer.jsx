import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange-800 text-white py-6 px-6">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-xl font-bold">
              <span className="inline-block transform -rotate-3 mr-1">
                Retro
              </span>
              <span className="inline-block transform rotate-3">Art</span>
            </span>
          </div>

          <p className="text-amber-200 mb-4">
            Turn your ordinary images into extraordinary retro-styled art
            pieces!
          </p>

          <div className="mb-4">
            <a
              href="mailto:contact@retroart.example.com"
              className="text-amber-100 hover:text-white transition"
            >
              contact@retroart.example.com
            </a>
          </div>

          <p className="text-sm text-amber-300">
            &copy; {currentYear} Retro Art Conversion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
