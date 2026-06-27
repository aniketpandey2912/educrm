// 3rd party imports
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

// internal imports
import { corsMiddleware } from './middleware/cors.middleware';
import { morganMiddleware } from './middleware/morgan.middleware';
import { helmetMiddleware } from './middleware/helmet.middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(morganMiddleware);
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

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
