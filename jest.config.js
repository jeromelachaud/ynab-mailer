require('dotenv').config()

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'coverage',
    '<rootDir>/jest.config.js',
    '<rootDir>/config/index.js',
  ],
}
