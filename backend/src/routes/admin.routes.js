import { addDoctor,adminLogin } from '../controllers/admin.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { Router } from 'express';
import { verifyAdmin } from '../middlewares/authAdmin.middleware.js';
const router = Router();
router.route('/add-doctor').post(verifyAdmin,upload.single('imageFile'),addDoctor)
router.route('/login').post(adminLogin)

export default router;