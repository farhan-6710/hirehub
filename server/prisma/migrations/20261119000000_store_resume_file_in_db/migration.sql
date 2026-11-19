-- Store uploaded resumes in Postgres instead of the server disk.
-- Old resume_url values pointed at files on an ephemeral disk and are no longer reachable.
ALTER TABLE "applications" DROP COLUMN "resume_url";
ALTER TABLE "applications" ADD COLUMN "resume_file" BYTEA;
ALTER TABLE "applications" ADD COLUMN "resume_file_name" TEXT;
ALTER TABLE "applications" ADD COLUMN "resume_mime_type" TEXT;

-- Applicant counts are computed from applications, so the cached copy cannot go stale.
ALTER TABLE "jobs" DROP COLUMN "people_applied";
