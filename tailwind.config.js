module.exports = {
  content: ["./**/*.tsx"], // so that tailwind can target and be used on all tsx files
  theme: {
    fontFamily:{},
    extend: {
      colors: {
        'button_primary': '#307ff4',
        'background': '#FFFFFF',
        'background_secondary' : '#f4f6f8',
        'field': '#fafafa',

        'positive': '#21BA45',
        'negative': '#C10015',
        'info': '#31CCEC',
        'warning': '#D09502',


        'clear_blue' : '#dbf7ff',
        'clear_pink' : '#ffe7ed',

        'text_title': '#141414',
        'text_subtitle' : '#96969a'


      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
