/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'danger': '#EF4444',
        'warning': '#F97316',
        'success': '#22C55E',
        'info': '#3B82F6',
        'slate': {
          '900': '#0f172a',
          '800': '#1e293b',
          '700': '#334155',
          '600': '#475569',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xl': '20px',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

