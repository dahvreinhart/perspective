import * as dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL || '';
export const DB_URL_TEST = process.env.DB_URL_TEST || '';
export const SERVICE_NAME = process.env.SERVICE_NAME || 'NestApplication';
