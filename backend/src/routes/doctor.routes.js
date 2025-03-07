import express from 'express';
import { Router } from 'express';
import { doctorList } from '../controllers/doctor.controller.js';

const router = Router();
router.route('/list').get(doctorList)

export default router;