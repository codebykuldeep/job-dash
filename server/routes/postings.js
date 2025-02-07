import {Router} from 'express'
import { handleApplicationStatus, handleDeletePost, handleGetPostApplications, handleGetPosts, handleGetSinglePost, handleNewPost, handlePostApply, handlePostSearch, handleUpdatePost } from '../controllers/postings.js';


const router = Router();

router.get('/',handleGetPosts)

router.get('/search',handlePostSearch)

router.post('/add',handleNewPost)

router.post('/update',handleUpdatePost)

router.post('/status',handleApplicationStatus)

router.get('/apply',handlePostApply)

router.get('/data/:id',handleGetPostApplications)

router.get('/:id',handleGetSinglePost)

router.delete('/:id',handleDeletePost)


export default router;