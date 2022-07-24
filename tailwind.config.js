const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/*.html", "./src/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      neutral: colors.slate,
      positive: colors.green,
      urge: colors.violet,
      warning: colors.yellow,
      info: colors.blue,
      critical: colors.red,
    },
  },
  plugins: [require("a17t")],
};
