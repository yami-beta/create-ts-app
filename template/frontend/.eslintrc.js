module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    // interface や jsx をうまく扱えないので off にして noUnusedLocals を tsconfig で有効化
    "no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/", "!.eslintrc.js", "!.prettierrc.js"],
};
