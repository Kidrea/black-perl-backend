import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import fs from 'fs'
import log from '../log'
const prisma = new PrismaClient()

// obtener todas las promociones
export const getAllPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await prisma.promociones.findMany()
        res.json(promotions)
    } catch (error) {
        res.status(400).json({ error })
    }
}

// crear una promocion
export const createPromotions = async (req: Request, res: Response) => {
    try {
        const promotion = await prisma.promociones.findUnique({
            where: {
                titulo: req.body.titulo
            }
        })
        if (promotion) {
            res.status(409).json({ msg: 'Promotion exist' })
        } else {
            if (req.file) req.body.imagen = req.file.path
            const newPromotion = await prisma.promociones.create({
                data: req.body
            })
            res.json(newPromotion)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// obtener una promocion
export const getOnePromotion = async (req: Request, res: Response) => {
    try {
        const promotion = await prisma.promociones.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!promotion) {
            res.status(404).json({ msg: 'Promotion not found' })
        } else {
            res.json(promotion)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// actualizar una promocion
export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const promotion = await prisma.promociones.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!promotion) {
            res.status(404).json({ msg: 'Promotion not found' })
        } else {
            if (req.file) {
                fs.unlink(promotion.imagen!, () => {})
                req.body.imagen = req.file.path
            }
            const newPromotion = await prisma.promociones.update({
                where: {
                    id: Number(req.params.id)
                },
                data: req.body
            })
            res.json(newPromotion)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// eliminar promocion
export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const promotion = await prisma.promociones.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!promotion) {
            res.status(404).json({ msg: 'Promotion not found' })
        } else {
            if (fs.existsSync(promotion.imagen!))
                fs.unlink(promotion.imagen!, () => {})
            await prisma.promociones.delete({
                where: {
                    id: Number(req.params.id)
                }
            })
            res.json(promotion)
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}
