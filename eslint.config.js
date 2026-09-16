const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");
const reactNative = require("eslint-plugin-react-native");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

const jestGlobals = {
  jest: "readonly",
  describe: "readonly",
  it: "readonly",
  test: "readonly",
  expect: "readonly",
  beforeAll: "readonly",
  beforeEach: "readonly",
  afterAll: "readonly",
  afterEach: "readonly",
};

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: [
      "node_modules/*",
      "android/*",
      "ios/*",
      "dist/*",
      ".expo/*",
      "coverage/*",
      "src/services/schema/*",
    ],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "react-native": reactNative,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react-native/no-inline-styles": "error",
      "react-native/no-unused-styles": "error",
      "import/no-named-as-default-member": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex:
                "^@/(ui-kit|components|screens|services|hooks|icons|providers|store)$",
              message:
                "Import from the concrete module (e.g. @/components/Button), not from a root barrel.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["jest.setup.js", "**/*.test.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: jestGlobals,
    },
  },
]);
