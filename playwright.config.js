import { defineConfig } from '@playwright/test';
import 'dotenv/config';
export default defineConfig({
  
use: {
  baseURL: process.env.BASE_URL,

  httpCredentials: {
   username: process.env.HTTP_USERNAME || 'guest'
    password: process.env.HTTP_PASSWORD,
  },
},

});