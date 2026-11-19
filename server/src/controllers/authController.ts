import { prisma } from '../config/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateToken, clearAuthCookie } from '../utils/generateToken';
import { EMAIL_PATTERN, getPasswordError } from '../utils/validation';
import { Request, Response } from 'express';
import { googleClient, GOOGLE_OAUTH_REDIRECT_URL } from '../utils/googleAuth';
import { AuthRequest } from '../middlewares/authMiddleware';

interface SignupBody {
  name?: string;
  email?: string;
  password?: string;
  role?: 'candidate' | 'employer';
}

const MAX_NAME_LENGTH = 100;

interface GoogleOAuthState {
  role?: 'candidate' | 'employer';
}

const encodeGoogleState = (state: GoogleOAuthState) => {
  return Buffer.from(JSON.stringify(state), 'utf8').toString('base64url');
};

const decodeGoogleState = (rawState: string | undefined): GoogleOAuthState => {
  if (!rawState) return {};

  try {
    const decoded = Buffer.from(rawState, 'base64url').toString('utf8');
    const parsed = JSON.parse(decoded) as GoogleOAuthState;

    if (parsed.role === 'candidate' || parsed.role === 'employer') {
      return { role: parsed.role };
    }

    return {};
  } catch {
    return {};
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body as SignupBody;

    if (!name?.trim() || !email || !password) {
      return res.status(400).json({
        error: 'name, email and password are required',
      });
    }

    if (name.trim().length > MAX_NAME_LENGTH) {
      return res
        .status(400)
        .json({ error: `name must be ${MAX_NAME_LENGTH} characters or fewer` });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: 'email must be a valid address' });
    }

    const passwordError = getPasswordError(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    const normalizedRole = role ?? 'candidate';

    if (normalizedRole !== 'candidate' && normalizedRole !== 'employer') {
      return res.status(400).json({
        error: "role must be either 'candidate' or 'employer'",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'user already exists with the email entered',
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: normalizedRole,
      },
    });

    generateToken(user.id, res);

    return res.status(201).json({
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
      employerProfile: null,
    });
  } catch (error) {
    console.error('Error in signup:', error);
    return res.status(500).json({
      error: 'internal server error',
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check all fields entered
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        error: 'email and password are required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // check if user exists in the table
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        employerProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: 'invalid email or password',
      });
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'invalid email or password',
      });
    }

    generateToken(user.id, res);

    return res.status(200).json({
      status: 'success',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
      employerProfile: user.employerProfile,
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({
      error: 'internal server error',
    });
  }
};

const logout = async (req: Request, res: Response) => {
  clearAuthCookie(res);

  return res.status(200).json({
    status: 'success',
    message: 'logged out successfully',
  });
};

const getMe = async (req: AuthRequest, res: Response) => {
  // req.user is populated by the protect middleware
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      status: 'error',
      error: 'Not authorized',
    });
  }

  const employerProfile = await prisma.employerProfile.findUnique({
    where: { userId: user.id },
  });

  return res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.role,
    },
    employerProfile,
  });
};

const googleAuthInit = async (req: Request, res: Response) => {
  const requestedRole =
    req.query.role === 'employer'
      ? 'employer'
      : req.query.role === 'candidate'
        ? 'candidate'
        : undefined;

  const state = requestedRole
    ? encodeGoogleState({ role: requestedRole })
    : undefined;

  const url = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    prompt: 'consent',
    redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
    state,
  });
  res.redirect(url);
};

const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const state = req.query.state as string | undefined;

    if (!code) {
      return res.status(400).json({ error: 'OAuth code missing' });
    }

    const { role: selectedRoleFromState } = decodeGoogleState(state);

    const { tokens } = await googleClient.getToken({
      code,
      redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
    });
    googleClient.setCredentials(tokens);

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res
        .status(400)
        .json({ error: 'Failed to retrieve email from Google' });
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || 'Google User';
    const picture = payload.picture || '';

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          picture,
          role: selectedRoleFromState ?? 'candidate',
        },
      });
    }

    generateToken(user.id, res);

    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    return res.redirect(frontendUrl);
  } catch (error) {
    console.error('Error in Google OAuth:', error);
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    return res.redirect(`${frontendUrl}/?error=oauth_failed`);
  }
};

const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body as {
      currentPassword?: unknown;
      newPassword?: unknown;
    };

    if (typeof currentPassword !== 'string' || !currentPassword) {
      return res.status(400).json({ error: 'currentPassword is required' });
    }

    const passwordError = getPasswordError(newPassword);
    if (passwordError) {
      return res
        .status(400)
        .json({ error: passwordError.replace('password', 'newPassword') });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { password: true },
    });

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({ error: 'current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword as string, 10);
    await prisma.user.update({
      where: { id: req.user!.id },
      data: { password: hashedPassword },
    });

    return res
      .status(200)
      .json({ status: 'success', message: 'password updated' });
  } catch (error) {
    console.error('Error in changePassword:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

// Deletes the user; jobs, applications and employer profile cascade in the DB.
const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.user!.id } });
    clearAuthCookie(res);
    return res
      .status(200)
      .json({ status: 'success', message: 'account deleted' });
  } catch (error) {
    console.error('Error in deleteAccount:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

export {
  signup,
  login,
  logout,
  getMe,
  googleAuthInit,
  googleAuthCallback,
  changePassword,
  deleteAccount,
};
