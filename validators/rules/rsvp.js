import { body } from 'express-validator';

export const rsvpValidationRules = () => [
  body('event_id')
    .not()
    .isEmpty()
    .withMessage('event_id is required'),
];
