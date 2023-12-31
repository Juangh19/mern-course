import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('Job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid type value'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);

    if (!isValidId) {
      throw new BadRequestError('invalid MongoDB ID');
    }
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError('no job with the id: ' + value);

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.uderId === job.createdBy.toString();

    if (!isAdmin && isOwner) {
      throw new UnauthorizedError('not authorized to access this route');
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email input is not a valid email')
    .custom(async (email) => {
      const usedEmail = await User.findOne({ email: email });
      if (usedEmail) {
        throw new BadRequestError('Theres an account with the email provided');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must have at leat 8 characters'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email input is not a valid email'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUser = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email input is not a valid email')
    .custom(async (email, { req }) => {
      const usedEmail = await User.findOne({ email: email });
      if (usedEmail && usedEmail._id.toString() !== req.user.userId) {
        throw new BadRequestError('Theres an account with the email provided');
      }
    }),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);
