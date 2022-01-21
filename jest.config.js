const commonConfig = require('./jest.config.common');

module.exports = {
  ...commonConfig,
  collectCoverageFrom: [
    'packages/**/src/*.{js,jsx,ts,tsx}',
    'packages/**/src/**/*.{js,jsx,ts,tsx}',
    '!packages/**/src/typings.{ts,tsx}',
    '!packages/**/src/*.d.{ts,tsx}',
    '!packages/**/*.stories.{js,jsx,ts,tsx}'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  prettierPath: '<rootDir>/prettier.config.js',
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/'
}