import { Router } from 'express';
import Chatkit from '@pusher/chatkit-server';

import authRoutes from './auth';
import eventRoutes from './event';
import sessionRoutes from './session';
import userRoutes from './user';
import rsvpRoutes from './rsvp';

const router = Router();

const chatkit = new Chatkit({
  instanceLocator: process.env.PUSHER_INSTANCE_LOCATOR,
  key: process.env.PUSHER_KEY,
});

router.get('/', (req, res) => res.status(200).json('Welcome'));
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/sessions/', sessionRoutes);
router.use('/users', userRoutes);
router.use('/rsvp', rsvpRoutes);

// token authentication for pusher
router.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
});

export default router;
