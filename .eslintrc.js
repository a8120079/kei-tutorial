module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  // extends: Specify extended configuration, support rule coverage and aggregation
  extends: ["eslint:recommended"],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // plugins: Configure those plugins we want Linting rules
  plugins: [],
  rules: {
    "indent": [
      "error",
      4
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
