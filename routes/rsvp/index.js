import { Router } from 'express';
import { rsvpValidationRules } from '../../validators/rules/rsvp';
import validate from '../../validators';
import rsvp from '../../controllers/rsvp';
import isAuthenticated from '../../middleware/auth';

const router = Router();

router.post(
  '/create',
  rsvpValidationRules(),
  validate,
  isAuthenticated,
  rsvp,
);

export default router;
