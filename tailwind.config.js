/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        'surface-bg': 'var(--color-surface-bg)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
