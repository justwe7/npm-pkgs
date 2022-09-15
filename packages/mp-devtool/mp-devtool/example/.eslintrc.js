module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    uni: true,
    getCurrentPages: true,
    wx: true,
    worker: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty': 'warn',
    'block-scoped-var': 'warn',
    'computed-property-spacing': 'error',
    'func-call-spacing': 'error',
    'jsx-quotes': 'error',
    'switch-colon-spacing': 'error',
    'arrow-spacing': 'error',
    'vue/this-in-template': 'error',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case'
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/require-default-prop': 'off',
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: []
      }
    ],

    'no-prototype-builtins': 'off',
    'vue/require-prop-types': 'off',
    'no-void': 'off',
    'prefer-promise-reject-errors': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
