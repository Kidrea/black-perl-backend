import { upload } from '../../middleware/multer'
import { permit } from './../libs/role-permission'
import {
    getAllProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
} from './../controllers/products.controllers'
import { Router } from 'express'
import rol from '../../config/roles'

const router = Router()

router.get('/', getAllProducts)
router.post('/', permit(rol.ADMIN), upload.single('file'), createProduct)
router.get('/:id', getOneProduct)
router.put('/:id', permit(rol.ADMIN), upload.single('file'), updateProduct)
router.delete('/:id', permit(rol.ADMIN), deleteProduct)

export default router
