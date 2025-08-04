import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Home() {
  const { isAuthenticated } = useAuth()
  const missionRef = useScrollAnimation()
  const cardsRef = useScrollAnimation()
  const impactRef = useScrollAnimation()

  return (
    <div className="min-h-screen bg-bg-main">
      <Navbar />

      {/* Hero Section */}
      <main className="py-16 sm:py-24 lg:py-40 bg-bg-main fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 sm:space-y-12">
            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight slide-up">
                Connect Hearts,
                <br />
                <span className="text-primary">Create Hope</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed slide-up stagger-1">
                Join our mission to build stronger communities through volunteer action.
              </p>
            </div>

            {/* CTA Button - Only show for non-authenticated users */}
            {!isAuthenticated && (
              <div className="pt-6 sm:pt-8 slide-up stagger-2">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-light text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mission Section - Left-aligned with animated icons */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div ref={missionRef} className="space-y-6 scroll-slide-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="h-4 w-4" />
                Our Mission
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                Empowering Communities Through
                <span className="text-primary"> Volunteer Action</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                We believe that every person has the power to create positive change. Through volunteer action,
                we connect passionate individuals with meaningful opportunities to serve communities across India and
                make a lasting impact in our nation.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-accent rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-sm font-bold">10K+</span>
                  </div>
                  <div className="w-10 h-10 bg-success rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">50+</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-primary">10,000+ volunteers</span> across <span className="font-semibold text-accent">50+ cities in India</span>
                </p>
              </div>
            </div>

            {/* Right side - Visual elements */}
            <div ref={cardsRef} className="relative scroll-slide-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 slide-in-right stagger-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Community Impact</h3>
                    <p className="text-sm text-text-secondary">Creating lasting change in Indian communities</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mt-8 slide-in-right stagger-2">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <ArrowRight className="h-6 w-6 text-accent animate-bounce" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Pan-India Reach</h3>
                    <p className="text-sm text-text-secondary">Connecting volunteers across India</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 slide-in-right stagger-3">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-success animate-pulse" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Skill Development</h3>
                    <p className="text-sm text-text-secondary">Grow while making a difference</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 slide-in-right stagger-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">Meaningful Work</h3>
                    <p className="text-sm text-text-secondary">Every action creates ripple effects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - Centered with call-to-action */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/10 rounded-full animate-pulse delay-1000"></div>

        <div ref={impactRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 scroll-fade-in">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              <ArrowRight className="h-4 w-4" />
              Get Started
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              Ready to Make Your
              <span className="text-accent"> Impact?</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Whether you have a few hours a week or can dedicate more time, there's a place for you
              in our community of changemakers.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 py-8">
            <div className="group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Heart className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Flexible Schedule</h3>
              <p className="text-text-secondary">Volunteer on your own terms</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <ArrowRight className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Instant Connection</h3>
              <p className="text-text-secondary">Get matched with opportunities</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-colors">
                <Heart className="h-8 w-8 text-success group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Real Results</h3>
              <p className="text-text-secondary">See your impact in action</p>
            </div>
          </div>

          {/* Only show volunteer CTA for non-authenticated users */}
          {!isAuthenticated && (
            <div className="pt-8">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Heart className="h-6 w-6 group-hover:animate-pulse" />
                Join Our Community
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home