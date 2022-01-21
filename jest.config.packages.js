const commonConfig = require('./jest.config.common');

module.exports = {
  ...commonConfig,
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
}