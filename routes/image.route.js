const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")
const uploadMiddleware = require("../middleware/upload.middleware")
const {
   uploadImage,
   fetchImages,
   deleteImage,
   fetchImagesByPagination,
} = require("../controller/image.controller")

const imageRouter = Router()

imageRouter.post(
   "/welcome",
   authMiddleware,
   adminMiddleware,
   uploadMiddleware.single("image"),
   uploadImage
)

imageRouter.get("/get", authMiddleware, fetchImages)

imageRouter.get("/get/page", authMiddleware, fetchImagesByPagination)

imageRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteImage)

module.exports = imageRouter
