module.exports = {
  content: ["./components/*.tsx", "./screens/*.tsx"], // so that tailwind can target and be used on all tsx files
  theme: {

    fontFamily: {
      // 'sans': ['ui-sans-serif', 'system-ui'],
      // 'serif': ['ui-serif', 'Georgia'],
      // 'mono': ['ui-monospace', 'SFMono-Regular'],
      // 'display': ['Oswald', 'Georgia'],
      // 'body': ['"Open Sans"'],
    },

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
      fontFamily:{
        'satoshi': ['Satoshi'],
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
