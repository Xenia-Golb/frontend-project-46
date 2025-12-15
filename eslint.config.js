// eslint.config.js
const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  // Базовые рекомендованные правила
  js.configs.recommended,

  // Основные файлы проекта
  {
    files: ['**/*.js'],
    ignores: ['node_modules/', 'coverage/'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Стилевые правила — ВСЕ КЛЮЧИ В КАВЫЧКАХ
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      'no-console': 'off',
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },

  // Тесты — разрешаем Jest-глобалы
  {
    files: ['**/__tests__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]
