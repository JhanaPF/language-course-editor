// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config({
    files: ["**/*.ts", "**/*.tsx"],

    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. TypeScript ESLint recommended rules
    // 3. ESLint React's recommended-typescript rules
    extends: [
        eslintJs.configs.recommended,
        tseslint.configs.recommended,
        eslintReact.configs["recommended-typescript"],
    ],

    // Configure language/parsing options
    languageOptions: {
        // Use TypeScript ESLint parser for TypeScript files
        parser: tseslint.parser,
        parserOptions: {
            // Enable project service for better TypeScript integration
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    rules: {
        "@eslint-react/no-missing-key": "warn",
        'indent': ['error', 4],
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        'semi': ['error', 'always'],
        "@typescript-eslint/no-explicit-any": "warn"
    },
});