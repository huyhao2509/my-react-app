/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '1.25rem', // Padding mặc định
      screens: {
        DEFAULT: '100%', // Container rộng 100% mặc định
        lg: '1060px',    // Container max-width 1060px khi màn hình >= lg
      },
    },
    extend: {
      colors: {
        customDark: '#1e1e2a',
      },
      backgroundImage: {
        'banner': "url('/banner.png')",
      },
    },
  },
  plugins: [],
};
