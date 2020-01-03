import { body } from "express-validator";

export const createEventValidationRules = () => [
  body("type")
    .not()
    .isEmpty()
    .withMessage("img is required"),
  body("img")
    .not()
    .isEmpty()
    .withMessage("img is required"),
  body("title")
    .not()
    .isEmpty()
    .withMessage("title is required"),
  body("desc")
    .not()
    .isEmpty()
    .withMessage("desc is required"),
  body("location")
    .not()
    .isEmpty()
    .withMessage("location is required"),
  body("start_date")
    .not()
    .isEmpty()
    .withMessage("start_date is required"),
  body("end_date")
    .not()
    .isEmpty()
    .withMessage("end_date is required"),
  body("capacity")
    .not()
    .isEmpty()
    .withMessage("capacity is required")
];
