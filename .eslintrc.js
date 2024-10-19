module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript",
    "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:import/errors",
    // "plugin:import/warnings",
    // "plugin:import/typescript",
    // "plugin:jsx-a11y/recommended",
    // "plugin:react-hooks/recommended",
    // "prettier",
    // "plugin:prettier/recommended",
  ],

  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  rules: {
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    // "prettier/prettier": ["warning", { singleQuote: false }],
    // "@typescript-eslint/no-unused-vars": ["error"],
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "prettier/prettier": "error",
  },
};
