// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if admin is already authenticated via local storage
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth) {
      setIsAuthenticated(true);
      fetchOrders();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      fetchOrders();
    } else {
      setError("Invalid password");
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ADMIN_API_KEY}`,
          },
        }
      );
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/orders/${orderId}`,
        { workStatus: status },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ADMIN_API_KEY}`,
          },
        }
      );

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, workStatus: status } : order
        )
      );
    } catch (err) {
      setError("Failed to update order status");
      console.error(err);
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.workStatus === filterStatus);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg border-4 border-orange-700 shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-orange-800 mb-6 text-center">
            Admin Login
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-orange-800 font-medium mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg border-4 border-orange-700 shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-orange-800">
              Retro Art Admin Dashboard
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem("adminAuth");
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6 flex items-center space-x-4">
            <label className="font-medium text-orange-800">
              Filter Status:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border-2 border-orange-600 rounded bg-amber-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              onClick={fetchOrders}
              className="ml-auto px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded shadow"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-orange-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-orange-800">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8 bg-amber-100 rounded p-4">
              <p className="text-orange-800">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="border-2 border-orange-600 px-4 py-2 text-left">
                      Date
                    </th>
                    <th className="border-2 border-orange-600 px-4 py-2 text-left">
                      Email
                    </th>
                    <th className="border-2 border-orange-600 px-4 py-2 text-left">
                      Image
                    </th>
                    <th className="border-2 border-orange-600 px-4 py-2 text-left">
                      Payment
                    </th>
                    <th className="border-2 border-orange-600 px-4 py-2 text-left">
                      Status
                    </th>
                    <th className="border-2 border-orange-600 px-4 py-2 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-amber-50">
                      <td className="border-2 border-orange-600 px-4 py-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border-2 border-orange-600 px-4 py-2">
                        {order.email}
                      </td>
                      <td className="border-2 border-orange-600 px-4 py-2">
                        <a
                          href={order.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <img
                            src={order.imageUrl}
                            alt="Customer upload"
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="ml-2">View</span>
                        </a>
                      </td>
                      <td className="border-2 border-orange-600 px-4 py-2">
                        <span
                          className={`inline-block px-2 py-1 rounded ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="border-2 border-orange-600 px-4 py-2">
                        <span
                          className={`inline-block px-2 py-1 rounded ${
                            order.workStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.workStatus === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.workStatus}
                        </span>
                      </td>
                      <td className="border-2 border-orange-600 px-4 py-2">
                        <div className="flex space-x-2">
                          {order.workStatus !== "in-progress" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "in-progress")
                              }
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                              disabled={order.paymentStatus !== "paid"}
                            >
                              Start
                            </button>
                          )}
                          {order.workStatus !== "completed" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "completed")
                              }
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                              disabled={order.paymentStatus !== "paid"}
                            >
                              Complete
                            </button>
                          )}
                          {order.workStatus === "completed" && (
                            <button
                              onClick={() =>
                                window.open(
                                  `mailto:${order.email}?subject=Your%20Retro%20Art%20Is%20Ready!`
                                )
                              }
                              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded"
                            >
                              Email
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
