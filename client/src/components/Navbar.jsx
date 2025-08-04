import { Link, useLocation } from 'react-router-dom'
import { Heart, Shield, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isAuthenticated, logout } = useAuth()
    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const isActive = (path) => location.pathname === path

    return (
        <nav className="relative z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 shadow-lg shadow-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Heart className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:text-primary-light transition-colors" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-primary">HopeConnect</span>
                            <span className="text-xs text-text-secondary hidden sm:block">Connecting Hearts, Creating Hope</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {!isAuthenticated && (
                            <Link
                                to="/"
                                className={`transition-colors font-medium ${isActive('/')
                                    ? 'text-primary font-semibold'
                                    : 'text-text-primary hover:text-primary'
                                    }`}
                            >
                                Home
                            </Link>
                        )}

                        {!isAuthenticated && (
                            <Link
                                to="/register"
                                className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Join as Volunteer
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/admin"
                                    className={`flex items-center gap-2 transition-colors font-medium border px-4 py-2 rounded-full ${isActive('/admin')
                                        ? 'text-primary border-primary bg-primary/5'
                                        : 'text-text-secondary hover:text-primary border-gray-200 hover:border-primary/30'
                                        }`}
                                >
                                    <Shield className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => logout()}
                                    className="flex items-center gap-2 text-text-secondary hover:text-error transition-colors font-medium px-4 py-2 rounded-full hover:bg-error/5"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/admin/login"
                                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-medium border border-gray-200 hover:border-primary/30 px-4 py-2 rounded-full"
                            >
                                <Shield className="h-4 w-4" />
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg text-text-primary hover:bg-primary/10 transition-colors"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-xl shadow-primary/10">
                        <div className="px-4 py-6 space-y-4">
                            {!isAuthenticated && (
                                <Link
                                    to="/"
                                    className={`block transition-colors font-medium py-2 ${isActive('/')
                                        ? 'text-primary font-semibold'
                                        : 'text-text-primary hover:text-primary'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            )}

                            {!isAuthenticated && (
                                <Link
                                    to="/register"
                                    className="block bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-full font-medium transition-all duration-200 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Join as Volunteer
                                </Link>
                            )}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/admin"
                                        className={`flex items-center gap-2 transition-colors font-medium py-2 ${isActive('/admin')
                                            ? 'text-primary font-semibold'
                                            : 'text-text-secondary hover:text-primary'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Shield className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            await logout()
                                            setIsMenuOpen(false)
                                        }}
                                        className="flex items-center gap-2 text-text-secondary hover:text-error transition-colors font-medium py-2 w-full text-left"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/admin/login"
                                    className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-medium py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Shield className="h-4 w-4" />
                                    Admin Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
