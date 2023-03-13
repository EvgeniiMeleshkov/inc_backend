import {Router} from 'express';
import posts from '../controllers/postController'
import checkAuth from '../utils/checkAuth';

const router = Router()

router.get('/', posts.get)
router.post('/', checkAuth, posts.post)
router.get('/:id', posts.getById)
router.put('/:id', checkAuth, posts.put)
router.delete('/:id', checkAuth, posts.deleteById)

export default router