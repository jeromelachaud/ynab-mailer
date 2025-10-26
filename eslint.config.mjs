// Polyfill structuredClone for older Node versions (CI or older runners)
// structuredClone exists in Node 17+; some environments running this
// repo may use older Node where it's not defined and ESLint's
// configuration processing tries to call it. Provide a simple
// JSON-based fallback here to avoid the crash during config load.
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj))
}

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import promise from 'eslint-plugin-promise'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    // Do not lint this file itself — it's ESM and the CLI runner may treat
    // files as CommonJS which causes a parsing error. Use the Flat Config
    // `ignores` option (replacement for .eslintignore) to skip it.
    ignores: ['eslint.config.mjs'],
    extends: compat.extends('eslint:recommended'),

    plugins: {
      promise,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      ecmaVersion: 2017,
      sourceType: 'commonjs',
    },

    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-console': 'off',
      'promise/catch-or-return': 'error',
    },
  },
])
