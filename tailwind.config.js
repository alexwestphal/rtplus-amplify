

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
            mono: ['var(--font-roboto-mono)', ...defaultTheme.fontFamily.mono],
        }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

