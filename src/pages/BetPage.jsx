import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchMatches } from '../features/bets/matchApi'
import { motion } from 'framer-motion'

function BetPage() {
  const { matchId } = useParams()
  const [match, setMatch] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState('')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)

  const handlePresetClick = (value) => {
    setAmount((prev) => {
      const prevAmount = parseFloat(prev) || 0
      return (prevAmount + value).toString()
    })
  }

  const handlePlaceBet = async () => {
    if (!selectedTeam || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please select a team and enter a valid amount')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      alert('You must be logged in to place a bet.')
      return
    }

    try {
      const response = await fetch('https://wagerxplay-api.onrender.com/api/bets/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matchId: match.matchId,
          teamSelected: selectedTeam,
          amount: parseFloat(amount),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setResult({
        message: data.message,
        balance: data.updatedBalance,
        winnings: data.potentialWinnings,
      })

      setAmount('')
      setSelectedTeam('')
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    const getMatch = async () => {
      const data = await fetchMatches()
      const foundMatch = data.find(m => m.matchId === matchId)
      if (foundMatch) {
        setMatch(foundMatch)
      } else {
        console.error('Match not found')
      }
    }
    getMatch()
  }, [matchId])

  if (!match) {
    return <div className="p-6 text-red-600 dark:text-red-400">Match not found!</div>
  }

  const team1 = match.teams[0]
  const team2 = match.teams[1]

  const odds = selectedTeam === team1.teamName
    ? team1.odds
    : selectedTeam === team2.teamName
    ? team2.odds
    : 0

  const potentialWin = amount && selectedTeam
    ? (parseFloat(amount) * odds).toFixed(2)
    : '0.00'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-2xl p-8 max-w-md w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-400">
          Bet on: {team1.teamName} vs {team2.teamName}
        </h2>

        <div className="flex flex-col gap-3">
          <button
            className={`w-full p-3 rounded-xl transition-colors duration-200 ${
              selectedTeam === team1.teamName
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-green-100 hover:bg-green-200 text-green-900 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-300'
            }`}
            onClick={() => setSelectedTeam(team1.teamName)}
          >
            {team1.teamName} (Odds: {team1.odds})
          </button>

          <button
            className={`w-full p-3 rounded-xl transition-colors duration-200 ${
              selectedTeam === team2.teamName
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-900 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300'
            }`}
            onClick={() => setSelectedTeam(team2.teamName)}
          >
            {team2.teamName} (Odds: {team2.odds})
          </button>

          <input
            type="number"
            className="border-2 border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:border-indigo-500 bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter bet amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex flex-wrap gap-3 justify-between mt-1">
            {[100, 200, 500, 1000].map((val) => (
              <button
                key={val}
                onClick={() => handlePresetClick(val)}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-white px-4 py-1.5 rounded-lg text-sm font-medium"
              >
                ₹{val}
              </button>
            ))}
          </div>

          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-xl"
            onClick={handlePlaceBet}
          >
            Place Bet
          </button>

          {selectedTeam && (
            <motion.div
              className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-600 rounded-lg text-yellow-800 dark:text-yellow-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              You selected: <strong>{selectedTeam}</strong><br />
              Potential Winnings: ₹ <strong>{potentialWin}</strong>
            </motion.div>
          )}

          {result && (
            <motion.div
              className="mt-4 p-4 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-600 rounded-lg text-green-800 dark:text-green-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-semibold">{result.message}</p>
              <p>Updated Balance: ₹{result.balance}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default BetPage
