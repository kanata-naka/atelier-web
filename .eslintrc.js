/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "import",
  ],
  rules: {
    "import/order": [
      "warn",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "groups": ["builtin", "external", "internal"],
        "newlines-between": "never",
        "pathGroups": [
          {
            // Reactを先頭にする
            "pattern": "react",
            "group": "external",
            "position": "before", 
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
      }
    ],
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-namespace": "off",
  },
};
