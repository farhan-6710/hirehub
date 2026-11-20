# Database — HireHub

Neon Postgres, accessed only by the Express server through Prisma (`server/prisma/schema.prisma`, `@prisma/adapter-pg`). The client never connects to it. Column names are snake_case in the database and camelCase in Prisma.

## Model

```text
users 1─1 employer_profiles
  │ 1─* jobs (posted_by_user_id) 1─* job_skills *─1 skills
  └ 1─* applications (applicant_user_id) *─1 jobs
```

| Table | Notes |
| --- | --- |
| `users` | `role` is `candidate` or `employer`; `password` is a bcrypt hash; `picture` is set by Google sign-in |
| `employer_profiles` | One per employer user; company name and headquarters are required to post jobs |
| `jobs` | `workplace_type`, `job_type`, `experience_level` are enums; `requirements` and `responsibilities` are `String[]`; `company_name` and `location` are copied from the profile when posted; `status` is `open`, `closed`, `draft` or `applied` |
| `skills`, `job_skills` | Skill names are stored lowercase and unique; the only place skills live |
| `applications` | Unique per (`job_id`, `applicant_user_id`); status `pending`, `reviewed`, `accepted`, `rejected`; resume stored in `resume_file` (bytea), `resume_file_name`, `resume_mime_type` |

Deleting a user cascades to their jobs, applications and profile. Deleting a job cascades to its applications and job skills. Deleting an employer profile sets `jobs.employer_profile_id` to null.

## Rules

- The applicant count is computed from `applications` (`_count`), never stored.
- Resume bytes are selected only by `GET /employer/applications/:id/resume`. List queries select explicit fields.
- Change the schema in `schema.prisma`, then `bunx prisma migrate dev --name <name>` locally and commit the migration. Applied migrations are never edited. Apply to a deployed database with `bun run migrate:deploy`.
- Migration `20261119000000_store_resume_file_in_db` drops `applications.resume_url` and `jobs.people_applied`. Old uploaded files lived on a disk that no longer exists, so those links were already dead.
