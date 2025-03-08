import express from 'express';
import { Router } from 'express';
import { registerUser,login,logout } from '../controllers/user.controller.js';
import { verifyUser } from '../middlewares/userAuth.middleware.js';

const router = Router();
router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').post(verifyUser,logout)


export default router;