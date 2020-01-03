import { body } from 'express-validator';

// export const createSessionValidationRules = () => [
//   body('event_id')
//     .not()
//     .isEmpty()
//     .withMessage('event_id is required'),
//   body('start_time')
//     .not()
//     .isEmpty()
//     .withMessage('start_time is required'),
//   body('end_time')
//     .not()
//     .isEmpty()
//     .withMessage('end_time is required'),
//   body('speaker')
//     .not()
//     .isEmpty()
//     .withMessage('speaker is required'),
//   body('topic')
//     .not()
//     .isEmpty()
//     .withMessage('topic is required'),
//   body('venue')
//     .not()
//     .isEmpty()
//     .withMessage('venue is required'),
//   body('date')
//     .not()
//     .isEmpty()
//     .withMessage('date is required'),
// ];

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
