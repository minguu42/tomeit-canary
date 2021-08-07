module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^(pages|components)/(.+)": "<rootDir>/src/$1/$2",
  },
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
};
