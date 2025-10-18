import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middlewares/auth';

const router = Router();

// Mock user database
const users = [
  {
    id: 1,
    email: 'alice@example.com',
    name: 'Alice',
    role: 'user'
  },
  {
    id: 2,
    email: 'bob@example.com',
    name: 'Bob',
    role: 'admin'
  }
];

// GET /api/users/me - Protected route
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = users.find(u => u.id === req.user?.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  });
});

export default router;
