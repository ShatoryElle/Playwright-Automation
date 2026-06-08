import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://qauto.forstudy.space/',

    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  },
});