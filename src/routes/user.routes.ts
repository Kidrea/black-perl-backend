import { permit } from './../libs/role-permission'
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from './../controllers/user.controllers'
import rol from '../../config/roles'
import { Router } from 'express'

const router = Router()
router.get('/', getAllUsers)
router.post('/', permit(rol.ADMIN), createUser)
router.get('/:id', getUserById)
router.put('/:id', permit(rol.ADMIN), updateUser)
router.delete('/:id', permit(rol.ADMIN), deleteUser)

export default router
