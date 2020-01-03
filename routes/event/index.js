import { Router } from 'express';
import { createEventValidationRules } from '../../validators/rules/event';
import validate from '../../validators';
import {
  createEvent,
  editEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
} from '../../controllers/events';
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

router.delete('/:eventId', isAuthenticated, deleteEvent);

router.get('/', getAllEvents);

router.get('/:eventId', getEventById);

export default router;
