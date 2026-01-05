const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")

const homeRouter = Router()

homeRouter.post("/welcome", authMiddleware, (req, res) => {
   res.json({
      message: "Welcome to the home page",
   })
})

module.exports = homeRouter
