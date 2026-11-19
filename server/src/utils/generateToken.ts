import { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';

export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'jwt-token';

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;

// Same options for set and clear, so logout always removes the cookie.
const authCookieOptions = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };
};

export const generateToken = (userId: number, res: Response): void => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ id: userId }, secret, { expiresIn: '7d' });

  res.cookie(AUTH_COOKIE_NAME, token, {
    ...authCookieOptions(),
    maxAge: TOKEN_TTL_MS,
  });
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(AUTH_COOKIE_NAME, authCookieOptions());
};
