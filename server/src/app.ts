import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import employerRoutes from './routes/employerRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// Render runs behind a proxy; needed for correct client IPs in rate limiting.
app.set('trust proxy', 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/employer', employerRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'server is running all fine' });
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
