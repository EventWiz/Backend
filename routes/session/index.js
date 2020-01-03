import { Router } from 'express';
import createSessionValidationRules from '../../validators/rules/session';
import validate from '../../validators';
import {
  createSession,
  getSessionById,
  deleteSession,
  editSession,
} from '../../controllers/sessions';
import isAuthenticated from '../../middleware/auth';

const router = Router();

router.post(
  '/create',
  createSessionValidationRules(),
  validate,
  isAuthenticated,
  createSession,
);

router.delete('/:sessionId', isAuthenticated, deleteSession);

router.put('/:sessionId', isAuthenticated, editSession);

router.get('/:sessionId', getSessionById);

export default router;
