import { Router } from 'express';
import { UserController } from '../controllers';

/**
 * @class UserRoutes
 */
export class UserRoutes extends UserController {
  /**
   * @constructor UserRoutes
   */
  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  /**
   * @memberof UserRoutes
   * @returns {void} nothing to return
   */
  routes() {
    this.router.post('/register', this.createUser);
    this.router.post('/login', this.login);
  }
}
