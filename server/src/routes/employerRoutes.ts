import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/requireRole';
import {
  getEmployerDashboard,
  getEmployerJobs,
  deleteEmployerJob,
  getJobApplicationsForEmployer,
  getApplicationResume,
  updateApplicationStatus,
} from '../controllers/employerController';
import {
  getEmployerProfile,
  upsertEmployerProfile,
} from '../controllers/employerProfileController';

const router = express.Router();

router.use(protect, requireRole('employer'));

router.get('/dashboard', getEmployerDashboard);
router.get('/profile', getEmployerProfile);
router.put('/profile', upsertEmployerProfile);
router.get('/my-jobs', getEmployerJobs);
router.delete('/jobs/:jobId', deleteEmployerJob);
router.get('/jobs/:jobId/applications', getJobApplicationsForEmployer);
router.get('/applications/:applicationId/resume', getApplicationResume);
router.patch('/applications/:applicationId/status', updateApplicationStatus);

export default router;
