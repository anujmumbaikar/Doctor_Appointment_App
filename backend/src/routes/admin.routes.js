import { addDoctor } from '../controllers/admin.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { Router } from 'express';

const router = Router();
router.route('/add-doctor').post(upload.single('imageFile'),addDoctor)

export default router;