const RULES = {
  OFF: "off",
  ERROR: "error",
  WARN: "warn",
}

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": RULES.OFF,
    "eslintreact/react-in-jsx-scope": RULES.OFF,
    "no-unused-vars": RULES.WARN,
  },
}
