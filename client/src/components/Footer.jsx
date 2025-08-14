import { Heart, Twitter, Linkedin, Github } from 'lucide-react'

function Footer() {
    return (
        <footer className="bg-text-primary text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <Heart className="h-6 w-6 text-primary" />
                        <div className="text-center md:text-left">
                            <span className="text-lg font-bold">HopeConnect</span>
                            <p className="text-xs text-gray-300">Connecting Hearts, Creating Hope</p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                        <a
                            href="https://x.com/lunatic_ak_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-primary transition-colors"
                            title="Twitter"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aniket00736/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-primary transition-colors"
                            title="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="https://github.com/pentoshi007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-primary transition-colors"
                            title="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-6 text-center space-y-3">
                    
                    <p className="text-gray-300 text-sm">
                        © 2025 HopeConnect India. Making a difference, one volunteer at a time.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
