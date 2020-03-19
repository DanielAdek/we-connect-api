import { Router } from 'express';
import { BusinessController } from '../controllers';
import { verifyToken } from '../middlewares/auth';
import { multerUploads } from '../utils/helpers';

/**
 * @class UserRoutes
 */
export class BusinessRoutes extends BusinessController {
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
    this.router.post('/register', verifyToken, multerUploads, this.createBusiness);
    this.router.put('/update/:businessId', verifyToken, this.modifyBusiness);
    this.router.delete('/delete/:businessId', verifyToken, this.deleteBusiness);
    this.router.get('/search', this.retrieveBusiness);
  }
}
