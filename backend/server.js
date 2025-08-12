import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import path from "path";
import imageRoutes from "./routes/imageRoutes.js";
import ImageModel from "./models/Image.js";
import dotene from 'dotenv';
dotene.config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ Connected to MongoDB Atlas"))
// .catch((err) => {
//   console.error("❌ MongoDB connection error:", err);
//   process.exit(1); // stop server if DB fails
// });

// Multer Configuration (in-memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Routes

app.post("/saveImageAndDetails/:originalname/:path", async (req, res) => {
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
});
app.get("/getImageAndDetails", async (req, res) => {
  try {
    const images = await ImageModel.find();

    // Format the data as required
    const formattedImages = images.map((img) => ({
      url: img.path,
      public_id: img.name,
    }));

    res.status(200).json(formattedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteImageAndDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received ID:', id, 'Type:', typeof id);

    // Handle both MongoDB ObjectId and string IDs
    let query;
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: new mongoose.Types.ObjectId(id) };
    } else {
      query = { name: id }; // Assuming 'name' stores Cloudinary public_id
    }

    const deletedImage = await ImageModel.findOneAndDelete(query);
    console.log('Delete result:', deletedImage);

    if (!deletedImage) {
      return res.status(404).json({ 
        success: false,
        error: "Image not found",
        receivedId: id
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: "Image deleted successfully",
      deletedId: id
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: "Error deleting image" 
    });
  }
});
app.use("/", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} abc`));
