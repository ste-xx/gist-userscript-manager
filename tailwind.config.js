/* eslint-disable */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ]
  },
  theme: {
    extend: {},
    customForms: theme => ({
      default: {
        input: {
          '&:focus': {
            borderColor: theme('colors.orange.500'),
            boxShadow: `0 0 0 3px ${theme('colors.orange.400')}`
          }
        }
      },
    })
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
};

