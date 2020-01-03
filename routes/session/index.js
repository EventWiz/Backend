import { Router } from 'express';
import createSessionValidationRules from '../../validators/rules/session';
import validate from '../../validators';
  getSessionById,
import isAuthenticated from '../../middleware/auth';

const router = Router();

router.post(
  '/create',
  createSessionValidationRules(),
  validate,
  isAuthenticated,
  createSession,
);

router.get('/:sessionId', getSessionById);
export default router;
