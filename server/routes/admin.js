import {Router} from 'express';
import { handleAdminDashboardDetail, handleAdminUpdatePassword } from '../controllers/admin.js';
const router = Router();

router.post('/password',handleAdminUpdatePassword)


router.get('/detail',handleAdminDashboardDetail)


export default router;