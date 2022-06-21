module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],

  rules: {
    indent: 0,
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    semi: [2, "always"],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true }
    ],
    "multiline-ternary": 0
  }
};
