// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        primary: "#000033",
        secondary: "#2E2A5C",
        white: "#FFFFFF",
        'light-blue': '#72a4d2',
        'lighter-primary': '#1a1a6f',
        'lighter-secondary': '#4a4a9b',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'universe': 'radial-gradient(circle at 20% 20%, #2E2A5C, #000033), radial-gradient(circle at 80% 80%, #f3d1f4, #d8aaff)',
        'universe-blur': 'radial-gradient(circle at 20% 20%, #2E2A5C, #000033), radial-gradient(circle at 80% 80%, #f3d1f4, #d8aaff), rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(50px, 50px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      animation: {
        'move': 'move 4s infinite alternate',
      },
    },
  },
  plugins: [],
};
