import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Home, Heart, Mail, Calendar } from 'lucide-react'
import confetti from 'canvas-confetti'
import Navbar from '../components/Navbar'

function ThankYou() {
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10B981', '#F97316', '#FB923C']
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-white to-primary/5">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="p-4 sm:p-6 bg-success/10 rounded-full">
                <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-success" />
              </div>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 p-1.5 sm:p-2 bg-primary rounded-full">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
              Welcome to HopeConnect!
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Thank you for taking the first step towards making a difference.
              Your volunteer application has been successfully submitted.
            </p>
          </div>

          {/* What's Next Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6">What happens next?</h2>

            <div className="space-y-4 sm:space-y-6 text-left">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1 text-sm sm:text-base">Review Process</h3>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    Our team will carefully review your application within 2-3 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1 text-sm sm:text-base">Orientation</h3>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    Once approved, you'll be invited to our volunteer orientation program.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1 text-sm sm:text-base">Start Making Impact</h3>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    Begin your volunteer journey and start creating positive change!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center pt-6 sm:pt-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              Back to Home
            </Link>
          </div>

          {/* Contact Info */}
          <div className="pt-6 sm:pt-8 text-center">
            <p className="text-text-secondary text-sm sm:text-base">
              Questions? Contact us at{' '}
              <a href="mailto:volunteers@hopeconnect.org" className="text-primary hover:text-primary-light font-medium break-all">
                volunteers@hopeconnect.org
              </a>
              {' '}or call{' '}
              <a href="tel:+919876543210" className="text-primary hover:text-primary-light font-medium">
                +91 98765 43210
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
