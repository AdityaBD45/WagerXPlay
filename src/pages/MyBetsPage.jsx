import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const MyBetsPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchMyBets = async () => {
      try {
        const res = await axios.get('https://wagerxplay-api.onrender.com/api/bets/my-bets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBets(res.data);
      } catch (err) {
        console.error('Error fetching bets:', err);
      }
    };

    if (token) {
      fetchMyBets();
    }
  }, [token]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'won':
        return <span className="bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 px-2 py-1 rounded-full text-xs font-bold">Won</span>;
      case 'lost':
        return <span className="bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-100 px-2 py-1 rounded-full text-xs font-bold">Lost</span>;
      default:
        return <span className="bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-100 px-2 py-1 rounded-full text-xs font-bold">Pending</span>;
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-300">
        My Betting History
      </h2>

      {bets.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl">You haven’t placed any bets yet.</p>
          <p className="text-sm text-gray-500">Once you place a bet, it will show up here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-800 text-sm text-left text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Match ID</th>
                <th className="px-4 py-3">Team Selected</th>
                <th className="px-4 py-3">Amount (₹)</th>
                <th className="px-4 py-3">Odds</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Match Status</th>
                <th className="px-4 py-3">Placed On</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              {bets.map((bet, index) => (
                <motion.tr
                  key={bet._id || index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="px-4 py-3 font-medium">{bet.matchId}</td>
                  <td className="px-4 py-3 text-blue-700 dark:text-blue-300">{bet.betOutcome}</td>
                  <td className="px-4 py-3">₹{bet.betAmount}</td>
                  <td className="px-4 py-3">{bet.betOdds}</td>
                  <td className="px-4 py-3">{getStatusBadge(bet.betStatus)}</td>
                  <td className="px-4 py-3">{bet.matchStatus || 'Unknown'}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {new Date(bet.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyBetsPage;
