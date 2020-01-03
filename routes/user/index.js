import { Router } from 'express';
import getUserProfile from '../../controllers/user';
import isAuthenticated from '../../middleware/auth';

const router = Router();

router.get(
  '/profile',
  isAuthenticated,
  getUserProfile,
);

export default router;
