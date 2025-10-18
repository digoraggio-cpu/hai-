import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { securityMiddleware } from './middlewares/security';
import { createRedisStore } from './middlewares/rateLimitRedis';
import authRouter from './routes/auth';
import govbrRouter from './routes/govbr';

dotenv.config();

const app = express();
app.use(express.json());

// Helmet with base + CSP (see config/csp)
import csp from './config/csp';
app.use(helmet());
app.use(helmet.contentSecurityPolicy(csp));

// Security headers middleware
app.use(securityMiddleware);

// CORS
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: corsOrigin, credentials: true }));

// Rate limiting (Redis store)
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const max = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
const limiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  store: createRedisStore(),
});
app.use(limiter);

// Health & basic routes
app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/api/ping', (_req, res) => res.json({ msg: 'pong', ts: Date.now() }));

// Auth and gov.br
app.use('/api/auth', authRouter);
app.use('/api/auth/govbr', govbrRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on ${port}`));
