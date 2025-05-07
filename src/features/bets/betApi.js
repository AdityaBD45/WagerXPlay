import axios from 'axios'

export const placeBetApi = async (betData, token) => {
  try {
    const response = await axios.post(
      'https://wagerxplay-api.onrender.com/api/bets/place',
      betData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Bet placement failed:', error.response?.data || error.message)
    throw error
  }
}
