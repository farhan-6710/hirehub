import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/authMiddleware';
import {
  JobType,
  WorkplaceType,
  ExperienceLevel,
  Prisma,
} from '@prisma/client';
import { hasValidResumeSignature, toSafeFileName } from '../utils/resumeFile';

interface CreateJobBody {
  title?: string;
  workplaceType?: WorkplaceType;
  jobType?: JobType;
  minSalary?: number;
  maxSalary?: number;
  currency?: string;
  experienceLevel?: ExperienceLevel;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  skills?: string[];
  applicationDeadline?: string;
}

interface ApplyForJobBody {
  coverLetter?: string;
}

// Never select resume bytes in API responses.
const APPLICATION_SUMMARY_SELECT = {
  id: true,
  jobId: true,
  applicantUserId: true,
  status: true,
  coverLetter: true,
  resumeFileName: true,
  createdAt: true,
} satisfies Prisma.ApplicationSelect;

const isNonEmptyStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((item) => typeof item === 'string' && item.trim().length > 0);

const getJobEnumError = (
  workplaceType: string,
  jobType: string,
  experienceLevel: string,
): string | null => {
  if (!Object.values(WorkplaceType).includes(workplaceType as WorkplaceType)) {
    return `workplaceType must be one of ${Object.values(WorkplaceType).join(', ')}`;
  }
  if (!Object.values(JobType).includes(jobType as JobType)) {
    return `jobType must be one of ${Object.values(JobType).join(', ')}`;
  }
  if (
    !Object.values(ExperienceLevel).includes(experienceLevel as ExperienceLevel)
  ) {
    return `experienceLevel must be one of ${Object.values(ExperienceLevel).join(', ')}`;
  }
  return null;
};

const getAllOpenJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: 'open',
      },
      select: {
        id: true,
        title: true,
        companyName: true,
        location: true,
        workplaceType: true,
        jobType: true,
        minSalary: true,
        maxSalary: true,
        currency: true,
        experienceLevel: true,
        description: true,
        _count: { select: { applications: true } },
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      status: 'success',
      count: jobs.length,
      jobs: jobs.map(({ _count, ...job }) => ({
        ...job,
        peopleApplied: _count.applications,
      })),
    });
  } catch (error) {
    console.error('Error in getAllOpenJobs:', error);
    return res.status(500).json({
      error: 'internal server error',
    });
  }
};

const getJobById = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.jobId);

    if (!Number.isInteger(jobId)) {
      return res.status(400).json({ error: 'jobId must be a valid number' });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        postedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        jobSkills: {
          include: {
            skill: true,
          },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    return res.status(200).json({
      status: 'success',
      job: {
        ...job,
        peopleApplied: job._count.applications,
        skills: job.jobSkills.map((jobSkill) => jobSkill.skill.name),
      },
    });
  } catch (error) {
    console.error('Error in getJobById:', error);
    return res.status(500).json({
      error: 'internal server error',
    });
  }
};

