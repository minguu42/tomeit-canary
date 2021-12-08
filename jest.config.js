module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.{jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",
    "^models/(.*)$": "<rootDir>/src/models/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
