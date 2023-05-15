import { env } from 'node:process';
import * as dotenv from 'dotenv';
import Server from './utils/Server';

dotenv.config({ path:'config.env'});

const port = Number(process.env.PORT);

const dbURL = env.DB_URL && env.DB_PASSWORD ? env.DB_URL.replace('<PASSWORD>', env.DB_PASSWORD) : '';
const server = new Server(port,dbURL);
server.start();
