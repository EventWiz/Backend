import { body } from 'express-validator';

export const createSessionValidationRules = () => [
  body('event_id')
    .not()
    .isEmpty()
    .withMessage('event_id is required'),
  body('start_date')
    .not()
    .isEmpty()
    .withMessage('start_date is required'),
  body('end_date')
    .not()
    .isEmpty()
    .withMessage('end_date is required'),
  body('speaker')
    .not()
    .isEmpty()
    .withMessage('speaker is required'),
  body('topic')
    .not()
    .isEmpty()
    .withMessage('topic is required'),
  body('venue')
    .not()
    .isEmpty()
    .withMessage('venue is required'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('date is required'),
];
