import { Router } from 'express';
import { createEventValidationRules } from '../../validators/rules/event';
import validate from '../../validators';
import { createEvent, editEvent } from '../../controllers/events';
import isAuthenticated from '../../middleware/auth';

const router = Router();

router.post(
  '/create',
  createEventValidationRules(),
  validate,
  isAuthenticated,
  createEvent,
);

router.put('/:eventId', isAuthenticated, editEvent);

export default router;
