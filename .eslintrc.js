module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  plugins: ["@typescript-eslint", "import", "react-hooks"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-undef": "off",
    "no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "import/no-duplicates": "error",
    "import/order": ["error", { alphabetize: { order: "asc" } }],
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/", "!.eslintrc.js", "!.prettierrc.js", "lib/"],
};
