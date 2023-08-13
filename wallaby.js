module.exports = function (wallaby) {
  process.env.NODE_ENV = 'test';
  return {
    autoDetect: true,
    files: [
      '{app,components,lib,utils}/**/!(*.spec|*.test).{ts,tsx}',
      'middleware.ts',
      'jest.config.mjs',
      'jest.setup.js',
    ],
    tests: [
      '**/*.test.{ts,tsx}',
      '!node_modules/**/*',
    ],
    testFramework: {
      configFile: './jest.config.mjs',
    },
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({ isolatedModules: true }),
    },
  };
};
