import 'dotenv/config';
import cors from 'cors';

const productionDomains = [process.env['CLIENT_ORIGIN'] as string];
const localDomains = [
  'http://localhost:4300',
  'http://localhost:4301',
  'http://localhost:4302',
  'http://localhost:4303',
];

const allowedOrigins = process.env['NODE_ENV'] === 'production' ? productionDomains : localDomains;

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
});
