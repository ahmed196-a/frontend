import express from "express";
import {
  saveImageAndDetails,
} from "../controllers/imageController.js";

const router = express.Router();

router.post("saveImageAndDetails/:originalname/:path", saveImageAndDetails);

export default router;


// const fs = require("fs").promises;

// router.post('/', uploadImage, processImageUpload);

// router.post("/api/images", async (req, res) => {
//   try {
//     if (!req.files || !req.files.image) {
//       return res.status(400).send("No image uploaded");
//     }

//     const image = req.files.image;
//     const imageData = await fs.readFile(image.tempFilePath);
//     const base64Image = imageData.toString("base64");

//     // Save to database (MongoDB example)
//     const newImage = new Image({
//       name: image.name,
//       data: base64Image,
//       contentType: image.mimetype,
//     });

//     await newImage.save();
//     res.status(201).json(newImage);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
// // router.get('/', getImages);
// // router.get('/:id', getImageData);
// router.get("/api/images", async (req, res) => {
//   try {
//     const images = await Image.find({});
//     res.json(images);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
// router.delete("/:id", deleteImage);