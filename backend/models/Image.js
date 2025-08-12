import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "aimages" }
);

// Check if the model already exists before defining it
const ImageModel = mongoose.models.ImageDetails || mongoose.model("ImageDetails", ImageSchema);

export default ImageModel;