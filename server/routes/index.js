import express from 'express';
import businessController from '../controllers/businessController';

const router = express.Router();

const { createBusiness, modifyBusiness } = businessController;

router.post('/business/create', createBusiness);
router.put('/business/:businessId', modifyBusiness);

export default router;
