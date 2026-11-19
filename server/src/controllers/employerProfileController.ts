import { Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/authMiddleware';
import { EMAIL_PATTERN } from '../utils/validation';

// Runs after `protect` + `requireRole('employer')`.

const PROFILE_FIELDS = [
  'companyName',
  'companyLogo',
  'industry',
  'website',
  'headquartersLocation',
  'companyDescription',
  'contactEmail',
  'contactPhone',
] as const;

type ProfileField = (typeof PROFILE_FIELDS)[number];
type ProfileInput = Record<ProfileField, string>;

const REQUIRED_FIELDS: ProfileField[] = ['companyName', 'headquartersLocation'];
const MAX_FIELD_LENGTH = 2000;
const URL_PATTERN = /^https?:\/\/\S+$/i;

const PROFILE_SELECT = Object.fromEntries(
  PROFILE_FIELDS.map((field) => [field, true]),
) as Record<ProfileField, true>;

const parseProfileInput = (
  body: unknown,
): { input: ProfileInput } | { error: string } => {
  const raw = (body ?? {}) as Partial<Record<ProfileField, unknown>>;
  const input = Object.fromEntries(
    PROFILE_FIELDS.map((field) => [
      field,
      typeof raw[field] === 'string' ? (raw[field] as string).trim() : '',
    ]),
  ) as ProfileInput;

  const missing = REQUIRED_FIELDS.filter((field) => !input[field]);
  if (missing.length > 0) {
    return { error: `${missing.join(' and ')} are required` };
  }
  if (PROFILE_FIELDS.some((field) => input[field].length > MAX_FIELD_LENGTH)) {
    return { error: `Each field must be ${MAX_FIELD_LENGTH} characters or fewer` };
  }
  if (input.contactEmail && !EMAIL_PATTERN.test(input.contactEmail)) {
    return { error: 'contactEmail must be a valid email address' };
  }
  for (const field of ['website', 'companyLogo'] as const) {
    if (input[field] && !URL_PATTERN.test(input[field])) {
      return { error: `${field} must start with http:// or https://` };
    }
  }
  return { input };
};

const getEmployerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: req.user!.id },
      select: PROFILE_SELECT,
    });

    // null means "not created yet"; the client shows an empty form.
    return res.status(200).json({ status: 'success', employerProfile });
  } catch (error) {
    console.error('Error in getEmployerProfile:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

const upsertEmployerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = parseProfileInput(req.body);
    if ('error' in parsed) {
      return res.status(400).json({ error: parsed.error });
    }

    const userId = req.user!.id;
    const employerProfile = await prisma.employerProfile.upsert({
      where: { userId },
      create: { userId, ...parsed.input },
      update: parsed.input,
      select: PROFILE_SELECT,
    });

    return res.status(200).json({ status: 'success', employerProfile });
  } catch (error) {
    console.error('Error in upsertEmployerProfile:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

export { getEmployerProfile, upsertEmployerProfile };
