# Tasks — HireHub Client

`[x]` done · `[ ]` to do.

Product: [PRD](../PRD.md) · Structure: [ARCHITECTURE](./ARCHITECTURE.md).

## Done

- [x] Landing page, job listing with filters, job details and apply
- [x] Modal auth (email and password, Google), role gates
- [x] Employer workspace: dashboard, my jobs, applications and resume view, post job, company profile, settings (change password, delete account)
- [x] Brand manifest, AI assistant sheet, light and dark theme
- [x] Every UI component at 120 lines or fewer

## Owner checks

- [ ] In Vercel, confirm "Include files outside the root directory in the Build Step" is on
- [ ] After deploying, check the live flow once: sign up, apply with a PDF, view the resume as the employer
- [ ] Apply the production migration first: see [server TASKS](../server/TASKS.md)

## Later

- [ ] Candidate area: applied jobs and their status
- [ ] Company logo upload (`companyLogo` is stored but shown nowhere)
- [ ] Unit and component tests
- [ ] Marketing copy: footer links, FAQ answers and landing metrics are placeholders, not live data

Server work is tracked in [server TASKS](../server/TASKS.md).
