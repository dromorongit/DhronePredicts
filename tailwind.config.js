/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00FF87',
        secondary: '#1F6FEB',
        background: '#0B0F1A',
        surface: '#121826',
        surfaceLight: '#1E293B',
        border: '#1E293B',
        text: '#E6EDF3',
        textMuted: '#8B949E',
        accent: '#1F6FEB',
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        vvip: '#ffd700',
        win: '#00C853',
        loss: '#FF5252',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 135, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 135, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
