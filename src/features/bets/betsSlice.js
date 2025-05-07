import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bets: []
}

const betSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    placeBet: (state, action) => {
      state.bets.push(action.payload)
    }
  }
})

export const { placeBet } = betSlice.actions

export default betSlice.reducer
