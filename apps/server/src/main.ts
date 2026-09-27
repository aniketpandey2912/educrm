// 3rd party imports
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

// internal imports - middleware
import { corsMiddleware } from './middleware/cors.middleware';
import { morganMiddleware } from './middleware/morgan.middleware';
import { helmetMiddleware } from './middleware/helmet.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { apiRateLimiterMiddleware } from './middleware/rate-limit.middleware';

// internal imports - routers
import authRouter from './routes/auth.routes';
import superAdminRouter from './routes/super-admin.routes';
import studentRouter from './routes/student.routes';
import adminRouter from './routes/admin.routes';
import supportStaffRouter from './routes/support-staff.routes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(morganMiddleware);
app.use(express.json());
app.use(apiRateLimiterMiddleware);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routers
app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/support-staff', supportStaffRouter);
app.use('/api/super-admin', superAdminRouter);

// Global error handler - must be last middleware
app.use(errorMiddleware);

// Connect to MongoDB then start the server
mongoose
  .connect(MONGODB_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
