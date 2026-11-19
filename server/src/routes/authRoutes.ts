import express from 'express';
import {
  signup,
  login,
  logout,
  getMe,
  googleAuthInit,
  googleAuthCallback,
  changePassword,
  deleteAccount,
} from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const disableAuthCache: express.RequestHandler = (_req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'private, no-cache, no-store, max-age=0, must-revalidate',
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Vary', 'Cookie, Authorization');
  next();
};

// Slows down password guessing and signup spam: 20 attempts per 15 minutes per IP.
const credentialLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later' },
});

router.post('/signup', credentialLimiter, signup);
router.post('/login', credentialLimiter, login);
router.post('/logout', logout);
router.get('/me', disableAuthCache, protect, getMe);
router.patch('/password', credentialLimiter, protect, changePassword);
router.delete('/me', protect, deleteAccount);

router.get('/google', googleAuthInit);
router.get('/google/callback', googleAuthCallback);

export default router;
