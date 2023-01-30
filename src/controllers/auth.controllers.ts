import { PrismaClient } from '@prisma/client'
import e, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import log from '../log'

const prisma = new PrismaClient()

// Autenticar Usuario
export const signin = async (req: Request, res: Response) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                usuario: req.body.usuario
            }
        })
        if (!user) {
            res.status(404).json({ msg: 'user not found' })
        } else {
            const validPass = await bcrypt.compare(req.body.clave, user?.clave!)
            if (!validPass) {
                res.status(401).json({ msg: 'user password incorrect' })
            } else {
                const token = jsonwebtoken.sign(
                    {
                        id: user?.id,
                        rol: user?.rol
                    },
                    process.env.ACCESS_TOKEN!,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    }
                )
                res.header('auth-token', token).json({
                    user: {
                        id: user?.id,
                        rol: user?.rol
                    },
                    'auth-token': token
                })
            }
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}
