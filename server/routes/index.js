import express from 'express';
import businessController from '../controllers/businessController';
import userController from '../controllers/userController';
import auth from '../middlewares/auth';

const router = express.Router();

const {
  createBusiness, modifyBusiness,
  deleteBusiness, findByCategoryOrFindAll
} = businessController;

const {
  createUser, loginUser,
  findAllUsers, deleteAccount
} = userController;

const { verifyUser, validateInputFields } = auth;

router.post('/auth/login', loginUser);
router.post(
  '/auth/signup',
  validateInputFields, createUser
);

router.get(
  '/auth/users', findAllUsers
);

router.delete(
  '/auth/del/user', verifyUser,
  deleteAccount
);

router.post(
  '/business/register', verifyUser,
  createBusiness
);

router.put(
  '/business/:businessId', verifyUser,
  modifyBusiness
);

router.delete(
  '/business/:businessId', verifyUser,
  deleteBusiness
);

router.get(
  '/businesses', verifyUser,
  findByCategoryOrFindAll
);

export default router;
