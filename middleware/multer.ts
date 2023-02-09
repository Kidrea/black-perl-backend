import multer from 'multer'
import path from 'path'
import log from '../src/log'

// Subida de imagenes al servidor

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
export const upload = multer({
    storage,
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
})
