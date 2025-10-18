import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import usersRouter from './routes/users';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());

// CORS with multiple origins support
const corsEnv = process.env.CORS_ORIGIN || 'http://localhost:3000';
const allowed = corsEnv.split(',').map(s => s.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return cb(null, true);
    if (allowed.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('CORS not allowed'), false);
    }
  },
  credentials: true
}));

// Rate limiting
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const max = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);

const limiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Ping endpoint
app.get('/api/ping', (_req, res) => {
  res.json({ msg: 'pong', ts: Date.now() });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Start server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`🚀 Backend running on port ${port}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 CORS allowed origins: ${allowed.join(', ')}`);
});

export default app;
