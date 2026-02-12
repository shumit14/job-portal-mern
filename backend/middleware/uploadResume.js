const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../utils/cloudinary')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'resume',
    resource_type: 'auto', 
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files allowed'), false)
    }
  }
})

module.exports = upload
