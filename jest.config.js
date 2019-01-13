// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.ts"
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "text"
  ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    "global": {
      "lines": 50
    }
  },

  // A set of global variables that need to be available in all test environments
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "ts",
    "tsx"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "src/**/*.+(ts|tsx)"
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
