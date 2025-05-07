import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMatches } from '../features/bets/matchApi'
import { motion } from 'framer-motion'
import viratImage from '../assets/virat.webp'

function Home() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getMatches = async () => {
      try {
        const data = await fetchMatches()
        const transformed = data.map(match => ({
          id: match.matchId,
          matchStatus: match.matchStatus,
          teamA: match.teams[0]?.teamName || 'Team A',
          teamB: match.teams[1]?.teamName || 'Team B',
          oddsA: match.teams[0]?.odds || '-',
          oddsB: match.teams[1]?.odds || '-',
        }))
        setMatches(transformed)
      } catch (err) {
        setError('Failed to fetch matches. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    getMatches()
  }, [])

  const liveMatches = matches.filter(match => match.matchStatus === 'live')
  const upcomingMatches = matches.filter(match => match.matchStatus === 'upcoming')

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${viratImage})` }}
    >
      <div className="backdrop-blur-md bg-black/60 dark:bg-gray-900/60 min-h-screen p-6 max-w-6xl mx-auto text-white dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Live Matches</h1>

        {loading ? (
          <p className="animate-pulse">Loading matches...</p>
        ) : error ? (
          <p className="text-red-400 font-medium">{error}</p>
        ) : (
          <>
            {/* Live Matches */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">Live Matches</h2>
              {liveMatches.length === 0 ? (
                <p className="text-gray-300">No live matches available.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {liveMatches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow hover:shadow-lg transition"
                    >
                      <h3 className="text-xl font-semibold mb-3">
                        {match.teamA} vs {match.teamB}
                      </h3>
                      <p className="mb-4">
                        Odds: <span className="font-medium text-green-600 dark:text-green-400">{match.teamA} ({match.oddsA})</span> |{' '}
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">{match.teamB} ({match.oddsB})</span>
                      </p>
                      <Link
                        to={`/bet/${match.id}`}
                        className="inline-block mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow"
                      >
                        Place Bet
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Matches */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">Upcoming Matches</h2>
              {upcomingMatches.length === 0 ? (
                <p className="text-gray-300">No upcoming matches available.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingMatches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow hover:shadow-lg transition"
                    >
                      <h3 className="text-xl font-semibold mb-3">
                        {match.teamA} vs {match.teamB}
                      </h3>
                      <p className="mb-4">
                        Odds: <span className="font-medium text-green-600 dark:text-green-400">{match.teamA} ({match.oddsA})</span> |{' '}
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">{match.teamB} ({match.oddsB})</span>
                      </p>
                      <Link
                        to={`/bet/${match.id}`}
                        className="inline-block mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow"
                      >
                        Place Bet
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white p-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">Contact Us:</p>
          <p className="text-sm">
            Email:{' '}
            <a href="mailto:support@example.com" className="underline">
              support@example.com
            </a>
          </p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <div className="mt-4">
            <a href="#" className="text-blue-400 mx-2">
              Facebook
            </a>
            <a href="#" className="text-blue-400 mx-2">
              Twitter
            </a>
            <a href="#" className="text-blue-400 mx-2">
              Instagram
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">© 2025 Cricket Betting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
