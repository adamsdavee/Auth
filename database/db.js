const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL

const connectToMongoDB = () => {
   mongoose.connect(MONGO_DB_CONNECTION_URL)

   mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully")
   })

   mongoose.connection.on("err", () => {
      console.log("Error in connecting to MongoDB")
   })
}

module.exports = connectToMongoDB
