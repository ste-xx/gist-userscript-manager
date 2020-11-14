const path = require("path");

module.exports = {
  root: true,
  env: {
    node: true
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },

  rules: {
    "@typescript-eslint/semi": ["error"]
  },
  overrides: [
    // Fix no-used-vars when importing ts types in .vue files https://github.com/vuejs/eslint-config-typescript/issues/14
    {
      files: ["*.vue"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error"
      }
    },
    {
      files: ["src/**/*.ts", "test/**/*.ts"],
      parserOptions: {
        project: path.resolve(__dirname, "./tsconfig.json"),
        parser: "@typescript-eslint/parser"
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ]
    },
    {
      files: ["build/**/*.ts"],
      parserOptions: {
        project: path.resolve(__dirname, "./build/tsconfig.json"),
        parser: "@typescript-eslint/parser"
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ]
    }
  ]
};
