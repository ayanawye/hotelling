import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const project = ["./tsconfig.app.json", "./tsconfig.node.json"];
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
});

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export default defineConfig([
  globalIgnores(["dist"]),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      prettier: legacyPlugin("prettier"),
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        project,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // formatting
      "prettier/prettier": "error",
      quotes: [2, "single", { avoidEscape: true, allowTemplateLiterals: true }],
      "jsx-quotes": [2, "prefer-single"],
      "object-curly-spacing": [1, "always"],
      "max-len": [
        "error",
        130,
        2,
        {
          ignoreUrls: true,
          ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
          ignoreStrings: true,
        },
      ],

      // imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // react hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",

      // typescript
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",

      // logic / style
      "no-console": "error",
      "no-alert": "error",
      "no-redeclare": "off",
      "no-plusplus": "off",
      "no-param-reassign": "off",
      "no-mixed-operators": "off",
      "no-nested-ternary": "off",
      "prefer-destructuring": "off",
      "default-param-last": 0,
      "consistent-return": 0,
      "no-shadow": 0,
      "linebreak-style": "off",
      "arrow-parens": "off",
      "arrow-body-style": "off",
      "function-paren-newline": "off",
      "object-curly-newline": "off",
    },
  },
]);
