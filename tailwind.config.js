/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'italianno': ['Italianno', 'cursive'],
        'seriflogo': ['"Playfair Display"', 'serif'],
        'tagline': ['Montserrat', 'sans-serif'],
        
      },
      colors: {
        
        // Futuristic theme colors
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        primary: {
          DEFAULT: '#137a13', // Logo green (adjust hex as needed)
          dark: '#0a4d0a',    // Darker green for hover
        },
        accent: {
          DEFAULT: '#000000', // Logo black
          light: '#222',      // Slightly lighter black for backgrounds
        },
        white: '#ffffff',
        // Remove or override previous cyan/blue if not needed
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 0 rgba(6, 182, 212, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'inner-xl': 'inset 0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
