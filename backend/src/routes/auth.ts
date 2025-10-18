import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// Mock user database (replace with real DB in production)
const users = [
  {
    id: 1,
    email: 'alice@example.com',
    password: '$2b$10$XqS5z9BzKKJ5h9xH5Kx4gO6pRQz9vx6FJ4u5g8E9h3K1Lx7nH2W1u', // 'password123'
    name: 'Alice'
  },
  {
    id: 2,
    email: 'bob@example.com',
    password: '$2b$10$XqS5z9BzKKJ5h9xH5Kx4gO6pRQz9vx6FJ4u5g8E9h3K1Lx7nH2W1u', // 'password123'
    name: 'Bob'
  }
];

// Refresh token store (in-memory, use Redis in production)
const refreshTokens = new Set<string>();

const ACCESS_SECRET = process.env.JWT_SECRET || 'dev_access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev_refresh_secret';
const ACCESS_TTL = parseInt(process.env.ACCESS_TOKEN_TTL || '900', 10); // 15 min
const REFRESH_TTL = parseInt(process.env.REFRESH_TOKEN_TTL || '1209600', 10); // 14 days

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    ACCESS_SECRET,
    { expiresIn: ACCESS_TTL }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    REFRESH_SECRET,
    { expiresIn: REFRESH_TTL }
  );

  // Store refresh token
  refreshTokens.add(refreshToken);

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// POST /api/auth/refresh
router.post('/refresh', (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  // Check if token is in store
  if (!refreshTokens.has(refreshToken)) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  try {
    // Verify refresh token
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: number };

    // Generate new access token
    const user = users.find(u => u.id === payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      ACCESS_SECRET,
      { expiresIn: ACCESS_TTL }
    );

    res.json({ accessToken });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    refreshTokens.delete(refreshToken);
  }

  res.json({ message: 'Logged out successfully' });
});

export default router;
