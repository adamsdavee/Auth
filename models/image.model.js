const mongoose = require("mongoose")

const ImageModel = new mongoose.Schema(
   {
      url: {
         type: String,
         required: true,
      },
      publicId: {
         type: String,
         required: true,
      },
      uploadedBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Userrr",
         required: true,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.model("Image", ImageModel)
