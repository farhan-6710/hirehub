import { Response } from 'express';
import { ApplicationStatus } from '@prisma/client';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/authMiddleware';

// Every route here runs after `protect` + `requireRole('employer')`.

const APPLICATION_STATUSES = Object.values(ApplicationStatus);

const parseId = (value: string | string[] | undefined): number | null => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const getEmployerDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const ownJobs = { job: { postedByUserId: userId } };

    const [
      activeJobs,
      totalApplicants,
      reviewedApplications,
      acceptedCandidates,
      recentApplications,
    ] = await Promise.all([
      prisma.job.count({ where: { postedByUserId: userId, status: 'open' } }),
      prisma.application.count({ where: ownJobs }),
      prisma.application.count({ where: { ...ownJobs, status: 'reviewed' } }),
      prisma.application.count({ where: { ...ownJobs, status: 'accepted' } }),
      prisma.application.findMany({
        where: ownJobs,
        select: {
          id: true,
          status: true,
          createdAt: true,
          applicant: { select: { name: true } },
          job: { select: { title: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
    ]);

    return res.status(200).json({
      status: 'success',
      dashboardStats: {
        activeJobs,
        totalApplicants,
        reviewedApplications,
        acceptedCandidates,
      },
      recentApplications: recentApplications.map((entry) => ({
        id: entry.id,
        candidateName: entry.applicant.name,
        jobTitle: entry.job.title,
        status: entry.status,
        appliedDate: entry.createdAt.toISOString().slice(0, 10),
      })),
    });
  } catch (error) {
    console.error('Error in getEmployerDashboard:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

const getEmployerJobs = async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { postedByUserId: req.user!.id },
      include: {
        jobSkills: { include: { skill: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      status: 'success',
      count: jobs.length,
      jobs: jobs.map(({ jobSkills, _count, ...job }) => ({
        ...job,
        peopleApplied: _count.applications,
        skills: jobSkills.map((jobSkill) => jobSkill.skill.name),
      })),
    });
  } catch (error) {
    console.error('Error in getEmployerJobs:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

const deleteEmployerJob = async (req: AuthRequest, res: Response) => {
  try {
    const jobId = parseId(req.params.jobId);
    if (!jobId) {
      return res.status(400).json({ error: 'jobId must be a valid number' });
    }

    const deleted = await prisma.job.deleteMany({
      where: { id: jobId, postedByUserId: req.user!.id },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Job not found for this employer' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteEmployerJob:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

const getJobApplicationsForEmployer = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const jobId = parseId(req.params.jobId);
    if (!jobId) {
      return res.status(400).json({ error: 'jobId must be a valid number' });
    }

    const job = await prisma.job.findFirst({
      where: { id: jobId, postedByUserId: req.user!.id },
      select: { id: true, title: true },
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found for this employer' });
    }

    const applications = await prisma.application.findMany({
      where: { jobId: job.id },
      select: {
        id: true,
        jobId: true,
        status: true,
        coverLetter: true,
        resumeFileName: true,
        createdAt: true,
        applicant: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      status: 'success',
      job,
      count: applications.length,
      applications: applications.map((entry) => ({
        id: entry.id,
        jobId: entry.jobId,
        applicantId: entry.applicant.id,
        applicantName: entry.applicant.name,
        applicantEmail: entry.applicant.email,
        status: entry.status,
        coverLetter: entry.coverLetter,
        resumeFileName: entry.resumeFileName,
        hasResume: entry.resumeFileName !== null,
        appliedDate: entry.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error in getJobApplicationsForEmployer:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

const getApplicationResume = async (req: AuthRequest, res: Response) => {
  try {
    const applicationId = parseId(req.params.applicationId);
    if (!applicationId) {
      return res
        .status(400)
        .json({ error: 'applicationId must be a valid number' });
    }

    // Only the employer who posted the job can read the resume.
    const application = await prisma.application.findFirst({
      where: { id: applicationId, job: { postedByUserId: req.user!.id } },
      select: { resumeFile: true, resumeFileName: true, resumeMimeType: true },
    });

    if (!application) {
      return res
        .status(404)
        .json({ error: 'Application not found for this employer' });
    }

    if (!application.resumeFile || !application.resumeMimeType) {
      return res
        .status(404)
        .json({ error: 'No resume file stored for this application' });
    }

    res.setHeader('Content-Type', application.resumeMimeType);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${application.resumeFileName ?? 'resume'}"`,
    );
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(Buffer.from(application.resumeFile));
  } catch (error) {
    console.error('Error in getApplicationResume:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const applicationId = parseId(req.params.applicationId);
    if (!applicationId) {
      return res
        .status(400)
        .json({ error: 'applicationId must be a valid number' });
    }

    const status = String((req.body as { status?: string }).status ?? '')
      .trim()
      .toLowerCase() as ApplicationStatus;

    if (!APPLICATION_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `status must be one of ${APPLICATION_STATUSES.join(', ')}`,
      });
    }

    const updated = await prisma.application.updateMany({
      where: { id: applicationId, job: { postedByUserId: req.user!.id } },
      data: { status },
    });

    if (updated.count === 0) {
      return res
        .status(404)
        .json({ error: 'Application not found for this employer' });
    }

    return res.status(200).json({
      status: 'success',
      application: { id: applicationId, status },
    });
  } catch (error) {
    console.error('Error in updateApplicationStatus:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

export {
  getEmployerDashboard,
  getEmployerJobs,
  deleteEmployerJob,
  getJobApplicationsForEmployer,
  getApplicationResume,
  updateApplicationStatus,
};
