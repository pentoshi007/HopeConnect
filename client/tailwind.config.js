/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#F0FDF4',
        'bg-glass': 'rgba(255,255,255,0.15)',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'primary': '#059669',
        'primary-light': '#10B981',
        'primary-dark': '#047857',
        'accent': '#F97316',
        'accent-light': '#FB923C',
        'accent-dark': '#EA580C',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'ngo-blue': '#0EA5E9',
        'ngo-purple': '#8B5CF6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '20px',
      },
      backdropSaturate: {
        '180': '180%',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31,38,135,0.2)',
      },
    },
  },
  plugins: [],
}
