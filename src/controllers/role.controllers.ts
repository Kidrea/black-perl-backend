import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// obtener todos los roles
export const getAllRoles = async (_: Request, res: Response) => {
    try {
        const roles = await prisma.rol.findMany()
        res.json(roles)
    } catch (error) {
        res.status(400).json({ error })
    }
}

// crear rol
export const createRole = async (req: Request, res: Response) => {
    try {
        const role = await prisma.rol.findUnique({
            where: {
                rol: req.body.rol
            }
        })
        if (role) {
            res.status(409).json({ msg: 'The rol exist' })
        } else {
            const newRole = await prisma.rol.create({
                data: req.body
            })
            res.json(newRole)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// obtener un rol por id
export const getOneRole = async (req: Request, res: Response) => {
    try {
        const role = await prisma.rol.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!role) {
            res.status(404).json({ msg: 'Rol not found' })
        } else {
            res.json(role)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// actualizar rol
export const updateRole = async (req: Request, res: Response) => {
    try {
        const rol = await prisma.rol.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!rol) {
            res.status(404).json({ msg: 'Rol not found' })
        } else {
            const newRol = await prisma.rol.update({
                where: {
                    id: Number(req.params.id)
                },
                data: req.body
            })
            res.json(newRol)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// delete rol
export const deleteRole = async (req: Request, res: Response) => {
    try {
        const rol = await prisma.rol.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!rol) {
            res.status(404).json({ msg: 'Rol not found' })
        } else {
            await prisma.rol.delete({
                where: {
                    id: Number(req.params.id)
                }
            })
            res.json(rol)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}
