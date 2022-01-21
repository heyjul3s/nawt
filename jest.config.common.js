module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  verbose: true,
  testTimeout: 30000,
}