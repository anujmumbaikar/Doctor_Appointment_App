import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use(cors({
    origin: true,
    credentials: true
}
))

import adminRouter from './routes/admin.routes.js';
import doctorRouter from './routes/doctor.routes.js';
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/doctor', doctorRouter);
export { app };