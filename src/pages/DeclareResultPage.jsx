import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeclareResultPage = () => {
  const [matches, setMatches] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState({});
  const [loadingMatchId, setLoadingMatchId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('https://wagerxplay-api.onrender.com/api/completed', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMatches(res.data))
      .catch((err) => {
        console.error('Failed to fetch matches:', err);
        toast.error('Failed to fetch matches');
      });
  }, []);

  const handleWinnerSelect = (matchId, teamName) => {
    setSelectedWinners((prev) => ({ ...prev, [matchId]: teamName }));
  };

  const declareResult = async (matchId) => {
    const winnerTeam = selectedWinners[matchId];
    if (!winnerTeam) return toast.warn('Please select a team before declaring result');

    try {
      setLoadingMatchId(matchId);
      const token = localStorage.getItem('token');

      await axios.post(
        'https://wagerxplay-api.onrender.com/api/bets/declare-winner',
        { matchId, winnerTeam },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`✅ Winner declared: ${winnerTeam}`);
      setMatches((prev) => prev.filter((m) => m.matchId !== matchId));
    } catch (err) {
      const message = err.response?.data?.message || 'Error declaring result';
      console.error('❌ Error declaring result:', err);
      toast.error(message);
    } finally {
      setLoadingMatchId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-800 dark:text-purple-300">
          Declare Match Results
        </h2>

        {matches.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
            No completed matches available.
          </p>
        ) : (
          matches.map((match) => (
            <div
              key={match.matchId}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5 mb-6"
            >
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Match ID:{' '}
                <span className="text-purple-700 dark:text-purple-400">
                  {match.matchId}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                <select
                  value={selectedWinners[match.matchId] || ''}
                  onChange={(e) =>
                    handleWinnerSelect(match.matchId, e.target.value)
                  }
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500"
                >
                  <option value="">Select winner</option>
                  {match.teams.map((team) => (
                    <option key={team.teamName} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => declareResult(match.matchId)}
                  disabled={
                    !selectedWinners[match.matchId] ||
                    loadingMatchId === match.matchId
                  }
                  className={`px-5 py-2 rounded text-white transition ${
                    loadingMatchId === match.matchId
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {loadingMatchId === match.matchId
                    ? 'Declaring...'
                    : 'Declare Winner'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeclareResultPage;
