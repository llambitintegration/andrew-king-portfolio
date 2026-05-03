// Jest configuration for Next.js project
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/data/(.*)$": "<rootDir>/data/$1",
    "^@/types/(.*)$": "<rootDir>/types/$1",
    "^.+\\.(css|sass|scss|png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$": "identity-obj-proxy",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: ["components/**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
}

module.exports = customJestConfig
