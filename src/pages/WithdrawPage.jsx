import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Compressor from 'compressorjs'

const WithdrawPage = () => {
  const [amount, setAmount] = useState('')
  const [screenshotFile, setScreenshotFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success: (compressedFile) => resolve(compressedFile),
        error: (err) => reject(err)
      })
    })
  }

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!amount || !screenshotFile) {
      return toast.error('Amount and QR Code Scanner are required')
    }

    try {
      setUploading(true)
      const compressedFile = await compressImage(screenshotFile)
      const base64 = await toBase64(compressedFile)

      await axios.post(
        'https://wagerxplay-api.onrender.com/api/withdrawals',
        {
          amount,
          screenshotBase64: base64
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      toast.success('Withdrawal request submitted successfully')
      navigate('/')
    } catch (err) {
      console.error('Error submitting withdrawal request:', err)
      toast.error('Withdrawal failed, please try again later')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 space-y-8 border border-blue-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-white">Withdrawal Request</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-blue-700 dark:text-gray-300">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 p-3 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 text-blue-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="screenshot" className="block text-sm font-semibold text-blue-700 dark:text-gray-300">
              Upload QR Code Scanner Screenshot
            </label>
            <input
              type="file"
              id="screenshot"
              accept="image/*"
              onChange={(e) => setScreenshotFile(e.target.files[0])}
              className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 dark:file:bg-blue-600 file:text-blue-700 dark:file:text-white hover:file:bg-blue-200 dark:hover:file:bg-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${
              uploading
                ? 'bg-blue-300 dark:bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500'
            }`}
          >
            {uploading ? 'Submitting...' : 'Submit Withdrawal Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default WithdrawPage
