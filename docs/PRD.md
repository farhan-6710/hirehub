# Product Requirements — HireHub

A job board. Candidates search jobs and apply with a cover letter and a resume. Employers post jobs, review applicants and set their status. One account is either a `candidate` or an `employer`.

## Users

| User | Entry | Can do |
| --- | --- | --- |
| Visitor | `/`, `/jobs`, `/jobs/[jobId]` | Read the landing page, browse and filter open jobs, read job details |
| Candidate | `/jobs/[jobId]` | Apply once per job with a cover letter and a PDF, DOC or DOCX resume (max 5 MB) |
| Employer | `/employer` | Manage the company profile, post jobs, see applications, view resumes, accept or reject, change password, delete the account |

## Requirements

**Auth.** Email and password sign-up (name, valid email, 8 to 128 character password, role) and login, or Google sign-in with the chosen role. Login and sign-up are modals, not routes. The session is an HttpOnly cookie that lasts 7 days. Logout clears it. Login and sign-up are rate limited (20 attempts per 15 minutes per IP).

**Jobs.** `/jobs` lists open jobs with client-side filters (search, location, job type, experience level). `/jobs/[jobId]` shows the details, skills, applicant count and the apply panel. An employer cannot apply, a candidate cannot post, and nobody can apply to their own job or twice to the same job.

**Applying.** The resume is checked in the browser (type, size) and again on the server (type, size, file signature). It is stored in Postgres with its name and MIME type. Employers read it through an authenticated endpoint; it is never public.

**Employer workspace.** One page, `/employer?tab=`, with tabs: dashboard (counts, recent applications), my jobs (list, applications per job, delete), post job, profile, settings. Posting needs a company profile with a name and headquarters location; the job copies both. Application status is `pending`, `reviewed`, `accepted` or `rejected`. Opening a resume marks a pending application `reviewed`.

**Account.** An employer can change the password and delete the account. Deleting removes the user, their jobs, those jobs' applications and the profile.

**Assistant.** A chat sheet in the header calls OpenRouter from the browser (`useAiAssistant`). It needs `NEXT_PUBLIC_OPENROUTER_API_KEY`.

## Out of scope today

Candidate dashboard, saved jobs, email notifications, password reset by email, company logo upload, draft jobs, pagination of jobs and applications. See [TASKS.md](./TASKS.md).
