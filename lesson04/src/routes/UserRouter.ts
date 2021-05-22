import { celebrate } from 'celebrate';
import express from 'express';
import UserController from '../controllers/UserController';
import userViewSchema from '../models/UserRegisterViewSchema';
import userLoginViewSchema from '../models/UserLoginViewSchema';

const router = express.Router();
const userController = new UserController();

router.post('/register', celebrate(userViewSchema, { abortEarly: false }), userController.register);
router.get('/register', userController.registerPage);
router.get('/login', userController.loginPage);
router.post('/login', celebrate(userLoginViewSchema, { abortEarly: false }), userController.login);
router.get('/logout', userController.logout);

export default router;
