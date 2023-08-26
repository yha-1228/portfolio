/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

// @see https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

/**
 * var(--base-line-height)の値と合わせる
 */
const baseLineHeight = 1.75;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // 忘れそうなので明示
      // https://tailwindcss.com/docs/screens
      sm: '640px',
      md: '768px',
      lg: '924px',
      // xl: '1280px',
      // '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: colors.indigo,
        danger: colors.red,
        maker: colors.yellow[300],
        gray: {
          foreground: colors.gray[700],
          disabled: colors.gray[400],
          'light-strong': colors.gray[300],
          'light-weak': colors.gray[200],
          lightest: colors.gray[50],
        },
      },
      // @see https://tailwindcss.com/docs/font-family
      fontFamily: {
        base: [
          'Inter',
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
      fontSize: {
        // line-heightだけ共通の値で上書きする
        xs: [
          defaultTheme.fontSize.xs[0],
          { lineHeight: baseLineHeight.toString() },
        ],
        sm: [
          defaultTheme.fontSize.sm[0],
          { lineHeight: baseLineHeight.toString() },
        ],
        base: [
          defaultTheme.fontSize.base[0],
          { lineHeight: baseLineHeight.toString() },
        ],
        lg: [
          defaultTheme.fontSize.lg[0],
          { lineHeight: baseLineHeight.toString() },
        ],
        xl: [
          defaultTheme.fontSize.xl[0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '2xl': [
          defaultTheme.fontSize['2xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '3xl': [
          defaultTheme.fontSize['3xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '4xl': [
          defaultTheme.fontSize['4xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '5xl': [
          defaultTheme.fontSize['5xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '6xl': [
          defaultTheme.fontSize['6xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '7xl': [
          defaultTheme.fontSize['7xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '8xl': [
          defaultTheme.fontSize['8xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
        '9xl': [
          defaultTheme.fontSize['9xl'][0],
          { lineHeight: baseLineHeight.toString() },
        ],
      },
      // @see https://tailwindcss.com/docs/line-height
      lineHeight: {
        base: baseLineHeight.toString(),
      },
    },
  },
  plugins: [],
};
