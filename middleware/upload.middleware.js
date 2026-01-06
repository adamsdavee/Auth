const multer = require("multer")
const path = require("path")

// This package basically passes our multipart/form-data into req.file

// Set our multer storage
// For production use RAM to store the pictures as it is stateless and do not store the images
// Unlike using this diskStorage that will require later cleanup
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "uploads/")
   },
   filename: function (req, file, cb) {
      cb(
         null,
         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      )
   },
})

// File filter functions
const checkFileFilter = (req, file, cb) => {
   if (file.mimetype.startsWith("image")) {
      cb(null, true)
   } else {
      cb(new Error("Not an image! Please upload only images"))
   }
}

module.exports = multer({
   storage: storage,
   fileFilter: checkFileFilter,
   limits: {
      fileSize: 5 * 1024 * 1024,
   },
})
