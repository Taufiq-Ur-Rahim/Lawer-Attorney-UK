import express from 'express';
import UserController from '../controllers/userController.js';
 import { emailAndPasswordValidation, validate } from '../utils/Validations.js';

const router = express.Router();

router.get('/get_all_users', UserController.getAllUsers);
router.get('/get_all_information', UserController.get_all_information);
router.post('/register', emailAndPasswordValidation, validate, UserController.register);
router.delete('/delete/:id', UserController.deleteDocById);

export default router;
