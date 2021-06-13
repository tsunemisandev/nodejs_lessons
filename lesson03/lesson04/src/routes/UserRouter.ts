import { celebrate } from 'celebrate';
import express from 'express';
import UserController from '../controllers/UserController';
import userValidator from '../validators/NewUserValidator';
import loginValidator from '../validators/LoginValidator';
const router = express.Router();
const userController = new UserController();

router.post('/register', userValidator, userController.register);
router.get('/register', userController.registerPage);
router.get('/login', userController.loginPage);
router.post('/login', loginValidator, userController.login);
router.get('/logout', userController.logout);

export default router;
