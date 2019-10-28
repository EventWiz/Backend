import jwt from 'jsonwebtoken';
import secret from '../config/secret';


/**
 * Generates token based off of the payload
 *
 * @param {*} payload
 * @returns
 */
const generateToken = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error(error.message);
  }
};
