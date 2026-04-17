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
          navy: '#0D1B3E',
          secondaryNavy: '#1A2F5A',
          gold: '#C8932A',
          lightGold: '#FDF3E3',
          blue: '#0EA5E9', // Keeping for legacy/accents
          darkBlue: '#0369A1',
        },
        success: {
          green: '#16A34A',
        },
        offWhite: '#F9F7F2',
      },
      boxShadow: {
        'fintech': '0 4px 24px rgba(14, 165, 233, 0.10)',
      },
      borderRadius: {
        'fintech': '16px',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
