const ImageModel = require("../models/image.model")
const {
   uploadToCloudinary,
   deleteFromCloudinary,
} = require("../helpers/cloudinaryHelper")
const fs = require("fs")

const uploadImage = async (req, res) => {
   let cloudinaryId

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

      cloudinaryId = publicId

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

      // Delete file from localstorage after uploading to cloudinary
      fs.unlinkSync(req.file.path)

      res.status(201).json({
         success: true,
         message: "Image successfully uploaded",
         data: newImage,
      })
   } catch (err) {
      // 4️⃣ Rollback cloudinary if DB failed
      if (cloudinaryId) {
         await deleteFromCloudinary(cloudinaryId)
      }
      res.status(500).json({
         success: true,
         message: "An error occured. Please try again",
      })
   }
}

const fetchImages = async (req, res) => {
   try {
      await ImageModel.find({})
         .then((images) => {
            res.status(200).json({
               success: true,
               message: "Images retrieved",
               data: images,
            })
         })
         .catch((err) => {
            res.status(400).json({
               success: true,
               message: "An error occurred in retrieving images",
            })
         })
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "An error occured. Please try again",
      })
   }
}

const fetchImagesByPagination = async (req, res) => {
   try {
      // Try to check if the page number is greater than the total number of pages if not return
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 1
      const skip = (page - 1) * limit

      const sortBy = req.query.sortBy || "createdAt"
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
      const totalImages = await ImageModel.countDocuments()
      console.log(totalImages)
      const totalPages = Math.ceil(totalImages / limit)

      const sortObj = {}
      sortObj[sortBy] = sortOrder

      const images = await ImageModel.find()
         .sort(sortObj)
         .skip(skip)
         .limit(limit)

      res.status(200).json({
         success: true,
         message: "Images Paginated",
         currentPage: page,
         totalPages: totalPages,
         totalImages: totalImages,
         data: images,
      })
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "An error occured. Please try again",
      })
   }
}

const deleteImage = async (req, res) => {
   try {
      const id = req.params.id
      const userInfo = req.userInfo

      const image = await ImageModel.findById(id)

      console.log(image._id.toString()) // As it is a mongoose object

      if (!image) {
         res.status(404).json({
            success: false,
            message: "Image with ID not found",
         })

         return
      }

      // Check if it is the person that uploaded the picture that is deleting it

      if (userInfo.userId !== image.uploadedBy.toString()) {
         res.status(403).json({
            success: false,
            message: "Not owner of image",
         })

         return
      }

      // Delete from cloudinary
      await deleteFromCloudinary(image.publicId)

      // Delete from mongoDB
      await ImageModel.findByIdAndDelete(id)

      res.status(200).json({
         success: true,
         message: "Image deleted successfully",
      })
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "An error occured. Please try again",
      })
   }
}

module.exports = {
   uploadImage,
   fetchImages,
   deleteImage,
   fetchImagesByPagination,
}
