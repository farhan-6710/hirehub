import path from 'path';

// First bytes of each allowed format. The browser-sent MIME type alone is not trusted.
const PDF_SIGNATURE = Buffer.from('%PDF');
const DOCX_SIGNATURE = Buffer.from([0x50, 0x4b, 0x03, 0x04]); // ZIP container
const DOC_SIGNATURE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0]); // OLE2 container

const SIGNATURES: Record<string, Buffer> = {
  '.pdf': PDF_SIGNATURE,
  '.docx': DOCX_SIGNATURE,
  '.doc': DOC_SIGNATURE,
};

export const hasValidResumeSignature = (
  originalName: string,
  data: Buffer,
): boolean => {
  const signature = SIGNATURES[path.extname(originalName).toLowerCase()];
  return Boolean(signature) && data.subarray(0, signature.length).equals(signature);
};

// Keeps a readable name for Content-Disposition without path parts or quotes.
export const toSafeFileName = (originalName: string): string => {
  const ext = path.extname(originalName).toLowerCase();
  const base = path
    .basename(originalName, path.extname(originalName))
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .slice(0, 80);
  return `${base || 'resume'}${ext}`;
};
