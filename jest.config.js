module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/setEnvVars.js"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^(pages|components|lib|contexts)/(.+)": "<rootDir>/src/$1/$2",
  },
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
};
