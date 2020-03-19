import { Router } from 'express';
import { UserRoutes } from './user';
import { BusinessRoutes } from './business';

/**
 * @class UserRoutes
 */
export class ApplicationRoutes {
  /**
   * @constructor UserRoutes
   */
  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * @memberof UserRoutes
   * @returns {void} nothing to return
   */
  routes() {
    this.UserRoute();
    this.BusinessRoute();
  }

  /**
   * @memberof ApplicationRoutes
   * @returns {*} router object
   */
  UserRoute() {
    return this.router.use('/user', new UserRoutes().router);
  }

  /**
   * @memberof ApplicationRoutes
   * @returns {*} router object
   */
  BusinessRoute() {
    return this.router.use('/business', new BusinessRoutes().router);
  }
}
