import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { ValidationError } from './errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const mime = file.mimetype

    if (mime.startsWith('image/') || mime === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new ValidationError('Only image files or PDFs are allowed'), false)
    }
  },
})

const uploadFiles = (req, res, next) => {
  upload.fields([
    { name: 'school_id', maxCount: 1 },
    { name: 'admission_letter', maxCount: 1 },
    { name: 'lg_id', maxCount: 1 },
  ])(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          throw new ValidationError('One or more files exceed 1MB size limit')
        } else {
          throw new ValidationError('File upload error')
        }
      }
      next()
    } catch (err) {
      next(err)
    }
  })
}

export default uploadFiles
