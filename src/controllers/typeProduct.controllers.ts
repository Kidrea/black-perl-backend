import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import log from '../log'

const prisma = new PrismaClient()

// obtener tipos de productos
export const getTypeProducts = async (req: Request, res: Response) => {
    try {
        const typeProduct = await prisma.tipo_producto.findMany()
        res.json(typeProduct)
    } catch (error) {
        res.status(400).json({ error })
    }
}

// crear tipo de producto
export const createTypeProduct = async (req: Request, res: Response) => {
    try {
        const typeProduct = await prisma.tipo_producto.findUnique({
            where: {
                tipo: req.body.tipo
            }
        })
        if (typeProduct) {
            res.status(409).json({ msg: 'The type-product exist' })
        } else {
            const newTypeProduct = await prisma.tipo_producto.create({
                data: req.body
            })
            res.json(newTypeProduct)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// obtener un tipo de producto
export const getOneTypeProduct = async (req: Request, res: Response) => {
    try {
        const typeProduct = await prisma.tipo_producto.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!typeProduct) {
            res.status(404).json({ msg: 'The type-product not found' })
        } else {
            res.json(typeProduct)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// actualizar tipo de producto
export const updateTypeProduct = async (req: Request, res: Response) => {
    try {
        const typeProduct = await prisma.tipo_producto.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!typeProduct) {
            res.status(404).json({ msg: 'The type-product not found' })
        } else {
            const newTypeProduct = await prisma.tipo_producto.update({
                where: {
                    id: Number(req.params.id)
                },
                data: req.body
            })
            res.json(newTypeProduct)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// eliminar un tipo producto
export const deleteTypeProduct = async (req: Request, res: Response) => {
    try {
        const typeProduct = await prisma.tipo_producto.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!typeProduct) {
            res.status(404).json({ msg: 'The type-product not found' })
        } else {
            await prisma.tipo_producto.delete({
                where: {
                    id: Number(req.params.id)
                }
            })
            res.json(typeProduct)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}
