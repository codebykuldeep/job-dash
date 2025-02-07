import {Router} from 'express'
import { handleLogin, handleRegistration, handleResetPassword, handleUserVerification } from '../controllers/common.js';
import {auth} from '../middleware/auth.js'

const router = Router();

router.get('/verify',handleUserVerification)

router.post('/register',handleRegistration)

router.post('/login',handleLogin)

router.post('/reset',auth,handleResetPassword)


export default router;