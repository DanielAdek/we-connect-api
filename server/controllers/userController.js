import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';

require('dotenv').config();

const secret = process.env.SECRET;

const { Users } = db;

/**
 * @class User
 */
export default class User {
  /**
     * createUser()
     * @desc create a new user account
     * @param {*} req express request object
     * @param {*} res exoress response object
     * @returns {object} json
     */
  static createUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const { username, email } = req.body;
    return Users
      .findOrCreate({
        where: {
          email
        },
        defaults: {
          username, email, password
        }
      })
      .spread((user, created) => {
        if (!created) {
          return res.status(400).jsend.fail({ message: 'Account already existed!' });
        }
        const { id } = user;
        const token = jwt.sign({ email, id }, secret, { expiresIn: '24h' });
        res.status(201).jsend.success({
          message: `${user.username} is successfully created as a new account`,
          user: { id, username, email },
          Client_Token: token
        });
      })
      .catch((err) => {
        res.status(500).jsend.fail({ message: `Something went wrong: ${err.message}` });
      });
  }

  /**
     * @returns {object} loginUser
     * @param {*} req
     * @param {*} res
     */
  static loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).jsend.fail({ message: 'email and password cannot be empty' });
    }
    return Users
      .findOne({
        where: {
          email
        }
      }).then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const { id, username } = user;
          const token = jwt.sign({ email, id }, secret, { expiresIn: '24h' });
          return res.status(200).jsend.success({
            message: `Welcome back ${username}`,
            user: { id, username, email },
            Client_token: token
          });
        }
        return res.status(400).jsend.fail({ message: 'email or password is incorrect' });
      }).catch((err) => {
        res.status(500).jsend.fail({ message: `something went wrong: ${err.message} ` });
      });
  }

  /**
   * delete a user account
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof User
   */
  static deleteAccount(req, res) {
    const { id } = req.decoded;
    Users.findOne({
      where: {
        id
      }
    }).then((user) => {
      if (user.id !== id) {
        return res.status(400).jsend.fail({ message: 'This Account does not belong to you' });
      }
      return user.destroy().then(() => res.status(200).jsend.success({ message: 'Account Is Successfully Deleted' }));
    });
  }

  /**
   * find alls user
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof User
   */
  static findAllUsers(req, res) {
    return Users
      .findAll({
        attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
      })
      .then((users) => {
        res.status(200).jsend.success({ users });
      });
  }
}
