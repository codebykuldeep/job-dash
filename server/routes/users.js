import {Router} from 'express'
import { handleGetUser, handleGetUserApplications, handlePhotoUpdate, handleResumeUpdate, handleSendOTP, handleUserDataUpdate, handleUserDetailAnalysis, handleVerifyOTP } from '../controllers/users.js';
import { upload } from '../services/multer.js';
// import { handleLogin, handleRegistration } from '../controllers/users.js';

const router = Router();

router.post('/update',handleUserDataUpdate)

router.post('/resume',upload.single('resume'),handleResumeUpdate);

router.post('/image',upload.single('image'),handlePhotoUpdate);


router.get('/detail',handleUserDetailAnalysis);

router.get('/applications',handleGetUserApplications)

router.get('/send-otp',handleSendOTP);

router.get('/verify-otp',handleVerifyOTP);

router.get('/:id',handleGetUser)


export default router;