import { body } from 'express-validator';

export const createSessionValidationRules = () => [
  body().isArray(),
  body('*.event_id', 'event_id is required')
    .exists()
    .isString(),
  body('*.start_time', 'start_time is required').exists(),
  body('*.end_time', 'end_time is required').exists(),
  body('*.speaker', 'speaker is required')
    .exists()
    .isString(),
  body('*.topic', 'topic is required')
    .exists()
    .isString(),
  body('*.venue', 'venue is required')
    .exists()
    .isString(),
  body('*.date', 'date is required').exists(),
];
