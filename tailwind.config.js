/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

// @see https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

// --------------------------------------------------

/**
 * `Array.map`のオブジェクト版
 */
function mapBy(object, callbackfn) {
  const newObject = {};

  Object.entries(object).forEach(([key, value]) => {
    const newValue = callbackfn(value, key);
    newObject[key] = newValue;
  });

  return newObject;
}

// --------------------------------------------------

/**
 * var(--base-line-height)の値と合わせる
 */
const baseLineHeight = 1.75;

const myColors = {
  myBlue: {
    50: '#eaf6ff',
    100: '#d8eeff',
    200: '#b9dcff',
    300: '#8ec4ff',
    400: '#629eff',
    500: '#3e77ff',
    600: '#1c4cff',
    700: '#1e48f1',
    800: '#1237c1',
    900: '#183697',
    950: '#0e1d58',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // https://tailwindcss.com/docs/screens
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    colors: {
      primary: myColors.myBlue,
      danger: colors.red,
      marker: colors.yellow[300],
      gray: {
        foreground: colors.gray[800],
        'foreground-weak': colors.gray[500],
        'light-400': colors.gray[400],
        'light-300': colors.gray[300],
        'light-200': colors.gray[200],
        'light-100': colors.gray[100],
        'light-50': colors.gray[50],
      },
      white: colors.white,
      transparent: colors.transparent,
    },

    extend: {
      // @see https://tailwindcss.com/docs/font-family
      fontFamily: {
        base: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      // line-heightだけ共通の値で上書きする
      fontSize: mapBy(defaultTheme.fontSize, (fontSizeConfig) => [
        fontSizeConfig[0],
        { lineHeight: baseLineHeight.toString() },
      ]),
      // @see https://tailwindcss.com/docs/line-height
      lineHeight: {
        base: baseLineHeight.toString(),
      },
      boxShadow: {
        card: '0px 2px 25px -15px rgba(0, 0, 0, 0.2)',
        wide: '0 30px 60px rgba(0,0,0,.12)',
      },
    },
  },
  plugins: [],
};
