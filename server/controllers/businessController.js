import { Op } from 'sequelize';
import db from '../models';

const { Businesses } = db;

/**
 * @class BusinessController
 */
export default class BusinessController {
  /**
   * Adds a new business
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  static createBusiness(req, res) {
    const {
      businessName, categories, contactNumber, address, description
    } = req.body;
    const { id: userId } = req.decoded;
    return Businesses
      .findOrCreate({
        where: {
          [Op.or]: [
            { businessName },
            { contactNumber }
          ]
        },
        defaults: {
          userId, businessName, categories, description, address, contactNumber
        }
      })
      .spread((business, created) => {
        if (!created) {
          const duplicateValue = business.businessName === businessName ? 'Business Name' : 'Contact Number';
          return res
            .status(400)
            .jsend.fail({ message: `${duplicateValue} already exist!` });
        }
        return res.status(201)
          .jsend.success({ message: 'New Business is successfully created', business });
      })
      .catch((err) => {
        res.status(500).jsend.fail({ message: 'Failed', error: err.message });
      });
  }

  /**
   * modify a business
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  static modifyBusiness(req, res) {
    const {
      businessName, categories, contactNumber, address, description
    } = req.body;
    const { businessId } = req.params;
    const { id: userId } = req.decoded;
    Businesses.findOne({
      where: {
        id: parseInt(businessId, 10),
        userId
      }
    }).then((business) => {
      if (!business) {
        return res.status(404).jsend.fail({ message: 'No business Found!' });
      }
      if (business.userId !== userId) {
        return res.status(400).jsend.fail({ message: 'This business does not belong to you' });
      }
      return business.update({
        businessName, categories, contactNumber, address, description
      }).then((modifiedBusines) => {
        res.status(200).jsend.success({
          message: 'Business Successfully updated',
          modifiedBusines
        });
      });
    }).catch(err => res.status(500).jsend.fail(`Internal server error ${err.message}`));
  }

  /**
   * delete a business
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  static deleteBusiness(req, res) {
    const { businessId } = req.params;
    const { id: userId } = req.decoded;
    Businesses.findOne({
      where: {
        id: parseInt(businessId, 10),
        userId
      }
    }).then((business) => {
      if (!business) {
        return res.status(404).jsend.fail({ message: 'No business Found!' });
      }
      if (business.userId !== userId) {
        return res.status(400).jsend.fail({ message: 'This business does not belong to you' });
      }
      return business.destroy().then(() => res.status(200).jsend.success({ message: 'Business Successfully Deleted', business }));
    });
  }

  /**
   * find businesses
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} json
   * @memberof BusinessController
   */
  static findByCategoryOrFindAll(req, res) {
    const { categories } = req.query;
    if (!categories) {
      return Businesses.findAll().then(businesses => res.status(200).jsend.success({ businesses }));
    }
    return Businesses
      .findAll({
        where: { categories }
      })
      .then(businesses => res.status(200).jsend.success({ businesses }));
  }
}
