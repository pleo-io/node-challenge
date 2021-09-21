module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.ts*',
    '!<rootDir>/packages/domain/**/(route|schema|parameters|sqs)+(*.ts)',
    '!<rootDir>/packages/resource/**/(types|schema)+(*.ts)',
    '!<rootDir>/packages/resource/**/test/**/*.ts',
    '!<rootDir>/packages/router/**/(parameters)+(*.ts)',
    '!<rootDir>/node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 45,
      lines: 50,
      statements: 50,
    },
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/test/utils/jest/config-injector.ts',
    '<rootDir>/test/utils/jest/error-matchers.ts',
  ],
  testEnvironment: 'node',
};
