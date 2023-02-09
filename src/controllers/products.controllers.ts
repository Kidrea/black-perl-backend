import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import log from '../log'

const prisma = new PrismaClient()

// obtener todos los productos
export const getAllProducts = async (_: Request, res: Response) => {
    try {
        const products = await prisma.productos.findMany()
        res.json(products)
    } catch (error) {
        res.status(400).json({ error })
    }
}

// crear un producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await prisma.productos.findUnique({
            where: {
                nombre: req.body.nombre
            }
        })
        if (product) {
            res.status(409).json({ msg: 'The product exist' })
        } else {
            req.body.imagen = req.file?.path
            const newProduct = await prisma.productos.create({
                data: req.body
            })
            res.json(newProduct)
        }
    } catch (error) {
        log.error(error)
        res.status(400).json({ error })
    }
}

// obtener un producto
export const getOneProduct = async (req: Request, res: Response) => {
    try {
        const product = await prisma.productos.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!product) {
            res.status(404).json({ msg: 'The product not found' })
        } else {
            res.json(product)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await prisma.productos.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!product) {
            res.status(404).json({ msg: 'The product not found' })
        } else {
            if (req.file) {
                req.body.imagen = req.file.path
            }
            const newProduct = await prisma.productos.update({
                where: {
                    id: Number(req.params.id)
                },
                data: req.body
            })
            res.json(newProduct)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await prisma.productos.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!product) {
            res.status(404).json({ msg: 'The product not found' })
        } else {
            await prisma.productos.delete({
                where: {
                    id: Number(req.params.id)
                }
            })
        }
        res.json(product)
    } catch (error) {
        res.status(400).json({ error })
    }
}
