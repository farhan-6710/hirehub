# HireHub v1 (Minimal Scope)

HireHub v1 focuses only on:

- Auth
- Job posting
- Job listing/details
- Applying to a job with resume upload

No role-switch complexity in v1. A logged-in user can post and apply from the same account.

## Run

```bash
bun run dev
```

## v1 Routes

### Public

- /
- /jobs
- /jobs/[jobId]

### Auth

- /auth/register
- /auth/login

### Protected

- /post-job
- /my-jobs
- /jobs/[jobId]/apply

## v1 Forms

### Auth

- email
- password
- fullName (register only)

### Post Job

- title
- companyName
- location
- workplaceType
- employmentType
- minSalary
- maxSalary
- currency
- experienceLevel
- skills[]
- description
- requirements[]
- applicationDeadline

### Apply Job

- jobId
- fullName
- email
- phone
- resumeFile
- coverLetter (optional)

## Correct v1 Build Steps

1. Setup backend server with JWT auth and PostgreSQL connection.
2. Create core tables: users, jobs, job_skills, applications.
3. Build auth APIs: register and login.
4. Build jobs APIs: create job, list jobs, get job details, list my posted jobs.
5. Build apply API: multipart form-data with resume upload.
6. Wire frontend auth pages and token/session handling.
7. Build post-job page with validation and API integration.
8. Build jobs listing page and job detail page with fetch + rendering.
9. Build apply flow on job detail page with resume upload.
10. Add basic validation, error handling, and smoke tests for the above flows.

For DB schema and DTO contracts, see BACKEND.md.
