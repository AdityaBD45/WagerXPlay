// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BetPage from './pages/BetPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyBetsPage from './pages/MyBetsPage'
import DeclareResultPage from './pages/DeclareResultPage'
import DepositPage from './pages/DepositPage'      // ✅ NEW
import WithdrawPage from './pages/WithdrawPage'    // ✅ NEW
import DepositRequestsPage from './pages/DepositRequestsPage';
import WithdrawRequestsPage from './pages/WithdrawRequestsPage';
import DepositHistoryPage from './pages/DepositHistoryPage';
import WithdrawHistoryPage from './pages/WithdrawHistoryPage';
import Navbar from './components/Navbar'
import TermsModal from './components/TermsModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bet/:matchId" element={<BetPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-bets" element={<MyBetsPage />} />
        <Route path="/admin/declare-result" element={<DeclareResultPage />} />
        <Route path="/deposit" element={<DepositPage />} />     {/* ✅ NEW */}
        <Route path="/withdraw" element={<WithdrawPage />} />   {/* ✅ NEW */}
        <Route path="/admin/deposits" element={<DepositRequestsPage />} />
        <Route path="/admin/withdraw-requests" element={<WithdrawRequestsPage />} />
        <Route path="/deposit-history" element={<DepositHistoryPage />} />
        <Route path="/withdraw-history" element={<WithdrawHistoryPage />} />
        <Route path="/terms" element={<TermsModal />} />
      </Routes>
    </div>
  )
}

export default App
