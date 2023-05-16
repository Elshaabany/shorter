import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config();

export const host = process.env.host;
export const port = process.env.port;
export const MongodbURI = process.env.MongodbURI;
