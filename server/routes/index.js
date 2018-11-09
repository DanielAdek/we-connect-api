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

const { verifyUser, validateInputFields, checkIfUserExist } = auth;

router.post('/auth/login', loginUser);
router.post(
  '/auth/signup',
  validateInputFields, createUser
);

router.get(
  '/auth/users', verifyUser,
  checkIfUserExist, findAllUsers
);

router.delete(
  '/auth/del/user/:userId', verifyUser,
  checkIfUserExist, deleteAccount
);

router.post(
  '/business/register', verifyUser,
  checkIfUserExist, createBusiness
);

router.put(
  '/business/:businessId', verifyUser,
  checkIfUserExist, modifyBusiness
);

router.delete(
  '/business/:businessId', verifyUser,
  checkIfUserExist, deleteBusiness
);

router.get(
  '/businesses', verifyUser,
  checkIfUserExist, findByCategoryOrFindAll
);

export default router;
