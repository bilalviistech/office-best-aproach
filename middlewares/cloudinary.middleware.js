import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

/**
 * Works with:
 * 1) multer upload.array("photos")             => req.files is Array
 * 2) multer upload.fields([{ name:"photos" }]) => req.files.photos is Array
 * 3) express-fileupload                        => req.files.photos is File or Array
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("process.env.CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME);

export const uploadToCloudinary = async (req, res, next) => {
  try {
    let photos = [];

    if (Array.isArray(req.files)) {
      photos = req.files;
    }
    else if (req.files?.photos && Array.isArray(req.files.photos)) {
      photos = req.files.photos;
    }
    else if (req.files?.photos) {
      photos = Array.isArray(req.files.photos) ? req.files.photos : [req.files.photos];
    }

    if (!photos || photos.length === 0) {
      return next();
    }

    const imageUrls = [];

    for (const photo of photos) {
      // Multer gives `path` if diskStorage is used
      // express-fileupload gives `tempFilePath` if useTempFiles enabled
      const filePath = photo.path || photo.tempFilePath;

      if (!filePath) {
        return res.status(400).json({
          error:
            "No file path found. If using multer, use diskStorage OR if using express-fileupload, enable useTempFiles.",
        });
      }

      const result = await cloudinary.v2.uploader.upload(filePath, {
        folder: "classified",
      });

      imageUrls.push({
        key: result?.public_id,
        url: result?.secure_url
      });
    }

    // attach urls for controller
    console.log("imageUrls", imageUrls);
    req.body.media = imageUrls;

    // --- cleanup temp files (only if they exist on disk) ---
    for (const photo of photos) {
      const filePath = photo.path || photo.tempFilePath;
      if (filePath && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          // ignore cleanup errors
        }
      }
    }

    return next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return res.status(500).json({ error: "Failed to upload images to Cloudinary" });
  }
};
