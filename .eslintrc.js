module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "import",
    "react",
    "@typescript-eslint",
  ],
  settings: {
    react: {
      version: 'detect'
    },
  },
  rules: {
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [
          {
            // Reactを先頭にする
            "pattern": "react",
            "group": "external",
            "position": "before", 
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "never",
        "alphabetize": { "order": "asc", "caseInsensitive": true },
      }
    ],
    "react/prop-types": "off",
    "@typescript-eslint/no-namespace": "off",
  },
};
