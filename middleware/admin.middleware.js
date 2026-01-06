const adminMiddleware = (req, res, next) => {
   if (req.userInfo.role !== "admin") {
      res.status(403).json({
         success: false,
         message: "Sccess denied. Admin rights required",
      })

      return
   }

   next()
}

module.exports = adminMiddleware
