import express from 'express';
import {
  applyForJob,
  createJob,
  getAllOpenJobs,
  getJobById,
} from '../controllers/jobController';
import { protect } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/requireRole';
import { uploadResume } from '../middlewares/uploadResume';

const router = express.Router();

router.get('/', getAllOpenJobs);
router.get('/:jobId', getJobById);
router.post('/', protect, requireRole('employer'), createJob);
router.post(
  '/:jobId/apply',
  protect,
  requireRole('candidate'),
  uploadResume.single('resumeFile'),
  applyForJob,
);

export default router;
