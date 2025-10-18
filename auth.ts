import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

const ACCESS_TTL = parseInt(process.env.ACCESS_TOKEN_TTL || '900', 10); // seconds
const REFRESH_TTL = parseInt(process.env.REFRESH_TOKEN_TTL || '1209600', 10); // seconds

function signAccess(payload: any) {
  const secret = process.env.JWT_SECRET || 'dev_access';
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TTL });
}

function signRefresh(payload: any) {
  const secret = process.env.REFRESH_SECRET || 'dev_refresh';
  return jwt.sign(payload, secret, { expiresIn: REFRESH_TTL });
}

function verifyRefresh(token: string) {
  const secret = process.env.REFRESH_SECRET || 'dev_refresh';
  return jwt.verify(token, secret);
}

// In-memory blacklist (replace with Redis set in prod)
const invalidatedRefresh = new Set<string>();

router.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });

  const accessToken = signAccess({ sub: username });
  const refreshToken = signRefresh({ sub: username, rand: Math.random() });

  return res.json({ accessToken, refreshToken });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
  if (invalidatedRefresh.has(refreshToken)) return res.status(401).json({ error: 'revoked' });

  try {
    const decoded: any = verifyRefresh(refreshToken);
    const accessToken = signAccess({ sub: decoded.sub });
    const newRefresh = signRefresh({ sub: decoded.sub, rand: Math.random() });
    invalidatedRefresh.add(refreshToken); // rotate
    return res.json({ accessToken, refreshToken: newRefresh });
  } catch (e) {
    return res.status(401).json({ error: 'invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) invalidatedRefresh.add(refreshToken);
  return res.json({ ok: true });
});

export default router;
