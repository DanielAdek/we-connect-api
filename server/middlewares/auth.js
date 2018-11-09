import jwt from 'jsonwebtoken';
import validator from 'validator';

require('dotenv').config();

const secret = process.env.SECRET;
/**
 * @class Authenticate
 */
export default class Authenticate {
  /**
     * verifyUser()
     * @desc verify a user
     * @param {object} req The request object
     * @param {object} res The request object
     * @param {function} next
     * @returns {json} json
     */
  static verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      res.status(403).json({ message: 'You need an API token to access this endpoint' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      if (!decoded) {
        res.status(403).json({ message: 'Invalid API token provided' });
      }
      req.decoded = decoded;
      next();
    } catch (err) {
      res.status(400).jsend.fail({ message: 'Invalid API token provided' });
    }
  }

  /**
     * validateInputFields()
     * @desc user does not input any data
     * @param {object} req The request object
     * @param {object} res The request object
     * @param {function} next
     * @returns {json} json
     */
  static validateInputFields(req, res, next) {
    const check = [];
    const { username, email, password } = req.body;
    if (username.trim() === '' || password.trim() === '') {
      check.push('username or password cannot be empty');
    }
    if (!validator.isEmail(email)) {
      check.push('Email must be valid i.e you@mail.com');
    }
    if (check.length > +'') {
      return res.status(400).json({ check });
    }
    return next();
  }
}
