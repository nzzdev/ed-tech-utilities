import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

config.moduleNameMapper = {
  'd3-geo-projection': '<rootDir>/node_modules/d3-geo-projection/dist/d3-geo-projection.min.js',
  '^d3-(.*)$': `<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js`,
};

config.globals = {
  'ts-jest': {
    tsconfig: '<rootDir>/test/tsconfig.json',
  },
};

export default config;
