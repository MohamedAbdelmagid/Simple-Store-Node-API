const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: function(request, file, cb) {
      cb(null, 'uploads/product/images/')
  },

  filename: function(request, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname))
  }
})

const imageFilter = (request, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    request.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true)
}

module.exports = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})