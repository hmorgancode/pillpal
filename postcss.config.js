let devPlugins = {};
// if (process.env.NEXT_PUBLIC_ENV === 'development') {
//   devPlugins = {
//     'postcss-browser-reporter': {}, /* I have not tested this to see whether it's working */
//   };
// }

module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {}, // next.js default puts this first
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      // stage: 3, the postcss default is 2 and I don't think we need to be as conservative as next's default
      features: {
        'custom-properties': false, // next disables this by default and I don't have a better reason
      },
    },
    tailwindcss: {},
    ...devPlugins,
  },
};
