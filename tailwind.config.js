const colors = require('tailwindcss/colors')
// https://github.com/tailwindlabs/tailwindcss/issues/654
let makeShadow = (name, rgb) => {
  let obj = {};

  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-sm"] = `0 1px 2px 0 rgba(${rgb}, 0.05)`;
  obj[name] = `0 1px 3px 0 rgba(${rgb}, 0.1), 0 1px 2px 0 rgba(${rgb}, 0.06)`;
  obj[
    name + "-md"
  ] = `0 4px 6px -1px rgba(${rgb}, 0.1), 0 2px 4px -1px rgba(${rgb}, 0.06)`;
  obj[
    name + "-lg"
  ] = `0 10px 15px -3px rgba(${rgb}, 0.1), 0 4px 6px -2px rgba(${rgb}, 0.05)`;
  obj[
    name + "-xl"
  ] = `0 0px 10px 10px rgba(${rgb})`;
  obj[name + "-2xl"] = `0 25px 50px -12px rgba(${rgb}, 0.25)`;
  obj[name + "-inner"] = `inset 0 2px 4px 0 rgba(${rgb}, 0.06)`;
  return obj;
};

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.trueGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      black: colors.black,
      white: colors.white,
      transparent: 'transparent',
      current: 'currentColor',
      pink: colors.pink
    },
    extend: {
      boxShadow: {
        ...makeShadow("cool-gray", "71, 85, 104"),
        ...makeShadow("gray", "75, 85, 98"),
        ...makeShadow("red", "223, 39, 44"),
        ...makeShadow("orange", "252, 143, 35"),
        ...makeShadow("yellow", "254,221,102"),
        ...makeShadow("green", "16, 122, 87"),
        ...makeShadow("teal", "13, 116, 128"),
        ...makeShadow("blue", "90,195,249"),
        ...makeShadow("indigo", "87, 81, 230"),
        ...makeShadow("purple", "125, 59, 236"),
        ...makeShadow("pink", "236,127,205")
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
