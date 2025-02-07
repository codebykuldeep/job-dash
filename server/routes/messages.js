import {Router} from 'express';
import { getChatListForEmployer, getChatListForUser, handleCreateRoom } from '../controllers/messages.js';

const router = Router();

router.get('/user',getChatListForUser)

router.get('/employer',getChatListForEmployer)

router.get('/create-room',handleCreateRoom)


export default router;