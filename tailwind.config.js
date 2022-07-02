/** @type {import('tailwindcss').Config} */
const settingsScreens = require('./tailwind.settings.screens')
const settingsFontSizes = require('./tailwind.settings.fontSizes')


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    screens: settingsScreens,
    fontSize: settingsFontSizes,
    extend: {},
  },
  plugins: [],
}
