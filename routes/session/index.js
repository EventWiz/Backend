import { Router } from 'express';
import { createSessionValidationRules } from '../../validators/rules/session';
import validate from '../../validators';
import createSession from '../../controllers/sessions';
import isAuthenticated from '../../middleware/auth';

const router = Router();

router.post(
  '/create',
  createSessionValidationRules(),
  validate,
  isAuthenticated,
  createSession,
);

export default router;
