import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const APP_URLS = {
  LOGIN: process.env.BASE_URL ?? 'https://app.wingify.com/#login',
} as const;

export const CREDENTIALS = {
  INVALID_EMAIL: process.env.VWO_INVALID_EMAIL ?? 'invalid.user@example.com',
  INVALID_PASSWORD: process.env.VWO_INVALID_PASSWORD ?? 'InvalidPassword@123',
} as const;

export const VALID_CREDENTIALS = {
  EMAIL: process.env.VWO_VALID_EMAIL ?? '',
  PASSWORD: process.env.VWO_VALID_PASSWORD ?? '',
} as const;

export const TIMEOUTS = {
  DEFAULT: Number(process.env.DEFAULT_TIMEOUT ?? 30000),
  NAVIGATION: Number(process.env.NAVIGATION_TIMEOUT ?? 60000),
} as const;

export const MESSAGES = {
  INVALID_LOGIN: 'Your email, password, IP address or location did not match',
} as const;
