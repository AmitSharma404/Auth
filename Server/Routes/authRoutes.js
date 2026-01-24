
import express from 'express';
import {redirectUrl, createuserUrl, register, userLogin, userLogout } from '../Controller/authController.js';
export const authRouter = express.Router();

// authRouter.post('/login',userLogin);
// authRouter.post('/register',register);
// authRouter.post('/logout',userLogout);
authRouter.post('/',createuserUrl);
// authRouter.get('/geturl',getUrl)
authRouter.get('/:shortCode',redirectUrl);