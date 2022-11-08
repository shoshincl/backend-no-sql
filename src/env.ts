import { resolve } from 'path';

import { config } from 'dotenv';

config({ path: resolve(__dirname, '../.env') });

export const { APP_PORT, MONGO_DB_URL, MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_NAME, USERFRONT_API_KEY, USERFRONT_BASE_URL } =
  process.env as {
    [key: string]: string;
  };
