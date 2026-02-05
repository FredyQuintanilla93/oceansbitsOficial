module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/**/*.test.js',
    '!js/sw.js',
    '!js/pwa-register.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true
};
