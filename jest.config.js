module.exports = {
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/logic/**/*.ts',
    "!**/node_modules/**"
  ],
  coverageReporters: ["html", "text-summary", "lcov"],
}
