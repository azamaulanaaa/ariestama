module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/libs/(.*)$': '<rootDir>/src/libs/$1',
        '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@/config$': '<rootDir>/src/config',
    },
};
