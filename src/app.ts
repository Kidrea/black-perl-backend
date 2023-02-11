import express from 'express'
import config from 'config'
import morgan from 'morgan'
import cors from 'cors'
import log from './log'
import 'dotenv/config'
import validToken from './libs/valid-token'

// Router
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import rolRouter from './routes/role.routes'
import productRouter from './routes/product.routes'
import typeProductRouter from './routes/typeProduct.routes'
import promotionRouter from './routes/promotion.routes'
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Rutas
app.use('/api/auth', authRouter)
app.use('/api/user', validToken, userRouter)
app.use('/api/role', validToken, rolRouter)
app.use('/api/product', validToken, productRouter)
app.use('/api/typeProduct', validToken, typeProductRouter)
app.use('/api/promotion', validToken, promotionRouter)
app.listen(process.env.PORT, () => {
    log.info(`Server listen on port: ${process.env.PORT}`)
})
