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

//config.transformIgnorePatterns = ["/node_modules/d3-scale"];

//moduleNameMapper: { "^d3-(.*)$": `d3-$1/dist/d3-$1` },
//moduleNameMapper: { "d3-scale": "d3-scale/dist/d3-scale.js" },
//transformIgnorePatterns: ["node_modules/(?!(d3-scale)/)"],
//transformIgnorePatterns: ["/node_modules/d3-scale"],

export default config;

/* "moduleNameMapper": {
  "d3-scale": "<rootDir>/node_modules/d3-scale/dist/d3-scale.js",
  "d3-array": "<rootDir>/node_modules/d3-array/dist/d3-array.js",
  "d3-interpolate": "<rootDir>/node_modules/d3-interpolate/dist/d3-interpolate.js",
  "d3-color": "<rootDir>/node_modules/d3-color/dist/d3-color.js",
  "d3-format": "<rootDir>/node_modules/d3-format/dist/d3-format.js",
  "d3-time": "<rootDir>/node_modules/d3-time/dist/d3-time.js"
} */
