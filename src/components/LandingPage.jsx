import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
// Stripe related imports removed

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState(false); // Removed as success is handled by redirect
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !image) {
      setError("Please provide both email and image");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", image);

    try {
      // 1. Call backend to create order and get Razorpay details
      const orderResponse = await fetch(
        `${import.meta.vite.VITE_SERVER_URL}/api/submit-order`,
        {
          method: "POST",
          body: formData,
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      // 2. Prepare Razorpay options
      const options = {
        key: orderData.razorpayKeyId, // Your Razorpay Key ID from backend
        amount: orderData.amount, // Amount is in currency subunits. E.g., 50000 refers to 50000 paise or ₹500.
        currency: orderData.currency,
        name: "Retro Art Conversion", // Your business name
        description: "Custom retro art conversion service",
        order_id: orderData.razorpayOrderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          // Payment successful: Redirect to your success page
          // You can optionally verify payment signature on client, but server-side webhook is more reliable
          console.log("Razorpay Success Response:", response);
          // Use the internalOrderId returned from our backend for the success URL
          window.location.href = `/success?order_id=${orderData.internalOrderId}`;
        },
        prefill: {
          // We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          email: email, // Your customer's email address
        },
        notes: {
          address: "Customer Address (Optional)", // Optional notes
        },
        theme: {
          color: "#EA580C", // Match your theme color (orange-700)
        },
        modal: {
          ondismiss: function () {
            // Handle payment modal dismissal (user closed it)
            console.log("Razorpay checkout modal closed.");
            setError("Payment cancelled or modal closed.");
            setLoading(false); // Re-enable button if needed
          },
        },
      };

      // 3. Open Razorpay Checkout
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        // Handle payment failure
        console.error("Razorpay Payment Failed:", response.error);
        setError(
          `Payment Failed: ${response.error.description} (Reason: ${response.error.reason})`
        );
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      console.error("Submission/Payment Error:", err);
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-amber-50 p-6 rounded-lg border-4 border-orange-700 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-800 mb-2">
              Retro Art Conversion
            </h1>
            <div className="w-32 h-1 bg-orange-700 mx-auto mb-4"></div>
            <p className="text-orange-900">
              Upload your image and get a unique retro art piece for just $4!
            </p>
          </div>

          {/* Success message block removed - success is handled by redirect */}
          {/* The form is now always displayed until submission triggers Razorpay */}
          {
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-orange-800 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-orange-600 rounded bg-amber-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-orange-800 font-medium mb-2">
                  Upload Image
                </label>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="image-upload-container w-full h-40 border-2 border-dashed border-orange-600 rounded bg-amber-100 flex items-center justify-center cursor-pointer hover:bg-amber-200 transition"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="preview-image h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-orange-800">
                        Click to select an image
                      </p>
                      <p className="text-orange-600 text-sm">
                        JPG, PNG, GIF (max 5MB)
                      </p>
                    </div>
                    /* Closing parenthesis for the removed conditional block */
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-button w-full py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded shadow-md transform transition hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Pay $4 & Submit"}
              </button>

              <div className="text-center text-orange-800 text-sm">
                <p>Safe & secure payment via Razorpay</p>
              </div>
            </form>
          }
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-orange-800 mb-4 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="step-number w-16 h-16 bg-orange-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-bold text-orange-800">Upload Image</h3>
              <p className="text-orange-900">
                Upload any image you'd like converted
              </p>
            </div>
            <div className="text-center p-4">
              <div className="step-number w-16 h-16 bg-orange-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-bold text-orange-800">Pay $4</h3>
              <p className="text-orange-900">Secure payment through Razorpay</p>
            </div>
            <div className="text-center p-4">
              <div className="step-number w-16 h-16 bg-orange-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-bold text-orange-800">Get Your Art</h3>
              <p className="text-orange-900">
                Receive your retro art via email
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
