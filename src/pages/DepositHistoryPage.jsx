import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepositHistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('https://wagerxplay-api.onrender.com/api/deposits/history', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHistory(res.data))
      .catch((err) => console.error('Failed to fetch deposit history', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          My Deposit History
        </h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No deposit records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-purple-100 dark:bg-purple-700 text-left">
                <tr>
                  <th className="py-3 px-6 text-gray-700 dark:text-white">Amount (₹)</th>
                  <th className="py-3 px-6 text-gray-700 dark:text-white">Status</th>
                  <th className="py-3 px-6 text-gray-700 dark:text-white">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-3 px-6 text-gray-800 dark:text-gray-100 font-medium">
                      ₹{item.amount}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900'
                            : item.status === 'approved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-900'
                            : 'bg-red-100 text-red-800 dark:bg-red-300 dark:text-red-900'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-gray-600 dark:text-gray-300">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositHistoryPage;
