const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")
const uploadMiddleware = require("../middleware/upload.middleware")
const imageController = require("../controller/image.controller")

const imageRouter = Router()

imageRouter.post(
   "/welcome",
   authMiddleware,
   adminMiddleware,
   uploadMiddleware.single("image"),
   imageController
)

module.exports = imageRouter
