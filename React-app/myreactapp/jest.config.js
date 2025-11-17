module.exports = {
    testEnvironment: "jsdom",
    
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",   
    "!src/index.js",       
    "!src/**/*.test.js"    
  ],

  coverageDirectory: "coverage",
  coverageReporters: ["html", "text"],
  
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
  
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "<rootDir>/test-style-stub.js",
    },
  
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"]

  };
  