/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern gradient-friendly primary colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Rich accent colors
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        // Sophisticated secondary colors
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Modern dark theme colors
        dark: {
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
        // Vibrant gradient colors
        gradient: {
          from: '#667eea',
          via: '#764ba2',
          to: '#f093fb',
          'cyan-from': '#06b6d4',
          'cyan-to': '#3b82f6',
          'purple-from': '#8b5cf6',
          'purple-to': '#ec4899',
          'emerald-from': '#10b981',
          'emerald-to': '#06b6d4',
        },
      },
      // Enhanced gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        'accent-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'primary-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
        'nav-item': 'navItem 0.6s ease-out',
        'mobile-slide': 'mobileSlide 0.4s ease-out',
        'logo-pulse': 'logoPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%': {
            boxShadow:
              '0 0 5px rgba(102, 126, 234, 0.5), 0 0 10px rgba(102, 126, 234, 0.5), 0 0 15px rgba(102, 126, 234, 0.5)',
          },
          '100%': {
            boxShadow:
              '0 0 10px rgba(118, 75, 162, 0.8), 0 0 20px rgba(118, 75, 162, 0.8), 0 0 30px rgba(118, 75, 162, 0.8)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        navItem: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        mobileSlide: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        logoPulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            filter: 'brightness(1)',
          },
          '50%': {
            transform: 'scale(1.05)',
            filter: 'brightness(1.1)',
          },
        },
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};
