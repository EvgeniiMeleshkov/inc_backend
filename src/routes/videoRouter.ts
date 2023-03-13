import { Router } from 'express';
import * as VC from '../controllers/videoController'
import {createVideoValidation, updateVideoValidation} from '../utils/validator';

const router = Router()


router.get('/', VC.getVideos)
router.post('/', createVideoValidation, VC.createVideo)
router.get('/:id', VC.getOneVideo)
router.put('/:id', updateVideoValidation, VC.updateVideo)
router.delete('/:id', VC.removeVideo)

export default router