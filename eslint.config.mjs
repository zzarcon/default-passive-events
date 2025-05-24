import { javascript } from '@frsource/eslint-config';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...javascript,
  { ignores: ['**/dist', '**/coverage', '**/node_modules', 'docs/index.html'] },
  {
    files: ['docs/**.js', 'src/**'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
    },
  },
  {
    files: ['__tests__/**.js'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
    },
  },
];
