import 'dotenv/config';
import cors from 'cors';

function buildAllowedOrigins(): string[] {
  if (process.env['NODE_ENV'] !== 'production') {
    return [
      'http://localhost:4300',
      'http://localhost:4301',
      'http://localhost:4302',
      'http://localhost:4303',
    ];
  }

  const origin = process.env['CLIENT_ORIGIN'];
  if (!origin) {
    throw new Error('[cors] CLIENT_ORIGIN environment variable is required in production');
  }

  return [origin];
}

export const corsMiddleware = cors({
  origin: buildAllowedOrigins(),
  credentials: true,
});
