const express = require("express")
const connectToMongoDB = require("./database/db")
const authRoute = require("./routes/auth.route")
const homeRoute = require("./routes/home.route")
const adminRoute = require("./routes/admin.route")
const imageRoute = require("./routes/image.route")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Connect to DB
connectToMongoDB()
// Add middlewares
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/home", homeRoute)
app.use("/api/admin", adminRoute)
app.use("/api/image", imageRoute)

app.get("/", (req, res) => {
   res.send("It is working!")
})

app.listen(PORT, () => {
   console.log(`Server listening at http://localhost:${PORT}`)
})
