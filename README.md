# 🏏 WagerXPlay Frontend

This is the frontend application for **WagerXPlay**, a cricket sports betting simulation platform. Built with **React**, **Vite**, **Tailwind CSS**, and **Redux**, this project serves as an educational tool to help us learn frontend development, state management, and how to structure scalable UI for real-world applications.

> ⚠️ **Disclaimer:** This project is for educational and skill-building purposes only. It is not intended for real-money gambling or commercial use.


check here a how this website looks :
🔗 **Live Site:** [https://wagerxplay.onrender.com](https://wagerxplay.onrender.com)

---

## 🎯 Key Features

### ✅ User Authentication
- Secure login and registration flows.
- JWT-based session management.
- Persistent user session across reloads.

### 🏏 Cricket Match Betting
- Users can place bets on live or upcoming cricket matches.
- Real-time odds are shown, synced with backend updates.
- Bets are locked once the match begins.
- Admin declares match results; winning bets are updated accordingly.

### 💰 Deposit & Withdrawal System
- Users can request deposits and withdrawals.
- Admins approve or reject requests from a dashboard.
- User balances are updated in real-time after admin actions.
- Full deposit and withdrawal history available to the user.

### 📃 Betting History
- Users can track past bets with results (won/lost).
- Matches are timestamped and matched to user activity.

### 📊 Admin Controls (Accessible via Sidebar)
- Declare match results manually.
- Manage user deposit and withdrawal requests.

### 🎨 UI/UX
- Responsive design built with **Tailwind CSS**.
- Navigation and layout follow modern UX standards.
- Clean sidebar-based navigation for quick access to features.

---

## 🧱 Tech Stack

| Tool              | Purpose                                |
|-------------------|----------------------------------------|
| **React**         | Frontend framework                     |
| **Vite**          | Fast development server & bundler      |
| **Tailwind CSS**  | Utility-first CSS framework            |
| **Redux Toolkit** | Global state management                |
| **React Router**  | Client-side routing                    |
| **Axios**         | API requests to the backend            |

---

## 📁 Folder Structure (please view the readme file to see correctly structured folder) 

WagerXPlay/
├── public/ # Static assets
├── src/
│ ├── app/ # Redux store setup
│ ├── components/ # Reusable UI components (e.g., Navbar, Sidebar)
│ ├── features/
│ │ ├── auth/ # Auth slice & logic
│ │ ├── bets/ # Betting slice & API logic
│ ├── pages/ # Main pages (Home, Bet, Login, etc.)
│ ├── App.jsx # Main app with routes
│ ├── main.jsx # App entry point
│ └── index.css # Tailwind base styles
├── index.html # HTML template
├── package.json # Dependencies & scripts
└── vite.config.js # Vite configuration

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AdityaBD45/WagerXPlay.git
cd WagerXPlay

2. Install Dependencies
npm install
3. Start the Development Server
npm run dev
The app will be live at:
http://localhost:5173
📝 License
This project is licensed under the MIT License – meaning you're free to use, copy, modify, merge, publish, and distribute with attribution.

🙏 Acknowledgements
ReactJS Docs

Redux Toolkit Docs

Tailwind CSS Docs

Render.com (for deployment)

Built with ❤️ by AdityaBD45 for learning and exploration.
