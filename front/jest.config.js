module.exports = {
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
    './jest.setup',
    'given2/setup',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  verbose: true,
};
