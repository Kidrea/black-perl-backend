import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import log from '../log'

const prisma = new PrismaClient()

// obtener todos los Usuarios
export const getAllUsers = async (_: Request, res: Response) => {
    try {
        const users = await prisma.usuario.findMany()
        res.json(users)
    } catch (error) {
        res.status(400).json({ error })
    }
}

// crear un Usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                usuario: req.body.usuario
            }
        })
        if (user) {
            res.status(409).json({ msg: 'The user exist' })
        } else {
            const salt = await bcrypt.genSalt(10)
            const encryptedPass = await bcrypt.hash(req.body.clave, salt)
            req.body.clave = encryptedPass
            const newUser = req.body
            const result = await prisma.usuario.create({
                data: newUser
            })
            res.json(result)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// obtener Usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params['id'])
            }
        })
        if (!user) {
            res.status(404).json({ msg: 'user not found' })
        } else {
            res.json(user)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params['id'])
            }
        })
        if (!user) {
            res.status(404).json({ msg: 'user not found' })
        } else {
            const salt = await bcrypt.genSalt(10)
            const encryptedPass = await bcrypt.hash(req.body.clave, salt)
            req.body.clave = encryptedPass
            const newUser = await prisma.usuario.update({
                where: {
                    id: Number(req.params['id'])
                },
                data: req.body
            })
            res.json(newUser)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params['id'])
            }
        })
        if (!user) {
            res.status(404).json({ msg: 'user not found' })
        } else {
            await prisma.usuario.delete({
                where: {
                    id: Number(req.params['id'])
                }
            })
            res.json(user)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}
