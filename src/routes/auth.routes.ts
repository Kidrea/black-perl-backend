import { signin } from './../controllers/auth.controllers'
import { Router } from 'express'
const router = Router()

router.post('/signin', signin)

export default router
