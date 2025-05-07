import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, token, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agreed) {
      toast.error('You must agree to the terms and conditions')
      return
    }

    const resultAction = await dispatch(registerUser(formData))

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success('Registration successful!')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } else if (registerUser.rejected.match(resultAction)) {
      toast.error(resultAction.payload || 'Registration failed')
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 bg-opacity-80 dark:bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl relative border border-blue-200 dark:border-gray-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-3 right-4 text-xl font-bold text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          ×
        </button>

        <h2 className="text-3xl font-semibold text-center text-blue-800 dark:text-blue-300 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-gray-300 dark:border-gray-600 p-3 w-full mb-4 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 dark:border-gray-600 p-3 w-full mb-4 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />

          <div className="flex items-start mb-4">
            <input
              id="terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
              I agree to the{' '}
              <span
                className="text-blue-600 dark:text-blue-400 underline cursor-pointer"
                onClick={() => navigate('/terms')}
              >
                Terms & Conditions
              </span>
            </label>
          </div>

          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-medium hover:bg-blue-700 transition-colors"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? 'Registering...' : 'REGISTER'}
          </motion.button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          Powered by <span className="font-semibold">ABD</span><br />
          <a href="mailto:xxxxx@gmail.com" className="underline">
            xxxxx@gmail.com
          </a>
        </p>
      </motion.div>
    </div>
  )
}

export default RegisterPage
