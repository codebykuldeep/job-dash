import {Router} from 'express'
import { handleEmployerStatusUpdate, handleEmployerUpdate, handleGetAllEmployers, handleGetEmployer, handleJobSeekerSearch, handleReportForEmployerDashboard, handleSendOTP, handleVerifyOTP } from '../controllers/employers.js';
import { adminAuth } from '../middleware/auth.js';

const router = Router();

router.get('/',adminAuth,handleGetAllEmployers)

router.get('/detail',handleReportForEmployerDashboard);

router.get('/search',handleJobSeekerSearch)

router.post('/status',handleEmployerStatusUpdate)

router.post('/update',handleEmployerUpdate)

router.get('/send-otp',handleSendOTP);

router.get('/verify-otp',handleVerifyOTP);

router.get('/:id',handleGetEmployer)



export default router;