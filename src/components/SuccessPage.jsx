import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (orderId) {
      // You could fetch order details here if needed
      // For simplicity, we're just using the order ID from the URL
    }
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-amber-50 p-8 rounded-lg border-4 border-orange-700 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-orange-800 mb-4">
            Payment Successful!
          </h1>

          <p className="text-orange-900 mb-6">
            Thank you for your order! We've received your image and will start
            working on your retro art creation right away.
          </p>

          {orderId && (
            <p className="text-orange-800 mb-6">
              Order ID: <span className="font-mono font-bold">{orderId}</span>
            </p>
          )}

          <p className="text-orange-900 mb-8">
            We'll send your custom retro art to your email as soon as it's
            ready. Please allow 15-20 minutes for processing.
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

export default SuccessPage;
