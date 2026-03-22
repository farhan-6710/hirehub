# AGENTS

Minimal v1 responsibilities for HireHub.

## v1 Scope

- Auth
- Job posting
- Job listing/details
- Apply with resume upload

No role switch or relogin flow in v1.

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

## Responsibilities

### Frontend Agent

- Build pages for listed routes
- Handle form validation and payload shaping
- Integrate APIs for listing, posting, and applying

### Backend Agent

- Implement JWT auth
- Implement jobs and applications APIs
- Handle file upload for resumes

### Data Agent

- Create minimal v1 tables and indexes
- Keep schema simple with SERIAL IDs and timestamps

### QA Agent

- Smoke test auth, post job, list jobs, apply job
- Validate error handling for invalid form payloads

## v1 Form Contracts

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
