import { Router } from 'express';
import authRoutes from './auth';
import eventRoutes from './event';
import userRoutes from './user';

const router = Router();

router.get('/', (req, res) => res.status(200).json('Welcome'));
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/users', userRoutes);

export default router;
