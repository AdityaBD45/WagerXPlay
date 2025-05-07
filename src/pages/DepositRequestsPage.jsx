import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DepositRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://wagerxplay-api.onrender.com/api/deposits', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching deposits:', err);
      toast.error('Error fetching deposits');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://wagerxplay-api.onrender.com/api/deposits/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) => prev.filter((req) => req._id !== id));
      toast.success(`Request ${status}`);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Error updating deposit status');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p className="p-6 text-center text-lg dark:text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Pending Deposit Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">No pending requests.</p>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-100 mb-1">
                    <span className="font-semibold">User:</span> {req.userId.username}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 mb-1">
                    <span className="font-semibold">Amount:</span> ₹{req.amount}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 mb-2">
                    <span className="font-semibold">Date:</span> {new Date(req.createdAt).toLocaleString()}
                  </p>
                  <img
                    src={req.screenshotUrl}
                    alt="Screenshot"
                    className="w-64 border rounded-lg shadow cursor-pointer hover:opacity-90"
                    onClick={() => setSelectedImage(req.screenshotUrl)}
                  />
                </div>

                <div className="mt-4 md:mt-0 md:ml-6 flex gap-3">
                  <button
                    onClick={() => handleAction(req._id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req._id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-[90%] max-h-[90%] border-4 border-white rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default DepositRequestsPage;
