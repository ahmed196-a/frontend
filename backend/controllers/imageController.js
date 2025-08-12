
import multer from "multer";
import mongoose from "mongoose";
import ImageModel from "../models/Image.js";

// Configure multer for memory storage (keeps file in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });


export const saveImageAndDetails = async (req, res) => {
  try {
    const { originalname, path } = req.params;

    const newImage = new ImageModel({
      name: originalname,
      path: path,
    });

    const image = await newImage.save();
    res.status(201).json({
      image,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
