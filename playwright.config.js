import { defineConfig } from '@playwright/test';
import 'dotenv/config';
export default defineConfig({
  use: {
    baseURL: 'https://qauto.forstudy.space/',

    
httpCredentials: {
  username: process.env.HTTP_USERNAME || 'guest',
  password: process.env.HTTP_PASSWORD || 'welcome2qauto',
},

  },
});