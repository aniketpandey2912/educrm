import rateLimit from 'express-rate-limit';

// Strict limiter for auth routes to prevent brute-force attacks - 10 attempts per 15 minutes per IP address
export const authRateLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { message: 'Too many requests, please try again later.' },
});

// Lenient limiter for general API routes - 100 requests per minute per IP address
export const apiRateLimiterMiddleware = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please slow down or try again later' },
});
