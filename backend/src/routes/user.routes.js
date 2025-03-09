import express from 'express';
import { Router } from 'express';
import { registerUser,login,logout,getUserProfileData,updateUserProfile } from '../controllers/user.controller.js';
import { verifyUser } from '../middlewares/userAuth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
const router = Router();
router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').post(verifyUser,logout)
router.route('/my-profile').get(verifyUser,getUserProfileData)
router.route('/update-profile').post(verifyUser,upload.single('image'),updateUserProfile)


export default router;