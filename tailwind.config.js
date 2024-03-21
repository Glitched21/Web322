module.exports = {
  content: ['./views//*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],  
};