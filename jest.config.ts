/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom', // node 二者可选
  setupFilesAfterEnv: ['./src/__test__/setup.ts'],
  transform: {
    // 用 `ts-jest` 处理 `*.ts` 文件
    '.*\\.(ts|tsx)$': 'ts-jest',
    // 用 `babel-jest` 处理 js
    '.*\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    //
    '^.+\\.(css|less)$': 'identity-obj-proxy', // 使用 identity-obj-proxy mock CSS Modules
  },
};

export default config;