const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const {
      title,
      workplaceType,
      jobType,
      minSalary,
      maxSalary,
      currency,
      experienceLevel,
      description,
      requirements,
      responsibilities,
      skills,
      applicationDeadline,
    } = req.body as CreateJobBody;

    if (
      !title ||
      !workplaceType ||
      !jobType ||
      minSalary === undefined ||
      maxSalary === undefined ||
      !currency ||
      !experienceLevel ||
      !description ||
      !requirements ||
      !responsibilities ||
      !skills ||
      !applicationDeadline
    ) {
      return res.status(400).json({
        error:
          'title, workplaceType, jobType, minSalary, maxSalary, currency, experienceLevel, description, requirements, responsibilities, skills and applicationDeadline are required',
      });
    }

    const enumError = getJobEnumError(workplaceType, jobType, experienceLevel);
    if (enumError) {
      return res.status(400).json({ error: enumError });
    }

    if (!isNonEmptyStringArray(requirements)) {
      return res.status(400).json({
        error: 'requirements must be a non-empty array of strings',
      });
    }

    if (!isNonEmptyStringArray(responsibilities)) {
      return res.status(400).json({
        error: 'responsibilities must be a non-empty array of strings',
      });
    }

    if (!isNonEmptyStringArray(skills)) {
      return res.status(400).json({
        error: 'skills must be a non-empty array of strings',
      });
    }

    const min = Number(minSalary);
    const max = Number(maxSalary);
    if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0) {
      return res.status(400).json({
        error: 'minSalary and maxSalary must be non-negative numbers',
      });
    }

    if (max < min) {
      return res.status(400).json({
        error: 'maxSalary must be greater than or equal to minSalary',
      });
    }

    const parsedDeadline = new Date(applicationDeadline);
    if (Number.isNaN(parsedDeadline.getTime())) {
      return res.status(400).json({
        error: 'applicationDeadline must be a valid date',
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDateOnly = new Date(parsedDeadline);
    deadlineDateOnly.setHours(0, 0, 0, 0);

    if (deadlineDateOnly < today) {
      return res.status(400).json({
        error: 'applicationDeadline must be today or later',
      });
    }

    const createdJob = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
      const employerProfile = await tx.employerProfile.findUnique({
        where: { userId },
        select: { id: true, companyName: true, headquartersLocation: true },
      });

      if (
        !employerProfile?.companyName ||
        !employerProfile?.headquartersLocation
      ) {
        throw new Error('EMPLOYER_PROFILE_INCOMPLETE');
      }

      const job = await tx.job.create({
        data: {
          postedByUserId: userId,
          employerProfileId: employerProfile?.id,
          title,
          companyName: employerProfile.companyName,
          location: employerProfile.headquartersLocation,
          workplaceType,
          jobType,
          minSalary: min,
          maxSalary: max,
          currency,
          experienceLevel,
          description,
          requirements,
          responsibilities,
          applicationDeadline: parsedDeadline,
        },
      });

      const normalizedSkillNames = [
        ...new Set(
          skills
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0)
            .map((skill) => skill.toLowerCase()),
        ),
      ];

      for (const skillName of normalizedSkillNames) {
        const skill = await tx.skill.upsert({
          where: { name: skillName },
          create: { name: skillName },
          update: {},
        });

        await tx.jobSkill.create({
          data: {
            jobId: job.id,
            skillId: skill.id,
          },
        });
      }

      const jobWithRelations = await tx.job.findUnique({
        where: { id: job.id },
        include: {
          postedByUser: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          jobSkills: {
            include: {
              skill: true,
            },
          },
        },
      });

      return jobWithRelations;
    });

    return res.status(201).json({
      status: 'success',
      job: {
        ...createdJob,
        skills:
          createdJob?.jobSkills.map((jobSkill) => jobSkill.skill.name) ?? [],
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'EMPLOYER_PROFILE_INCOMPLETE'
    ) {
      return res.status(400).json({
        error:
          'Please complete your employer profile with company name and headquarters location before posting a job',
      });
    }

    console.error('Error in createJob:', error);
    return res.status(500).json({
      error: 'internal server error',
    });
  }
};

const applyForJob = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const jobId = Number(req.params.jobId);
    if (!Number.isInteger(jobId)) {
      return res.status(400).json({ error: 'jobId must be a valid number' });
    }

    const { coverLetter } = req.body as ApplyForJobBody;

    if (!coverLetter || coverLetter.trim().length === 0) {
      return res.status(400).json({ error: 'coverLetter is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'resumeFile is required' });
    }

    if (!hasValidResumeSignature(req.file.originalname, req.file.buffer)) {
      return res.status(400).json({
        error: 'Resume file content does not match a PDF, DOC, or DOCX file',
      });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, postedByUserId: true, status: true },
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'open') {
      return res
        .status(400)
        .json({ error: 'This job is not open for applications' });
    }

    if (job.postedByUserId === userId) {
      return res
        .status(400)
        .json({ error: 'You cannot apply to your own job' });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        applicantUserId: userId,
        coverLetter: coverLetter.trim(),
        resumeFile: new Uint8Array(req.file.buffer),
        resumeFileName: toSafeFileName(req.file.originalname),
        resumeMimeType: req.file.mimetype,
      },
      select: APPLICATION_SUMMARY_SELECT,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res
        .status(409)
        .json({ error: 'You have already applied for this job' });
    }

    console.error('Error in applyForJob:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

export { getAllOpenJobs, getJobById, createJob, applyForJob };