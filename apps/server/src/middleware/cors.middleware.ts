import 'dotenv/config';
import cors from 'cors';

const productionDomains: string[] = (() => {
  if (process.env['NODE_ENV'] !== 'production') return [];
  const origin = process.env['CLIENT_ORIGIN'];
  if (!origin) {
    throw new Error('[cors] CLIENT_ORIGIN environment variable is required in production');
  }
  return [origin];
})();

const localDomains: string[] = [
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
