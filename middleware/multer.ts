import multer from 'multer'
import path from 'path'
import log from '../src/log'
import { v4 } from 'uuid'
// Subida de imagenes al servidor

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, v4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
export const upload = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: { fileSize: 10000000 },
    fileFilter(req, file, cb) {
        const filetypes = /jpg|jpeg|png|JPG|JPEG|PNG/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
}).single('file')
