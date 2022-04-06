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
    "space-before-function-paren": ["error", "never"],
    semi: [2, "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }]
  }
};
