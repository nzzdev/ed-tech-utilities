import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

// Note: This fixes issues with certain js package export setups (e.g. commonjs module styling)
// Documentation: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
config.moduleNameMapper = {
  "^d3-(.*)$": `<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js`,
  culori: "<rootDir>/node_modules/culori/bundled/culori.min.js",
};

config.globals = {
  "ts-jest": {
    tsconfig: "<rootDir>/test/tsconfig.json",
  },
};

export default config;
