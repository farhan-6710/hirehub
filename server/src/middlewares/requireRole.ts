import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

type Role = 'candidate' | 'employer';

// Use after `protect`. The role comes from the user row loaded from the JWT.
export const requireRole =
  (role: Role) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ error: `Only ${role} accounts can do this` });
      return;
    }

    next();
  };
