
import express from 'express';
import { register, userLogin, userLogout } from '../Controller/authController.js';
export const authRouter = express.Router();

authRouter.post('/login',userLogin);
authRouter.post('/register',register);
authRouter.post('/logout',userLogout);