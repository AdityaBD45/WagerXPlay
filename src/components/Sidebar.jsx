import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSidebar } from '../features/sidebar/sidebarSlice'
import { logout } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaPen, FaWallet, FaHistory, FaSignOutAlt, FaMoneyBillWave, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

// SidebarLink component to handle navigation and closing the sidebar
const SidebarLink = ({ to, children }) => {
  const dispatch = useDispatch()

  return (
    <Link
      to={to}
      onClick={() => dispatch(closeSidebar())} // Close sidebar on click
      className="block px-4 py-2 hover:bg-indigo-600 hover:text-white rounded transition-all duration-300"
    >
      {children}
    </Link>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token, user } = useSelector((state) => state.auth)
  const { isOpen } = useSelector((state) => state.sidebar)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/login')
  }

  // Render nothing if not logged in or sidebar is closed
  if (!token || !isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-40 z-[99]"
        onClick={() => dispatch(closeSidebar())}
      />

      {/* Sidebar */}
      <div className="w-64 h-full bg-gray-900 text-gray-200 p-6 shadow-lg z-[100] fixed top-0 left-0 overflow-y-auto flex flex-col justify-between transition-all duration-300 ease-in-out">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeSidebar())}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
        >
          <FaTimes />
        </button>

        {/* Menu Items */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-indigo-400">Menu</h2>

          <SidebarLink to="/my-bets">
            <FaPen className="inline mr-2" /> My Bets
          </SidebarLink>

          <SidebarLink to="/withdraw">
            <FaWallet className="inline mr-2" /> Withdraw
          </SidebarLink>

          <SidebarLink to="/deposit-history">
            <FaHistory className="inline mr-2" /> Deposit History
          </SidebarLink>

          <SidebarLink to="/withdraw-history">
            <FaHistory className="inline mr-2" /> Withdraw History
          </SidebarLink>

          {user?.isAdmin && (
            <>
              <SidebarLink to="/admin/declare-result">
                <FaPen className="inline mr-2" /> Declare Results
              </SidebarLink>
              <SidebarLink to="/admin/deposits">
                <FaMoneyBillWave className="inline mr-2" /> Deposit Requests
              </SidebarLink>
              <SidebarLink to="/admin/withdraw-requests">
                <FaMoneyBillWave className="inline mr-2" /> Withdraw Requests
              </SidebarLink>
            </>
          )}
        </div>

        {/* User + Logout */}
        <div className="pt-4 border-t border-gray-700 mt-4">
          {user?.username && (
            <div className="text-sm text-gray-300 mb-2">👤 {user.username}</div>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            <FaSignOutAlt className="inline mr-2" /> Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
