import {Router} from 'express';
import { getChatListForEmployer, getChatListForUser } from '../controllers/messages.js';

const router = Router();

router.get('/user',getChatListForUser)

router.get('/employer',getChatListForEmployer)


export default router;