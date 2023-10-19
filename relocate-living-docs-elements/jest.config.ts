import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  "testEnvironment": "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

config.globals = {
  "ts-jest": {
    tsconfig: "<rootDir>/test/tsconfig.json",
  },
};

export default config;
