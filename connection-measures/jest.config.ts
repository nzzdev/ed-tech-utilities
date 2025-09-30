import type { Config } from 'jest';

// Sync object
const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/test/tsconfig.json",
    },
  },
};

export default config;