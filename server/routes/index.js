import express from 'express';
import businessController from '../controllers/businessController';

const router = express.Router();

const {
  createBusiness, modifyBusiness,
  deleteBusiness, findByCategoryOrFindAll
} = businessController;

router.post('/business/create', createBusiness);
router.put('/business/:businessId', modifyBusiness);
router.delete('/business/:businessId', deleteBusiness);
router.get('/businesses', findByCategoryOrFindAll);

export default router;
