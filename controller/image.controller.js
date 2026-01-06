const ImageModel = require("../models/image.model")
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper")
const userModel = require("../models/user.model")

const uploadImage = async (req, res) => {
   try {
      // Check if file exists
      if (!req.file) {
         res.status(400).json({
            success: false,
            message: "No file found",
         })

         return
      }

      // upload to cloudinary
      console.log(req.file)
      const { url, publicId } = await uploadToCloudinary(req.file.path)

      //   const newImage = {
      //      url: url,
      //      publicId: publicId,
      //      uploadedBy: userModel,
      //   }

      //   await ImageModel.create(newImage)
      //      .then((image) => {
      //         res.status(201).json({
      //            success: true,
      //            message: "Image successfully uploaded",
      //            data: image,
      //         })
      //      })
      //      .catch((err) => {
      //         res.status(404).json({
      //            success: true,
      //            message: "Error in uploading image",
      //            data: err,
      //         })
      //      })

      // OR

      const newImage = new ImageModel({
         url,
         publicId,
         uploadedBy: req.userInfo.userId,
      })

      await newImage.save()

      res.status(201).json({
         success: true,
         message: "Image successfully uploaded",
         data: newImage,
      })
   } catch (err) {
      res.status(500).json({
         success: true,
         message: "An error occured. Please try again",
      })
   }
}

module.exports = uploadImage
