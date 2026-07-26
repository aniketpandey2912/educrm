import morgan from 'morgan';

export const morganMiddleware = morgan(
  process.env['NODE_ENV'] === 'production' ? 'combined' : 'dev',
);
