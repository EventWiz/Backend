import { Router } from 'express';

import authRoutes from './auth';
import eventRoutes from './event';
import sessionRoutes from './session';
import userRoutes from './user';
import rsvpRoutes from './rsvp';

const router = Router();

router.get('/', (req, res) => res.status(200).json('Welcome'));
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/sessions/', sessionRoutes);
router.use('/users', userRoutes);
router.use('/rsvp', rsvpRoutes);

export default router;
