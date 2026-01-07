const cloudinary = require("../config/cloudinary")

const uploadToCloudinary = async (filePath) => {
   try {
      const result = await cloudinary.uploader.upload(filePath)

      return {
         url: result.secure_url,
         publicId: result.public_id,
      }
   } catch (err) {
      console.log("Error while uploading to cloudinary ", err)
      throw new Error("Error in uploading to cloudinary")
   }
}

const deleteFromCloudinary = async (publicId) => {
   try {
      await cloudinary.uploader.destroy(publicId)

      console.log("Image deleted successfully from cloudinary")
   } catch (err) {
      console.log("Error while deleting cloudinary ", err)
      throw new Error("Error in deleting file from cloudinary")
   }
}

module.exports = {
   uploadToCloudinary,
   deleteFromCloudinary,
}
