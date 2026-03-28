import type { BadgeVariant } from "@/types/jobs/components";

export interface Application {
  id: number;
  job_id: number;
  applicant_name: string;
  applicant_email: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  applied_date: string;
  resume_url: string;
  cover_letter: string;
}

export const applications: Application[] = [
  {
    id: 101,
    job_id: 1, // Frontend Developer
    applicant_name: "Alice Johnson",
    applicant_email: "alice.j@example.com",
    status: "Pending",
    applied_date: "2026-03-20T10:30:00.000Z",
    resume_url: "#",
    cover_letter:
      "I am a passionate frontend developer with 3 years of experience in React and Tailwind CSS. I have built scalable UI components and would love to contribute to TechCorp.",
  },
  {
    id: 102,
    job_id: 1, // Frontend Developer
    applicant_name: "Bob Smith",
    applicant_email: "bob.smith@example.com",
    status: "Pending",
    applied_date: "2026-03-19T14:15:00.000Z",
    resume_url: "#",
    cover_letter:
      "With a strong background in JavaScript and Next.js, I have led multiple frontend projects. I'm excited about the opportunity at TechCorp.",
  },
  {
    id: 103,
    job_id: 1, // Frontend Developer
    applicant_name: "Charlie Davis",
    applicant_email: "charlie.d@example.com",
    status: "Pending",
    applied_date: "2026-03-18T09:00:00.000Z",
    resume_url: "#",
    cover_letter: "I am applying for the frontend role. Attached is my resume.",
  },
  {
    id: 104,
    job_id: 2, // Backend Developer
    applicant_name: "Diana Prince",
    applicant_email: "diana.p@example.com",
    status: "Pending",
    applied_date: "2026-03-21T11:45:00.000Z",
    resume_url: "#",
    cover_letter:
      "My extensive experience with Node.js, Express, and PostgreSQL aligns perfectly with the requirements for this role at CodeBase.",
  },
  {
    id: 105,
    job_id: 2, // Backend Developer
    applicant_name: "Edward Elric",
    applicant_email: "ed.elric@example.com",
    status: "Pending",
    applied_date: "2026-03-22T16:20:00.000Z",
    resume_url: "#",
    cover_letter:
      "I have a solid understanding of system architecture and database optimization. I'm eager to bring my skills to your backend team.",
  },
];

export const getApplicationStatusBadge = (
  status: Application["status"],
): { variant: BadgeVariant; label: string; className: string } => {
  switch (status) {
    case "Accepted":
      return {
        variant: "default",
        label: "Accepted",
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      };
    case "Rejected":
      return {
        variant: "destructive",
        label: "Rejected",
        className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      };
    case "Reviewed":
      return {
        variant: "secondary",
        label: "Reviewed",
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      };
    default:
      return {
        variant: "outline",
        label: "Pending",
        className:
          "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20",
      };
  }
};
