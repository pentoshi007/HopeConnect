import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Register from './pages/Register'
import ThankYou from './pages/ThankYou'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-bg-main flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
