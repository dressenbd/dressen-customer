/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  extend: {
    colors: {
      primary: '#FACF35',
      'primary-hover': '#E6BD2E',
      secondary: '#2E2E2E',
      accent: '#FFFFFF',
      section: '#F9F9F9',
      neutral: '#E4E4E4',
      highlight: '#3B5BA9',
      discount: '#E74C3C',
      success: '#2ECC71',
    },
  },
},
  plugins: [],
};
