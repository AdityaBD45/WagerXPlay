// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { loadUserFromStorage } from './features/auth/authSlice.js'
import { ThemeProvider } from './context/ThemeContext'  // Import the ThemeProvider

store.dispatch(loadUserFromStorage())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>  {/* Wrap the App component with ThemeProvider */}
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
