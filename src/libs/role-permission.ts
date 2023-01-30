// validar rol de usuario
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const permit = (...permitedRoles: any) => {
    return async (req: any, res: any, next: any) => {
        try {
            const user = await prisma.usuario.findUnique({
                where: {
                    id: req.userId
                }
            })
            if (!user) return res.status(404).json('The user could not found')
            const role = await prisma.rol.findUnique({
                where: {
                    id: user.rol!
                }
            })
            if (!role) return res.status(404).json('Not such role')
            if (!permitedRoles.includes(role.rol))
                return res.status(403).json('You are not suppossed to be here')
            next()
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
}
