import express from 'express';
import businessController from '../controllers/businessController';

const router = express.Router();

const { createBusiness } = businessController;

router.post('/business/create', createBusiness);

export default router;
