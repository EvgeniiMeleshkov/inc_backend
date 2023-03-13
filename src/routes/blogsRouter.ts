import { Router } from 'express';
import blog from '../controllers/blogController'
import checkAuth from '../utils/checkAuth';
import {blogValidation} from '../utils/validator';

const router = Router()

router.get('/', blog.get)
router.post('/', checkAuth, blogValidation, blog.post)
router.get('/:id', blog.getById)
router.put('/:id', checkAuth, blogValidation, blog.put)
router.delete('/:id', checkAuth, blog.deleteById)

export default router