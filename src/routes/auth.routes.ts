import { signin, signup } from './../controllers/auth.controllers'
import { Router } from 'express'
const router = Router()

router.post('/signin', signin)
router.post('/signup', signup)
export default router
