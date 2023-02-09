import { permit } from './../libs/role-permission'
import {
    getTypeProducts,
    createTypeProduct,
    getOneTypeProduct,
    updateTypeProduct,
    deleteTypeProduct
} from './../controllers/typeProduct.controllers'
import { Router } from 'express'
import rol from '../../config/roles'
const router = Router()

router.get('/', getTypeProducts)
router.post('/', permit(rol.ADMIN), createTypeProduct)
router.get('/:id', getOneTypeProduct)
router.put('/:id', permit(rol.ADMIN), updateTypeProduct)
router.delete('/:id', permit(rol.ADMIN), deleteTypeProduct)

export default router
