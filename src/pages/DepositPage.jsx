import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Compressor from 'compressorjs'
import viratImage from '../assets/qr.jpg'

const DepositPage = () => {
  const [amount, setAmount] = useState('')
  const [screenshotFile, setScreenshotFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success(result) {
          resolve(result)
        },
        error(err) {
          reject(err)
        }
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!amount || !screenshotFile) {
      return toast.error('Amount and screenshot are required')
    }

    try {
      setUploading(true)
      const compressedImage = await compressImage(screenshotFile)
      const base64 = await toBase64(compressedImage)

      await axios.post(
        'https://wagerxplay-api.onrender.com/api/deposits',
        { amount, screenshotBase64: base64 },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      toast.success('Deposit request submitted')
      navigate('/')
    } catch (err) {
      console.error('Error submitting deposit request:', err)
      toast.error('Deposit failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 space-y-8 border border-blue-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-white">Deposit Request</h2>

        <div className="text-center">
          <p className="mb-2 font-medium text-blue-700 dark:text-gray-300">Scan this QR to make your payment:</p>
          <img
            src={viratImage}
            alt="Admin QR Code"
            onClick={() => setShowQRModal(true)}
            className="mx-auto w-36 h-36 border border-blue-200 dark:border-gray-500 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer"
          />
          <p className="text-xs mt-1 text-blue-500 dark:text-gray-400">Click to enlarge</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-700 dark:text-gray-300">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 p-3 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 text-blue-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-700 dark:text-gray-300">Upload Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshotFile(e.target.files[0])}
              className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 dark:file:bg-blue-600 file:text-blue-700 dark:file:text-white hover:file:bg-blue-200 dark:hover:file:bg-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${
              uploading
                ? 'bg-blue-300 dark:bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500'
            }`}
            disabled={uploading}
          >
            {uploading ? 'Submitting...' : 'Submit Deposit Request'}
          </button>
        </form>
      </div>

      {showQRModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setShowQRModal(false)}
        >
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg max-w-sm">
            <img
              src={viratImage}
              alt="QR Full View"
              className="w-72 h-72 object-contain mx-auto rounded-md"
            />
            <p className="text-center mt-2 text-sm text-blue-600 dark:text-gray-300">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepositPage
