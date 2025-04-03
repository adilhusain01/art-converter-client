import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-amber-50 p-8 rounded-lg border-4 border-orange-700 shadow-lg text-center">
          <div className="mb-6">
            <div className="text-7xl font-bold text-orange-800">404</div>
            <div className="text-3xl font-bold text-orange-700 mt-2">
              Page Not Found
            </div>
          </div>

          <p className="text-orange-900 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-block py-3 px-6 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded shadow-md transform transition hover:-translate-y-1"
          >
            Return to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
