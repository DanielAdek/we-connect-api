import { Form } from 'form-my-simple-validation';
import * as Utils from '../utils/helpers';
import formSchema from '../utils/validation';
import * as Services from '../services';
import { errorResponse, successResponse } from '../utils/response';
import db from '../models';

const { Businesses } = db;
/**
 * @class BusinessController
 */
export class BusinessController {
  /**
   * Adds a new business
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  async createBusiness(req, res) {
    try {
      const validationResult = Form.validateFields('create_business', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }
      const {
        businessName, category, contactNumber, businessLocation, description, image
      } = req.body;

      const { id } = req.user;

      // check for image exists in the request body
      let businessImage = image;
      if (req.file) {
        const file = Utils.dataUri(req);
        // SAVES IMAGE TO CLOUDINARY
        businessImage = await Utils.imageUpload(file);
        businessImage = businessImage.url;
      }

      const data = {
        userId: id, businessName, category, contactNumber, description, businessImage, businessLocation
      };

      const business = await Services.insertToDataBase(this.database = Businesses, data);

      return res.status(201).jsend.success(successResponse('Business created!', 201, 'Create new business', {
        error: false, operationStatus: 'Operation Successful!', business
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || (error.error && error.error.syscall) || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'create business', `${error.message || 'Server not responding'}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * modify a business
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  async modifyBusiness(req, res) {
    try {
      const {
        businessName, category, contactNumber, businessLocation, description
      } = req.body;

      // validate form fields
      const validationResult = Form.validateFields('edit_business', formSchema, req.body);

      if (validationResult.error) {
        return res.status(400).jsend.fail(validationResult);
      }

      const { id: userId } = req.user;

      const { businessId: id } = req.params;

      const business = await Services.retreiveOneData(this.database = Businesses, { id, userId });

      if (!business) {
        return res.status(400).jsend.fail(errorResponse('NotFound', 400, '', 'edit business', 'business does not exist', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      const data = {
        businessName: businessName.trim() || business.businessName,
        category: category.trim() || business.category,
        contactNumber: contactNumber.trim() || business.contactNumber,
        businessLocation: businessLocation.trim() || business.businessLocation,
        description: description.trim() || business.description
      };

      await Services.modifyData(this.database = Businesses, data, { id });

      return res.status(200).jsend.success(successResponse('Business Edited Successfully', 200, 'edit business', {
        error: false, operationStatus: 'Operation Successful!'
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'edit business', `${error.message || 'Server not responding'}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * delete a business
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  async deleteBusiness(req, res) {
    try {
      const { businessId: id } = req.params;

      const { id: userId } = req.user;

      const business = await Services.retreiveOneData(this.database = Businesses, { id, userId });

      if (!business) {
        return res.status(400).jsend.fail(errorResponse('NotFound', 400, '', 'delete business', 'business does not exist or does not belong to you', { error: true, operationStatus: 'Processs Terminated!' }));
      }

      await Services.expungeData(this.database = Businesses, { id });

      return res.status(200).jsend.success(successResponse('Business Deleted!', 200, 'delete business', {
        error: false, operationStatus: 'Operation Successful!',
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'delete business', `${error.message || 'Server not responding'}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }

  /**
   * find businesses
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  async retrieveBusiness(req, res) {
    try {
      const { q } = req.query;

      const condition = [
        { businessName: { $regex: new RegExp(q), $options: 'i' } },
        { category: { $regex: new RegExp(q), $options: 'i' } },
        { productName: { $regex: new RegExp(q), $options: 'i' } },
        { businessLocation: { $regex: new RegExp(q), $options: 'i' } },
        { description: { $regex: new RegExp(q), $options: 'i' } },
        { contactNumber: { $regex: new RegExp(q), $options: 'i' } },
      ];

      const businesses = await Services.retreiveData(this.database = Businesses, { condition });

      if (!businesses.length) {
        return res.status(200).jsend.success(successResponse('No Content', 204, 'retieve businesses', {
          error: false, operationStatus: 'Operation Successful!', businesses
        }));
      }

      return res.status(200).jsend.success(successResponse('Businesses Retrieved!', 200, 'retieve businesses', {
        error: false, operationStatus: 'Operation Successful!', businesses
      }));
    } catch (error) {
      const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'retieve businesses', `${error.message || 'Server not responding'}`, { error: true, operationStatus: 'Proccess Terminated!', errorSpec: error });
      return res.status(500).jsend.fail(result);
    }
  }
}
