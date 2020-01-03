import { ErrorHandler } from 'express-error-bouncer';
import Chatkit from '@pusher/chatkit-server';
import formatResponse from '../helpers';
import { generateToken } from '../helpers/auth';


import models from '../database/models';

const chatkit = new Chatkit({
  instanceLocator: process.env.PUSHER_INSTANCE_LOCATOR,
  key: process.env.PUSHER_KEY,
});

export async function register(req, res, next) {
  try {
    const {
      email, password, firstName, lastName,
    } = req.body;
    const [user, created] = await models.User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password,
      },
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });
    if (!created && user) {
      throw new ErrorHandler(409, 'User with the email address already exists');
    }

    await chatkit.createUser({
      id: email,
      name: firstName,
    });

    return formatResponse(res, { message: 'success', user }, 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw new ErrorHandler(401, 'Invalid credentials');
    }
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const token = await generateToken({ __uuid: user.id, email: user.email });
      return formatResponse(
        res,
        {
          user,
          token,
        },
        200,
      );
    }
    throw new ErrorHandler(401, 'Invalid credentials');
  } catch (error) {
    next(error);
  }
}
