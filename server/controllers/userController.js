import { Form } from 'form-my-simple-validation';
import * as Utils from '../utils/helpers';
import formSchema from '../utils/validation';
import { errorResponse, successResponse } from '../utils/response';
import * as Services from '../services';
import db from '../models';

const { Users } = db;

/**
 * @class
 */
export class UserController {
  /**
   * @method create
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  async createUser(req, res) {
    try {
      const {
        username, email, password, firstName, lastName
      } = req.body;

      // validate form fields
      const validationResult = Form.validateFields('onboard', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      // deny duplicate record
      const report = await Services.reportDuplicate(this.database = Users, { email });

      if (report === 'negative') {
        return res.status(409).jsend.fail(errorResponse('DuplicateError', 409, 'email', 'Create User Account', 'Email already exist', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      // Create customer account
      const data = {
        username, email, firstName, lastName, password
      };

      const user = await Services.insertToDataBase(this.database = Users, data);

      const token = Utils.generateToken('8760h', { id: user.id });

      return res.status(201).jsend.success(successResponse('Account created!', 201, 'Create User Account', {
        error: false, operationStatus: 'Operation Successful!', user, token
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'create User', `${error.message || 'Server not responding'}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * @method login
   * @param {object} req The request object
   * @param {object} res The response object
   * @return {*} json
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      // validate form fields
      const validationResult = Form.validateFields('authenticate', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      const user = await Services.retreiveOneData(this.database = Users, { email });

      if (!user) {
        return res.status(409).jsend.fail(errorResponse('IdentificatonError', 409, 'email', 'login', 'Email not found', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      // confirm password is correct
      const passwordMatch = Users.comparePassword(password, user);
      if (!passwordMatch) {
        return res.status(409).jsend.fail(errorResponse('IdentificatonError', 400, 'password', 'login', 'password incorrect', { error: true, operationStatus: 'Processs Terminated!', passwordMatch }));
      }

      const token = Utils.generateToken('8760h', { id: user.id });

      return res.status(200).jsend.success(successResponse('Login Successful', 200, 'login', {
        error: false, operationStatus: 'Operation Successful!', user, token
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'login User', `${error.message || 'Server not responding'}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }
}
