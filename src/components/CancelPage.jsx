import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-amber-50 p-8 rounded-lg border-4 border-orange-700 shadow-lg text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-orange-800 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-orange-900 mb-6">
            Your payment was cancelled. No worries! You can try again whenever
            you're ready.
          </p>

          <p className="text-orange-900 mb-8">
            If you experienced any issues or have questions, please feel free to
            contact us.
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

export default CancelPage;
