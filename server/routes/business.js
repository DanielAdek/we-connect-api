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
    this.router.delete('/delete/:businessId', verifyToken, this.deleteTrashedBusiness);
    this.router.delete('/trash/:businessId', verifyToken, this.trashBusinessData);
    this.router.put('/trash/restore/:businessId', verifyToken, this.restoreBusinessFromTrash);
    this.router.get('/search', this.searchBusiness);
    this.router.get('/untrashed', this.retreiveUntrashedBusiness);
    this.router.get('/trashed', this.retreiveTrashedBusiness);
  }
}
