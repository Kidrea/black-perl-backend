import { permit } from './../libs/role-permission'
import {
    getAllPromotions,
    createPromotions,
    getOnePromotion,
    updatePromotion,
    deletePromotion
} from './../controllers/promotions.controllers'
import { Router } from 'express'
import rol from '../../config/roles'
import { upload } from '../../middleware/multer'
const router = Router()

router.get('/', getAllPromotions)
router.post('/', permit(rol.ADMIN), upload, createPromotions)
router.get('/:id', getOnePromotion)
router.put('/:id', permit(rol.ADMIN), upload, updatePromotion)
router.delete('/:id', permit(rol.ADMIN), deletePromotion)

export default router
