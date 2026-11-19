import path from 'path';
import multer from 'multer';
import { Request } from 'express';

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const RESUME_MIME_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx':
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export class ResumeValidationError extends Error {
  status = 400;
}

const fileFilter: multer.Options['fileFilter'] = (_req: Request, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (RESUME_MIME_TYPES[ext] !== file.mimetype) {
    cb(
      new ResumeValidationError(
        'Only PDF, DOC, and DOCX resume files are allowed',
      ),
    );
    return;
  }

  cb(null, true);
};

// Files stay in memory and are saved to Postgres by the controller.
export const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: RESUME_MAX_BYTES, files: 1 },
});
