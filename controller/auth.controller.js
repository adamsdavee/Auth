const bycrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const UserModel = require("../models/user.model")

const registerUser = async (req, res) => {
   try {
      const { username, email, password, role } = req.body
      console.log(req.body)
      // If the database contain the same username or email passed
      const existingUser = await UserModel.findOne({
         $or: [{ username }, { email }],
      })

      if (existingUser) {
         res.status(400).json({
            success: true,
            message: "Username or Email already exists",
         })

         return
      }

      const salt = await bycrpt.genSalt(10)
      const hashedPassword = await bycrpt.hash(password, salt)

      // Create a new user instance and save it on the database
      const newUser = {
         username: username,
         email: email,
         password: hashedPassword,
         role: role || "user",
      }

      await UserModel.create(newUser)
         .then((user) => {
            res.status(201).json({
               success: true,
               message: "User created successfully",
               data: user,
            })
         })
         .catch((err) => {
            res.status(400).json({
               success: false,
               message: "Error in creating user. Try again",
               data: err,
            })
         })
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "An error occurred. Try again!",
         data: err,
      })
   }
}

const loginUser = async (req, res) => {
   try {
      const { username, password } = req.body

      const user = await UserModel.findOne({ username })

      if (!user) {
         res.status(404).json({
            success: false,
            message: "Invalid credentials!",
         })

         return
      }

      const isPassword = await bycrpt.compare(password, user.password)

      if (!isPassword) {
         res.status(404).json({
            success: false,
            message: "Invalid credentials!",
         })

         return
      }

      // Create jwt token
      // jwt.sign(payload(which here is user details which can be accessed), secretORprivatekey)
      const accessToken = jwt.sign(
         {
            userId: user._id,
            username: user.username,
            role: user.roles,
         },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn: "15m",
         }
      )

      console.log(accessToken)

      res.status(200).json({
         success: true,
         message: "Logged in successfully",
         data: user,
         token: accessToken,
      })
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "An error occurred. Try again!",
         data: err,
      })
   }
}

module.exports = {
   registerUser,
   loginUser,
}
