const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")

const adminRouter = Router()

adminRouter.post("/welcome", authMiddleware, adminMiddleware, (req, res) => {
   res.json({
      message: "Welcome to the admin page",
   })
})

module.exports = adminRouter
