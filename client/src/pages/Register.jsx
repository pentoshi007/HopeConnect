import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, User, Mail, Phone, Heart, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  interest: z.string().min(1, 'Please select an area of interest'),
  availability: z.string().min(10, 'Please describe your availability')
})

const interestOptions = [
  'Education & Literacy',
  'Rural Development',
  'Women Empowerment',
  'Child Welfare',
  'Healthcare & Sanitation',
  'Environmental Conservation',
  'Skill Development & Training',
  'Elderly Care',
  'Disaster Relief',
  'Digital Literacy',
  'Arts & Culture',
  'Food Security & Nutrition'
]

function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(registrationSchema)
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/applicants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        navigate('/thank-you')
      } else {
        const error = await response.json()
        setError('root', { message: error.message || 'Something went wrong' })
      }
    } catch (error) {
      setError('root', { message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-white to-primary/5 fade-in">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-6 sm:mb-8 transition-colors font-medium slide-in-left"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 slide-up">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Join HopeConnect
            </h1>
            <p className="text-text-secondary text-sm sm:text-base">
              Start your volunteer journey with us
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name
              </label>
              <input
                {...register('name')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary/50 transition-all text-sm sm:text-base"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary/50 transition-all text-sm sm:text-base"
                placeholder="your.email@gmail.com"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary/50 transition-all text-sm sm:text-base"
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="text-error text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                <Heart className="h-4 w-4 inline mr-2" />
                Area of Interest
              </label>
              <select
                {...register('interest')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all text-sm sm:text-base"
              >
                <option value="">Select your area of interest</option>
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.interest && (
                <p className="text-error text-sm mt-1">{errors.interest.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                <Clock className="h-4 w-4 inline mr-2" />
                Availability
              </label>
              <textarea
                {...register('availability')}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary/50 resize-none transition-all text-sm sm:text-base"
                placeholder="Tell us about your availability - weekdays/weekends, preferred hours, any time constraints... (e.g., Available weekends 10 AM - 4 PM)"
              />
              {errors.availability && (
                <p className="text-error text-sm mt-1">{errors.availability.message}</p>
              )}
            </div>

            {errors.root && (
              <div className="bg-error/10 border border-error/20 rounded-xl p-4">
                <p className="text-error text-sm">{errors.root.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register