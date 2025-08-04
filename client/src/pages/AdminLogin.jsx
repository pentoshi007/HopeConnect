import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2, Shield } from 'lucide-react'
import Navbar from '../components/Navbar'

function AdminLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    const result = await login(data.email, data.password)

    if (result.success) {
      navigate('/admin')
    } else {
      setError('root', { message: result.error })
    }

    setIsSubmitting(false)
  }

  const handleDemoLogin = async () => {
    setIsSubmitting(true)

    const result = await login('admin@ngo.com', 'admin123')

    if (result.success) {
      navigate('/admin')
    } else {
      setError('root', { message: result.error })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-white to-primary/5">
      <Navbar />

      <div className="max-w-md mx-auto w-full flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 sm:p-4 bg-primary/10 rounded-full">
                <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-2">
              Admin Portal
            </h1>
            <p className="text-text-primary/70 text-sm sm:text-base">
              Access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary/50 transition-all"
                placeholder="admin@hopeconnect.org"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary/50 transition-all"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <div className="bg-error/10 border border-error/20 rounded-xl p-3">
                <p className="text-error text-sm">{errors.root.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-text-primary/70">or</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Demo Admin
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
