import { permit } from './../libs/role-permission'
import { Router } from 'express'
import {
    createRole,
    getAllRoles,
    getOneRole,
    updateRole,
    deleteRole
} from '../controllers/role.controllers'
import rol from '../../config/roles'
const router = Router()

router.get('/', permit(rol.ADMIN), getAllRoles)
router.post('/', permit(rol.ADMIN), createRole)
router.get('/:id', permit(rol.ADMIN), getOneRole)
router.put('/:id', permit(rol.ADMIN), updateRole)
router.delete('/:id', permit(rol.ADMIN), deleteRole)

export default router
