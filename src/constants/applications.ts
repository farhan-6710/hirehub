import type { BadgeVariant } from "@/types/jobs/components";

export interface Application {
  id: number;
  jobId: number;
  applicantName: string;
  applicantEmail: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  appliedDate: string;
  resumeUrl: string;
  coverLetter: string;
}

export const applications: Application[] = [
  {
    id: 101,
    jobId: 1,
    applicantName: "Alice Johnson",
    applicantEmail: "alice.j@example.com",
    status: "reviewed",
    appliedDate: "2026-03-20T10:30:00.000Z",
    resumeUrl: "#",
    coverLetter:
      "I am a passionate frontend developer with 3 years of experience in React and Tailwind CSS. I have built scalable UI components and would love to contribute to TechCorp.",
  },
  {
    id: 102,
    jobId: 1,
    applicantName: "Bob Smith",
    applicantEmail: "bob.smith@example.com",
    status: "reviewed",
    appliedDate: "2026-03-19T14:15:00.000Z",
    resumeUrl: "#",
    coverLetter:
      "With a strong background in JavaScript and Next.js, I have led multiple frontend projects. I'm excited about the opportunity at TechCorp.",
  },
  {
    id: 103,
    jobId: 1,
    applicantName: "Charlie Davis",
    applicantEmail: "charlie.d@example.com",
    status: "pending",
    appliedDate: "2026-03-18T09:00:00.000Z",
    resumeUrl: "#",
    coverLetter: "I am applying for the frontend role. Attached is my resume.",
  },
  {
    id: 104,
    jobId: 2,
    applicantName: "Diana Prince",
    applicantEmail: "diana.p@example.com",
    status: "accepted",
    appliedDate: "2026-03-21T11:45:00.000Z",
    resumeUrl: "#",
    coverLetter:
      "My extensive experience with Node.js, Express, and PostgreSQL aligns perfectly with the requirements for this role at CodeBase.",
  },
  {
    id: 105,
    jobId: 2,
    applicantName: "Edward Elric",
    applicantEmail: "ed.elric@example.com",
    status: "rejected",
    appliedDate: "2026-03-22T16:20:00.000Z",
    resumeUrl: "#",
    coverLetter:
      "I have a solid understanding of system architecture and database optimization. I'm eager to bring my skills to your backend team.",
  },
];

export const getApplicationStatusBadge = (
  status: Application["status"],
): { variant: BadgeVariant; label: string; className: string } => {
  switch (status) {
    case "accepted":
      return {
        variant: "default",
        label: "Accepted",
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      };
    case "rejected":
      return {
        variant: "destructive",
        label: "Rejected",
        className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      };
    case "reviewed":
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
