const mongoose = require("mongoose")

const UserModel = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
      },
      roles: {
         type: String,
         enum: ["user", "admin"], // can only have 'user' and 'admin' roles
         default: "user",
      },
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.model("Userrr", UserModel)
