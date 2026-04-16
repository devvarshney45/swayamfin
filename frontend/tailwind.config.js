/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0EA5E9',
          darkBlue: '#0369A1',
          lightBlue: '#E0F2FE',
        },
        success: {
          green: '#16A34A',
        }
      },
      boxShadow: {
        'fintech': '0 4px 24px rgba(14, 165, 233, 0.10)',
      },
      borderRadius: {
        'fintech': '16px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
