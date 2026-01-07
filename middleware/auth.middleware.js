const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = async (req, res, next) => {
   let token = req.headers.authorization

   console.log(token)

   if (!token) {
      res.status(401).json({
         success: false,
         message: "Access denied. No token found",
      })

      return
   }

   token = token.split(" ")[1]

   try {
      const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
      console.log(decodedTokenInfo)

      req.userInfo = decodedTokenInfo

      next()
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "Server error. Try again",
      })
   }
}

module.exports = authMiddleware
