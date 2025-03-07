import { addDoctor,adminLogin,allDoctors } from '../controllers/admin.controller.js';
import { changeAvailability } from '../controllers/doctor.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { Router } from 'express';
import { verifyAdmin } from '../middlewares/authAdmin.middleware.js';
const router = Router();
router.route('/add-doctor').post(verifyAdmin,upload.single('imageFile'),addDoctor)
router.route('/login').post(adminLogin)
router.route('/all-doctors').post(verifyAdmin,allDoctors)
router.route('/change-availability').post(verifyAdmin,changeAvailability)

export default router;