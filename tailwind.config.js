module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/presentation/components/**/*.{js,ts,jsx,tsx}',
    './src/presentation/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
