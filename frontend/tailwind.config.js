/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        'primary-dark': '#0369A1',
        'primary-light': '#E0F2FE',
        'primary-gold': '#D4AF37',
        dark: '#1E293B',
        success: '#16A34A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        plus: ['"Plus Jakarta Sans"', 'sans-serif'],
        'plus-jakarta-sans': ['"Plus Jakarta Sans"', 'sans-serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'premium': '0 4px 24px rgba(14, 165, 233, 0.08)',
        '22xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'premium': '16px',
      }
    },
  },
  plugins: [],
}
