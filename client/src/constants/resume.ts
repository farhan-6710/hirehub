// Mirrors server/src/middlewares/uploadResume.ts. The server re-checks everything.
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
export const RESUME_ACCEPT = RESUME_EXTENSIONS.join(",");
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const getResumeFileError = (file: File): string | null => {
  const name = file.name.toLowerCase();
  if (!RESUME_EXTENSIONS.some((ext) => name.endsWith(ext))) {
    return "Upload a PDF, DOC, or DOCX file.";
  }
  if (file.size > RESUME_MAX_BYTES) {
    return "Resume file must be 5 MB or smaller.";
  }
  return null;
};
