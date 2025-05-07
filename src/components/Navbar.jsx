import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { fetchUserInfo } from '../features/auth/userApi';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Sidebar from './Sidebar';
import { FaBars, FaSignInAlt, FaUserPlus, FaCloudUploadAlt } from 'react-icons/fa';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (token) {
          const data = await fetchUserInfo();
          setBalance(data.balance);
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err.message);
      }
    };
    getUserInfo();
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      <Sidebar />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900 text-white px-3 sm:px-6 py-2 shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left Side: Logo and Sidebar Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="text-white focus:outline-none text-sm sm:text-base"
              onClick={() => dispatch(toggleSidebar())}
            >
              <FaBars />
            </button>

            <Link
              to="/"
              className="text-sm sm:text-xl font-bold tracking-tight relative group hover:scale-105 transition transform duration-500 whitespace-nowrap"
            >
              <span className="shine-text" data-text="WagerXPlay">WagerXPlay</span>
              <span className="ml-1">🏏</span>
            </Link>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex items-center gap-x-1 sm:gap-x-2 text-[10px] sm:text-xs flex-nowrap overflow-x-auto whitespace-nowrap">
            {token ? (
              <>
                <Link to="/deposit" className="flex items-center px-1 py-0.5 hover:text-green-300 transition">
                  <FaCloudUploadAlt className="mr-1" /> Deposit
                </Link>
                {user?.username && (
                  <span className="flex items-center font-light">
                    👤 {user.username}
                  </span>
                )}
                {balance !== null && (
                  <span className="flex items-center font-light">
                    💰 ₹{balance.toFixed(2)}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-300 hover:text-red-500 px-1 py-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center px-1 py-0.5 hover:text-blue-300 transition">
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
                <Link to="/register" className="flex items-center px-1 py-0.5 hover:text-blue-300 transition">
                  <FaUserPlus className="mr-1" /> Register
                </Link>
              </>
            )}

            {/* Dark mode toggle: small only on small screens */}
            <div className="scale-90 sm:scale-100">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      <style>{`
        .shine-text {
          position: relative;
          display: inline-block;
          color:rgb(22, 99, 214);
        }

        .shine-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          color: transparent;
          background: linear-gradient(120deg, #6f7b8c 40%, #ffffff 42%, #6f7b8c 44%);
          background-size: 200% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shineEffect 1.1s linear infinite;
          pointer-events: none;
        }

        @keyframes shineEffect {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
