import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function TermsModal() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-gradient-to-br from-blue-100 via-white to-blue-50 bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-lg shadow-2xl relative border border-blue-200"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-4 text-xl font-bold text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-4">
          Terms & Conditions
        </h2>

        <div className="text-sm text-gray-700 space-y-3 max-h-80 overflow-y-auto px-1">
          <p>• This platform is for entertainment and simulation purposes only.</p>
          <p>• Bets placed here do not involve real money transactions or winnings.</p>
          <p>• Users must act responsibly. Any misuse may result in account suspension.</p>
          <p>• We are not responsible for any outcomes or emotional consequences of your bets.</p>
          <p>• You agree that odds and match data are subject to change at any time.</p>
          <p>• This app is a fan project and does not claim affiliation with any official leagues or entities.</p>
          <p>• By registering, you confirm that you understand and accept these conditions.</p>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          For questions, contact <a className="underline" href="mailto:xxxxx@gmail.com">xxxxx@gmail.com</a>
        </p>
      </motion.div>
    </div>
  )
}

export default TermsModal
