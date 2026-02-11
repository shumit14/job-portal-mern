const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/resumes')
    },
    filename(req,file,cb){
        cb(null,
            `${req.user._id}- ${Date.now()}${path.extname(file.originalname)}`
        )
    }
})

function fileFilter (req,file,cb){
    if(file.mimetype === 'application/pdf'){
        cb(null, true)
    }else{
        cb(new Error("Only Pdf files allowed"), false)
    }
}

const upload = multer({
    storage,
    fileFilter
})

module.exports = upload