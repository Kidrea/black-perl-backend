// Validar token de usuario
// @userId emitido por el frontend
import jsonwebtoken from 'jsonwebtoken'
import { PrismaClient, usuario } from '@prisma/client'
const prisma = new PrismaClient()
export default async (req: any, res: any, next: any): Promise<void> => {
    try {
        const token = req.header('auth-token')
        if (!token) return res.status(403).json('Access Denied')
        const payload = jsonwebtoken.verify(
            token,
            process.env.ACCESS_TOKEN!
        ) as usuario
        if (!payload) return res.status(403).json('Access Denied')
        req.userId = payload.id
        const user = await prisma.usuario.findUnique({
            where: {
                id: req.userId
            }
        })
        if (!user) return res.status(404).json('The user not longer exist')
        req.currentUser = user
        next()
    } catch (error) {
        return res.status(400).json(error)
    }
}
