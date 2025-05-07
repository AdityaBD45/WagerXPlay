import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// API URLs
const API_BASE = 'https://wagerxplay-api.onrender.com/api/auth'

// Async Thunks
export const registerUser = createAsyncThunk('auth/registerUser', async (formData, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (formData, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

// Load user from localStorage thunk
export const loadUserFromStorage = createAsyncThunk('auth/loadUserFromStorage', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      return {
        token,
        user: JSON.parse(user)
      }
    }
    return thunkAPI.rejectWithValue('No token or user found')
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to load user from storage')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    message: null
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.message = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.message = 'Registration successful!'
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.message = 'Login successful!'
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.token = null
        state.user = null
        state.error = action.payload
      })
  }
})

export const { logout, setMessage, setToken } = authSlice.actions
export default authSlice.reducer
