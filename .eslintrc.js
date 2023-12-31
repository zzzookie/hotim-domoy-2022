module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-console": "off",
    "react/jsx-filename-extension": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "no-unused-vars": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-no-constructed-context-values": 0,
    "default-param-last": 0,
    "quotes": 0,
    "react/jsx-props-no-spreading": 0,
    "max-len": 0,
    "camelcase": 0,
    "object-curly-newline": 0,
    "react/jsx-no-useless-fragment": 0,
  },
};
