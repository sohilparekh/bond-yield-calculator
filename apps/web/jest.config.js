import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@repo/ui/index$': '<rootDir>/../../packages/ui/src/index',
    '^@repo/ui$': '<rootDir>/../../packages/ui/src/index',
    '^@repo/ui/(.*)$': '<rootDir>/../../packages/ui/src/$1',
    '^@repo/(.*)$': '<rootDir>/../../packages/$1/src',
    '@app/(.*)$': '<rootDir>/../../apps/$1/src',
  },
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx|js)',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
